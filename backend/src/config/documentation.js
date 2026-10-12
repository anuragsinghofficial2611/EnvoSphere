import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EnvoSphere API",
      version: "1.0.0",
      description: "API documentation for EnvoSphere backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;