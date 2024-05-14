import { Request, Response } from 'express';
import Card from '../models/card';

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = res.locals.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.send(cards)
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const deleteCardById = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    return res.send(card)
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: res.locals.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    return res.send(card);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: res.locals.user._id } },
      { new: true },
    )
    return res.send(card);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};