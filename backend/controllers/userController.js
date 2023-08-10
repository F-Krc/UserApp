import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
import { createToken, validateToken } from '../lib/auth.js';

export const createUserController = async (req, res) => {
  try {
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    const newUser = userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const isMatching = await bcrypt.compare(req.body.password, user.password);

      if (isMatching) {
        const payload = { email: user.email, password: user.password };
        const token = await createToken(payload);

        res.status(200).json({ ...user.toObject(), token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findUserController = async (req, res) => {
  try {
    const headerAuth = req.header('Authorization');
    const token = headerAuth.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decodedToken = await validateToken(token);

    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const headerAuth = req.header('Authorization');
    const token = headerAuth.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decodedToken = await validateToken(token);

    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUserController = async (req, res) => {
  try {
    const headerAuth = req.header('Authorization');
    const token = headerAuth.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decodedToken = await validateToken(token);

    const userId = req.params.id;
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
