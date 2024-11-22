import { Request, Response, NextFunction } from 'express';
import { getAllTeams, createTeam } from '../services/team.service';

export const getTeams = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const teams = await getAllTeams();
    return res.status(200).json(teams);
  } catch (error) {
    return next(error);
  }
};

export const addTeam = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const team = await createTeam(req.body);
    return res.status(201).json(team);
  } catch (error) {
    return next(error);
  }
};
