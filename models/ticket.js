const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    carNumber: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    newTicket: { type: Number, required: true },
    prevPendingTicket: { type: Number, required: true },
    pendingTicket: { type: Number, required: true },
    attendedTicket: { type: Number, required: true },
    cancelledTicket: { type: Number, required: true },
    generalAnimals: { type: Number, required: true },
    dogs: { type: Number, required: true },
    otherAnimals: { type: Number, required: true },
    generalAnimalAmount: { type: Number, required: true },
    dogsAmount: { type: Number, required: true },
    otherAnimalsAmount: { type: Number, required: true },
    collected: { type: Number, required: true },
    toBeDeposited: { type: Number, required: true },
    doctorAttendance: { type: String, required: true },
    assistantAttendance: { type: String, required: true },
    driverAttendance: { type: String, required: true },
    comment: { type: String, required: false }, // Optional comment field
    date: { type: Date, required: true } // New date field
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
