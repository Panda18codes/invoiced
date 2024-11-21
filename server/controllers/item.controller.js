import Item from '../models/Item.model.js';

// Create Item
export const createItem = async (req, res) => {
  const { itemName, rate } = req.body;

  try {
    const item = new Item({ itemName, rate });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};