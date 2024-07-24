
# Theater Back-End

This repository contains the back-end services for the Theater project. It provides the necessary APIs for managing and accessing theater-related data.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, used for building fast and scalable server-side applications.
- **Express**: A web application framework for Node.js, providing a robust set of features to build web and mobile applications.
- **MongoDB**: A NoSQL database used for storing and managing data in a flexible, JSON-like format.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model data.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and session management.
- **Swagger**: A tool used for API documentation, allowing developers to design, build, document, and consume RESTful web services.

## Features

- **User Authentication**: Implements secure authentication using JWT, including user registration and login functionality.
- **API Endpoints**: Provides a range of RESTful API endpoints for managing performances.
- **Data Validation**: Ensures the integrity and security of data through robust validation mechanisms.
- **Error Handling**: Comprehensive error handling throughout the application, providing meaningful error messages and status codes.
- **Swagger API Documentation**: Automatically generated and interactive API documentation, available at `/api-docs` after starting the server.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   \`\`\`bash
   git clone https://github.com/yurii-shkrobut-m/theater-back.git
   cd theater-back
   \`\`\`

2. **Install dependencies**:

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run the following command to install the project's dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. **Start the server**:

   Run the following command to start the server:

   \`\`\`bash
   npm start
   \`\`\`

   The server should now be running at `http://localhost:3000/`.

## API Documentation

API documentation is available via Swagger. After starting the server, you can access the Swagger UI at `http://localhost:3000/api-docs`. This provides a detailed overview of all available endpoints, including request and response formats.
