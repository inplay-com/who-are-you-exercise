import { Player, IPlayer } from '../models/player.model';
import mongoose from 'mongoose';

const getAllPlayers = async (): Promise<IPlayer[]> => {
  return Player.find().populate('team');
};

const findPlayerById = async (id: string): Promise<IPlayer | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Player.findById(id).populate('team');
};

const getPlayerBySearchParam = async (search: string): Promise<IPlayer[]> => {
  return Player.find({ name: new RegExp(search, 'i') }).populate('team');
};

const getPlayerCount = async (): Promise<Number | null> => {
  return Player.countDocuments();
};

const createPlayer = async (data: Partial<IPlayer>): Promise<IPlayer> => {
  const player = new Player(data);
  return player.save();
};

const getPlayerOfTheDay = async (): Promise<IPlayer[]> => {
  return Player.aggregate([
    { $match: { imagePath: { $exists: true, $ne: null } } }, // to ignore players with no image defined
    { $sample: { size: 1 } },
    {
      $lookup: {
        from: 'teams',
        localField: 'team',
        foreignField: '_id',
        as: 'team',
      }
    },
    { $unwind: '$team' }
  ]);
};

export default { getAllPlayers, getPlayerCount, createPlayer, getPlayerOfTheDay, findPlayerById, getPlayerBySearchParam }
