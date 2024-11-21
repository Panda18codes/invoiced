import Invoice from '../models/Invoice.model.js';
import User from '../models/User.model.js';
import { ToWords } from 'to-words';

const toWords = new ToWords(); // Utility for converting amount to words

// Create Invoice
export const createInvoice = async (req, res) => {
  const { userId, name, phone, address, city, state, pinCode, items } = req.body;

  try {
    // Calculate Total Amount
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += item.rate * item.qty;
    });

    // Convert Amount to Words
    const amountInWords = toWords.convert(totalAmount, { currency: true });

    // Create Invoice
    const invoice = new Invoice({
      name,
      phone,
      address,
      city,
      state,
      pinCode,
      items,
      totalAmount,
      amountInWords,
    });

    await invoice.save();

    // Link Invoice to User
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.invoices.push(invoice._id);
    await user.save();

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User's Invoices
export const getInvoicesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('invoices');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json(user.invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};