import { Router } from 'express';
import playerControler from '../controllers/player.controller';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();


/**
 * @swagger
 * /api/players:
 *   get:
 *     tags:
 *        - Players
 *     summary: Retrive players list 
 *     description: Retriving list of all players, so it will be easier to test 
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', playerControler.getAllPlayers);

/**
 * @swagger
 * /api/players/count:
 *   get:
 *     tags:
 *        - Players
 *     summary: Retrive number of total players
 *     description: Retriving number of total players, so it will be easier to test 
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/count', playerControler.getPlayersCount);


/**
 * @swagger
 * /api/players/nationalities:
 *   get:
 *     tags:
 *        - Players
 *     summary: Retrive a uniq list of nationalites ids
 *     description: Retriving a uniq list of nationalites ids, so it will be easier to test 
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/nationalities', playerControler.getNationalityList);

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     tags:
 *        - Players
 *     summary: Returns player from the provided id
 *     description: Endpoint to get a player based on the provided ID.
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
router.get('/:id', playerControler.findPlayerById);


/**
 * @swagger
 * /api/players/find/{search}:
 *   get:
 *     tags:
 *        - Players
 *     summary: Returns player from the provided id
 *     description: Endpoint to get a player based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: search
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
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
router.get('/find/:search', cacheMiddleware, playerControler.searchPlayerByName);


/**
 * @swagger
 * /api/players:
 *   post:
 *     tags:
 *       - Players
 *     summary: Add a new player
 *     description: Creates a new player and stores it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', playerControler.addPlayer);


export default router;
