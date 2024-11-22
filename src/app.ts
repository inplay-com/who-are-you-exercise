import express, { Application } from 'express';
import connectDB from './config/db.config';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';
import gameRoutes from './routes/game.routes';
import sesionConfig from './config/sesion.config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import { internalErrorHandler } from './middlewares/error.handler';
import cors from 'cors'
const app: Application = express();

export const initApp = async (): Promise<Application> => {
    try {
        await connectDB();
        //session configuration
        app.use(sesionConfig);
        // swagger configuration
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        app.use(express.json());

        // Allow requests from a specific origin
        app.use(cors({
            origin: 'http://localhost:3001',
            methods: 'GET,POST,PUT,DELETE',
            credentials: true,
        }));


        //Main Routes
        app.use('/api/teams', teamRoutes);
        app.use('/api/players', playerRoutes);
        app.use('/api/game', gameRoutes);

        //handling any unhandled internal errors
        app.use(internalErrorHandler)

        return app
    } catch (error) {
        console.error('Problem while initiating the app:', error);
        process.exit(1);
    }
}

