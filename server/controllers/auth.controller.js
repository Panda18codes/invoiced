import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Register User
export const registerUser = async (req, res) => {
  console.log('/api/auth/register - Register User');
  const { email, password, ...otherDetails } = req.body;
  console.log(req.body)

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...otherDetails, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  console.log('/api/auth/login - Login User');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const options = {
      httpOnly: true,
      secure: true,   
      maxAge: 60 * 60 * 1000, 
    }
    res.cookie("token", token, options).json({ token, message:"User Logged In Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};