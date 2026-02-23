const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    fullName: { type: String },
    age: { type: Number },
    income: { type: Number },
    pan: { type: String },
    creditScore: { type: Number, default: null },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    appliedAt: { type: Date, default: Date.now }
}, { collection: 'Applicant', strict: false });

module.exports = mongoose.model('Application', ApplicationSchema);