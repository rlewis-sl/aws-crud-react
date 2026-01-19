# Getting Started with Vite

This project uses [Vite](https://vitejs.dev/) for a fast and modern development experience.

## Available Scripts

In the project directory, you can run:

### `npm start`
(or `npm run dev`)

Runs the app in the development mode.\
Open [http://localhost:5175](http://localhost:5175) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Runs the test suite in watch mode.\
Tests will automatically re-run when you make changes to your code.

See the [Vitest documentation](https://vitest.dev/) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the Vite documentation for more information about [building for production](https://vitejs.dev/guide/build.html).

### `npm run preview`

Locally preview the production build.\
This command will start a local server to serve the built files from the `dist` folder.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing, which is specifically designed to work with Vite.

### `npm run test:run`

Runs the test suite once and exits.\
This is useful for CI/CD pipelines.

### `npm run test:ui`

Launches the Vitest UI for an interactive testing experience.\
Open [http://localhost:51204](http://localhost:51204) to view the test interface in your browser.

Tests are located alongside the source files with the `.test.js` extension. The test suite uses [@testing-library/react](https://testing-library.com/react) for component testing and [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) for additional matchers.

## Deployment

This project includes AWS deployment scripts:
- `npm run create-web` - Creates the S3 bucket and configures it for web hosting
- `npm run deploy-web` - Deploys the built application to S3

The production build is created in the `dist` folder and deployed to S3.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).
