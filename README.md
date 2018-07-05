# Streaming UI - Mock
Simple UI for testing Streaming Service.
Authentication and video streaming are mocked for testing purpose only.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Online service

Service is hosted on heroku: `https://slc-streaming-service.herokuapp.com/`

Web App is also hosted on Heroku: `https://slc-streaming-ui.herokuapp.com/`.

There are 3 users configured:

    username: user1, password: user1, limit: 3
    username: user2, password: user2, limit: 4
    username: user3, password: user3, limit: 3

The application keeps the state of the video streaming as long as the user is logged in. Once the user logs out, all streams are stopped in the service.

### Considerations
In a production app, the state of the video streaming could be handled by the endpoint responsible for providing the video data. 

Ex. Create a middleware which identifies when the request/stream has been closed/finished.