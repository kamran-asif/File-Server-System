# File-Server-API
A RESTful API for managing file operations, developed using Express.js and Node.js. This API allows users to perform essential file operations like listing files in a directory and retrieving the content of a specific file.

## Features
File Listing (GET /files): Fetches a list of all files available in the ./files/ directory.
File Retrieval (GET /file/
): Retrieves the content of a specific file by its filename.
Error Handling: Implements clear and specific error messages for various scenarios:
404 Not Found: If a file is not found.
500 Server Error: For any internal server issues.
File System Integration: Leverages Node.js’s fs module for efficient file handling.

## Installation
Clone the repository:

git clone https://github.com/your-username/FileServerSystem.git
cd FileServerSystem
Install dependencies:

npm install
Create a Directory for Files:

Ensure there is a files directory in the root project folder, where files will be stored and accessed.

## Usage
Start the Server:

npm start
The server will start on http://localhost:3000 (default port).

## API Endpoints:

GET /files: Returns a list of files in the ./files/ directory.

GET http://localhost:3000/files
GET /file/
: Returns the content of a specified file.

GET http://localhost:3000/file/yourfilename.txt
Error Handling
The API handles errors with appropriate HTTP status codes and messages:

404: File not found. Occurs if the requested file does not exist in the ./files/ directory.
500: Internal server error. Used for unexpected issues on the server side.

## Project Structure
FileServerSystem/
├── files/              # Directory for files
├── server.js           # Main server file
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation

## Technologies Used
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for building REST APIs.
fs Module: Node.js's built-in module for handling file system operations.
