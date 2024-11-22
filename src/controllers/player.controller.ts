import { Request, Response, NextFunction, Send } from 'express';
import playerService from '../services/player.service';
import _ from 'lodash';
import stateService from '../services/state.service';

const getAllPlayers = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const fullPlayers = await playerService.getAllPlayers();
    const players = fullPlayers.map(player => player.getPlayerInfo())
    return res.status(200).json(players);
  } catch (error) {
    return next(error);
  }
};

export const searchPlayerByName = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { search } = req.params
  const key = `${req.route.path}=${search}`
  if (search.trim()?.length < 2) return res.status(200).json([]);
  try {
      const playersToGues = await playerService.getPlayerBySearchParam(search);
      const players = playersToGues.map(player => player.getPlayerInfo())
      stateService.setSearchPlayerState(key,players,60)
      return res.status(200).json(players);
  } catch (error) {
      return next(error);
  }
};

const getNationalityList = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const fullPlayers = await playerService.getAllPlayers();
    const uniqueNationalitesOfPalyers = _.uniqBy(fullPlayers, 'nationalityId');
    const uniqueNationalities = uniqueNationalitesOfPalyers.map(player => player.nationalityId)
    return res.status(200).json(uniqueNationalities);
  } catch (error) {
    return next(error);
  }
};

const getPlayersCount = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const count = await playerService.getPlayerCount();
    return res.status(200).json(count);
  } catch (error) {
    return next(error);
  }
};

const addPlayer = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const player = await playerService.createPlayer(req.body);
    return res.status(201).json(player);
  } catch (error) {
    return next(error);
  }
};

const findPlayerById = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const { id } = req.params;
  try {
    const player = await playerService.findPlayerById(id);
    if (!player) return res.status(404).json({ message: "Player does not exist" });
    return res.status(200).json(player?.getPlayerInfo());
  } catch (error) {
    return next(error);
  }
};

export default { getAllPlayers, getPlayersCount, addPlayer, findPlayerById, getNationalityList, searchPlayerByName }
