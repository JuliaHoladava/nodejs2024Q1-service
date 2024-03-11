# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

The app starts on port (4000 as default)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### CRUD Operations

## Users

- GET /user: Retrieve all users
- GET /user/:id: Retrieve a user by ID
- POST /user: Create a new user. Requires a JSON body with login and password
- PUT /user/:id: Update a user's password. Requires a JSON body with oldPassword and newPassword
- DELETE /user/:id: Delete a user by ID

## Tracks

- GET /track: Retrieve all tracks
- GET /track/:id: Retrieve a track by ID
- POST /track: Create a new track. Requires a JSON body with track detail
- PUT /track/:id: Update a track by ID. Requires a JSON body with track details
- DELETE /track/:id: Delete a track by ID

## Albums

- GET /album: Retrieve all albums
- GET /album/:id: Retrieve an album by ID
- POST /album: Create a new album. Requires a JSON body with album details
- PUT /album/:id: Update an album by ID. Requires a JSON body with album details
- DELETE /album/:id: Delete an album by ID

## Artists

- GET /artist: Retrieve all artists
- GET /artist/:id: Retrieve an artist by ID
- POST /artist: Create a new artist. Requires a JSON body with artist details
- PUT /artist/:id: Update an artist by ID. Requires a JSON body with artist details
- DELETE /artist/:id: Delete an artist by ID
