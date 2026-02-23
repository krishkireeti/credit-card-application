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

        const apps = await Application.find();

        res.json({
            connectionStatus: states[connectionState],
            databaseName: mongoose.connection.db.name,
            collectionName: Application.collection.name,
            documentsFound: apps.length,
            sampleData: apps.slice(0, 2)
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

        // Business Logic: Check age on backend too
        if (age < 18) {
            return res.status(400).json({ message: "Age must be 18 or older." });
        }

        const newApp = new Application({ fullName, age, income, pan });
        await newApp.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully!",
            id: newApp._id
        });
    } catch (err) {
        console.error('Error saving application:', err.message);
        res.status(500).json({ message: err.message || "PAN already exists or Server Error" });
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
        const updateData = {};

        if (status) updateData.status = status;
        if (score) updateData.creditScore = score;

        const updatedApp = await Application.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
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

