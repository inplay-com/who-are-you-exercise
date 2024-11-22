import { Team } from '../types/team';
import service from './axiosService';


export const getTeams = async (): Promise<Team[]> => {
  try {
    const response = await service.get(`/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw new Error('Could not fetch players');
  }
};
