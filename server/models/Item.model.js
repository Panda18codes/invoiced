import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  rate: { type: Number, required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;