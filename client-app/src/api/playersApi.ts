
import { Player } from '../types/player';
import { PlayerWithResult } from '../types/player.results';
import service from './axiosService';



export const getPlayers = async (): Promise<Player[]> => {
  try {
    const response = await service.get(`/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw new Error('Could not fetch players');
  }
};

export const getPlayerOfTheDay = async (): Promise<Player> => {
  try {
    const response = await service.get(`/game`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player of the day:', error);
    throw new Error('Could not fetch player of the day');
  }
};

export const resetTheSession = async (): Promise<Player> => {
  try {
    const response = await service.get(`/game/clear`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player of the day:', error);
    throw new Error('Could not fetch player of the day');
  }
};

export const getPlayerResultOnGues = async (id: string): Promise<PlayerWithResult[] | any> => {
  try {
    console.log("path", `/game/make-gues/${id}`)
    const response = await service.get(`/game/make-gues/${id}`);
    console.log("getPlayerResultOnGues before ", response.data)
    return response.data;
  } catch (error) {
    console.error('Error getPlayerResultOnGues:', error);
    throw new Error('Could not fetch player of the day');
  }
};

export const getFilteredPlayerList = async (search: string): Promise<Player[] | any> => {
  try {
    console.log("path", `/players/find/${search}`)
    const response = await service.get(`/players/find/${search}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player of the day:', error);
    throw new Error('Could not fetch player of the day');
  }
};
