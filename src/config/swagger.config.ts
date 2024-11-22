import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Who I\'m I Documentation', 
      version: '1.0.0', 
      description: 'This is the API documentation for the Who I\'m I application.',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;