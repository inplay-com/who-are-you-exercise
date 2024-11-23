import { Router } from 'express';
import { getTeams, addTeam } from '../controllers/team.controller';

const router = Router();

/**
 * @swagger
 * /api/teams:
 *   get:
 *     tags:
 *        - Teams
 *     summary: Retrieve all teams from the db
 *     description: Retrieve teams from the db.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', getTeams);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Add a new team
 *     description: Creates a new team and stores it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', addTeam);

export default router;
