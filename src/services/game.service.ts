import { blurImage } from '../utils/image.utils';
import { IPlayer } from '../models/player.model';
import playerService from '../services/player.service';
import stateService from '../services/state.service';
import { getDateKey } from '../utils/date.utils';


const getPlayerOfTheDay = async (date: Date | null = null): Promise<IPlayer> => {
    const key = getDateKey(date)
    const blurAmount = 5
    try {
        let playerOfTheDay = await stateService.getPlayerOfTheDayState(key)
        if (!playerOfTheDay) {
            playerOfTheDay = await playerService.getPlayerOfTheDay().then(result => result[0]).catch(error => { throw error });
            const processedImage = await blurImage(playerOfTheDay.imagePath, blurAmount)
            playerOfTheDay.bluredImage = processedImage
            stateService.setPlayerOfTheDayState(key, playerOfTheDay)
        }
        return playerOfTheDay
    } catch (error) {
        throw error
    }
};

const prepareCorrectGuesResult = (playerOfTheDay: IPlayer) => {
    return {
        result: {
            status: true,
            isPositionCorrect: true,
            isTeamCorrect: true,
            nationalityIsCorrect: true,
            yearIsCorrect: 0
        },
        ...playerOfTheDay.getPlayerInfo()
    };
}

const prepareWrongGuesResult = async (playerOfTheDay: IPlayer, selectedPlayer: IPlayer) => {
    const player = selectedPlayer.getPlayerInfo()
    const yearIsCorrect = selectedPlayer.comparePlayerYears(playerOfTheDay)
    const nationalityIsCorrect = player.nationalityId === playerOfTheDay.nationalityId
    const isTeamCorrect = player.team === playerOfTheDay.team
    const isPositionCorrect = player.positionId === playerOfTheDay.positionId
    const { imagePath, ...playerWithoutImage } = player;
    return {
        result: {
            status: false,
            isPositionCorrect,
            isTeamCorrect,
            nationalityIsCorrect,
            yearIsCorrect
        },
        ...playerWithoutImage
    };
}

export default { getPlayerOfTheDay, prepareCorrectGuesResult, prepareWrongGuesResult }