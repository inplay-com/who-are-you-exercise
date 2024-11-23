import { Router } from 'express';
import gameController from '../controllers/game.controller';

const router = Router();
/**
 * @swagger
 * /api/game:
 *   get:
 *     tags:
 *       - Game
 *     summary: Retrive player of the day from redis session
 *     description: Retriving same user each time you acces in one day.Containes blured image on url and also option to display blured image from base 64 format
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', gameController.getPlayerOfTheDay);

/**
 * @swagger
 * /api/game/image:
 *   get:
 *     tags:
 *         - Game
 *     summary: Retrive blured image for the player of the day
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           image/jpg:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/image', gameController.getPlayerOfTheDayOnlyImage);

/**
 * @swagger
 * /api/game/all:
 *   get:
 *     tags:
 *      - Game
 *     summary: Returns all states from redis to check the redis status.
 *              It's mostly used as a helper function
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           image/jpg:
 *             schema:
 *               type: object
 */
router.get('/all', gameController.getAllStates);
/**
 * @swagger
 * /api/game/clear:
 *   get:
 *     tags:
 *      - Game
 *     summary: Clears all states from redis to check the redis status.
 *              It's mostly used as a helper function
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           image/jpg:
 *             schema:
 *               type: object
 */
router.get('/clear', gameController.cleaAllStates);

/**
 * @swagger
 * /api/game/make-gues/{id}:
 *   get:
 *     tags:
 *      - Game
 *     summary: Make a guess for the player
 *     description: Endpoint to make a guess for a player based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to guess.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/make-gues/:id', gameController.guesThePlayer);

/**
 * @swagger
 * /api/game/results:
 *   get:
 *     tags:
 *      - Game
 *     summary: Retrives all previus gueses from the player if any 
 *     description: Endpoint to retrieve all user gueses.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/results', gameController.getResults);


export default router;
