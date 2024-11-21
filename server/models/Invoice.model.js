import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pinCode: { type: String },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      qty: { type: Number },
    },
  ],
  totalAmount: { type: Number },
  amountInWords: { type: String },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;