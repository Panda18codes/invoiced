import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    paymentInfo: {
        bankName: { type: String },
        accountNumber: { type: String },
        accountName: { type: String },
    },
    rates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;