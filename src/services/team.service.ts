import { Team, ITeam } from '../models/team.model';

export const getAllTeams = async (): Promise<ITeam[]> => {
  return Team.find();
};

export const createTeam = async (data: Partial<ITeam>): Promise<ITeam> => {
  const team = new Team(data);
  return team.save();
};
