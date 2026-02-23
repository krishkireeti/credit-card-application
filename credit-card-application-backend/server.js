const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Application = require('./models/Application');

const app = express();
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Debug: Check MongoDB Connection
app.get('/api/debug', async (req, res) => {
    try {
        const connectionState = mongoose.connection.readyState;
        const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
        const isConnected = connectionState === 1;

        let documentsFound = 0;
        let sampleData = [];
        let collectionName = '';
        let databaseName = null;

        if (isConnected) {
            const db = mongoose.connection.db;
            databaseName = db ? (db.databaseName || db.name) : null;
            collectionName = Application.collection.name;
            const apps = await Application.find();
            documentsFound = apps.length;
            sampleData = apps.slice(0, 2);
        }

        res.json({
            connectionStatus: states[connectionState],
            databaseName,
            collectionName: collectionName || null,
            documentsFound,
            sampleData
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            connectionStatus: 'error'
        });
    }
});

// 1. Submit Application (Used by ApplyCard.jsx)
app.post('/api/applicant', async (req, res) => {
    try {
        const { fullName, age, income, pan } = req.body;

        if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
            return res.status(400).json({ message: 'Full name is required.' });
        }
        const ageNum = Number(age);
        if (age === undefined || age === null || age === '' || Number.isNaN(ageNum)) {
            return res.status(400).json({ message: 'Valid age is required.' });
        }
        const incomeNum = Number(income);
        if (income === undefined || income === null || income === '' || Number.isNaN(incomeNum)) {
            return res.status(400).json({ message: 'Valid income is required.' });
        }
        if (!pan || typeof pan !== 'string' || !pan.trim()) {
            return res.status(400).json({ message: 'PAN is required.' });
        }

        // Business Logic: Check age on backend too
        if (ageNum < 18) {
            return res.status(400).json({ message: "Age must be 18 or older." });
        }

        const newApp = new Application({ fullName: fullName.trim(), age: ageNum, income: incomeNum, pan: pan.trim() });
        await newApp.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully!",
            id: newApp._id
        });
    } catch (err) {
        console.error('Error saving application:', err.message);
        let message = 'Server error. Please try again.';
        if (err.code === 11000) {
            message = 'An application with this PAN already exists.';
        } else if (err.message) {
            message = err.message;
        }
        res.status(500).json({ message });
    }
});

// Get single application by ID (for status check by applicant)
app.get('/api/applicant/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }
        const app = await Application.findById(id).select('fullName status creditScore appliedAt');
        if (!app) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(app);
    } catch (err) {
        console.error('Error fetching application:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// 2. Get All Applications (Used by ApproverDashboard.jsx)
app.get('/api/approver', async (req, res) => {
    try {
        const apps = await Application.find().sort({ appliedAt: -1 });
        res.json(apps);
    } catch (err) {
        console.error('Error fetching applications:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// 3. Update Status & Check Score (Used by ApproverDashboard.jsx)
app.put('/api/approver/:id', async (req, res) => {
    try {
        const { status, score } = req.body;
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }

        const updateData = {};
        if (status !== undefined && status !== null && status !== '') updateData.status = status;
        if (score !== undefined && score !== null && score !== '') updateData.creditScore = score;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Provide at least status or score to update' });
        }

        const validStatuses = ['Pending', 'Approved', 'Rejected'];
        if (updateData.status && !validStatuses.includes(updateData.status)) {
            return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
        }

        const updatedApp = await Application.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedApp) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(updatedApp);
    } catch (err) {
        console.error('Error updating application:', err.message);
        res.status(500).json({ message: err.message || "Failed to update application" });
    }
});

// Connect to MongoDB and Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/creditcard')
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

