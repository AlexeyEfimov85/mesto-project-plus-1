import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(res.locals.user._id, { name, about });
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(res.locals.user._id, { avatar });
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

