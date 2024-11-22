import { Request, Response, NextFunction } from 'express';
import gameService from '../services/game.service';
import playerService from '../services/player.service';
import stateService from '../services/state.service';
import { IPlayer, Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { generateBase64ImageFromBuffer, getBuferFromImage } from '../utils/image.utils';

const getImageDataForThePlayer = (playerOfTheDay: IPlayer) => {
    //if the image is not from redis cache, then the blured image is Buffer otherwise is object with data param
   return playerOfTheDay.bluredImage instanceof Buffer ? playerOfTheDay.bluredImage : playerOfTheDay.bluredImage.data;
}

const getPlayerOfTheDay = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const playerOfTheDay = await gameService.getPlayerOfTheDay();
        const player = new Player(playerOfTheDay)
        player.team = new Team(playerOfTheDay.team)
        const playerWithImage = player.getPlayerInfo()
        const imageDataToGenerate = getImageDataForThePlayer(playerOfTheDay)
        const base64DataUrl =  generateBase64ImageFromBuffer(imageDataToGenerate)
        playerWithImage.imagePathBase64 = base64DataUrl
        const serverPath = `${req.protocol}://${req.get('host')}`;
        playerWithImage.imagePath = `${serverPath}/api/game/image`
        return res.status(200).json(playerWithImage);
    } catch (error) {
        return next(error);
    }
};

const pushPlayerInSesionIfIsNotAlreadyAndGetSessionResults = (req: Request,id:string,result:any)=>{
    if (!req.session.userGueses) {
        req.session.userGueses = [];
    }
    if (!req.session.userGueses.some(u => JSON.parse(u).id === id)) req.session.userGueses.push(JSON.stringify(result))
    return req.session.userGueses.map(gues => JSON.parse(gues))
}

const guesThePlayer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    try {
        const selectedPlayer = await playerService.findPlayerById(id);
        if (!selectedPlayer) return res.status(404).json({ message: "Player does not exist" });

        const playerOfTheDayState: IPlayer = await gameService.getPlayerOfTheDay();
        const playerOfTheDay = new Player(playerOfTheDayState)
        playerOfTheDay.team = new Team(playerOfTheDay.team)
        if (playerOfTheDay.id === id) {
            playerOfTheDay.imagePath = selectedPlayer.imagePath
            const result = gameService.prepareCorrectGuesResult(playerOfTheDay)
            const results = pushPlayerInSesionIfIsNotAlreadyAndGetSessionResults(req,id,result)
            return res.status(200).json(results);
        }
        const result = await gameService.prepareWrongGuesResult(playerOfTheDay, selectedPlayer)
        const results = pushPlayerInSesionIfIsNotAlreadyAndGetSessionResults(req,id,result)
        return res.status(200).json(results);
    } catch (error) {
        return next(error);
    }
};

const getPlayerOfTheDayOnlyImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const playerOfTheDay: IPlayer = await gameService.getPlayerOfTheDay();
        const imageDataToGenerate = getImageDataForThePlayer(playerOfTheDay)
        const buffer = getBuferFromImage(imageDataToGenerate)
        return res.contentType('image/jpg').send(buffer);
    } catch (error) {
        return next(error);
    }
};

const getAllStates = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const allPastPlayers = await stateService.getAllStates();
        return res.status(200).json(allPastPlayers);
    } catch (error) {
        return next(error);
    }
};

const cleaAllStates = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        req.session.userGueses = [];
        await stateService.cleaAllStates();
        return res.status(200).json("all states are sucessefuly cleared");
    } catch (error) {
        return next(error);
    }
};

export default { getPlayerOfTheDay, guesThePlayer, getPlayerOfTheDayOnlyImage, getAllStates, cleaAllStates }


