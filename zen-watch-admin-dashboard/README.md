# zen-watch-admin-dashboard
A dashboard admin tool for web3 devs.

### Code walkthrough
This is a react app, with redux for state management & material ui for visual rendering.

```
src -- source folder with all source code
- index.tsx -- main entry point
- App.tsx -- called by index.tsx, houses routing & other required provider setups
- app/features -- Redux state management folders, using the latest redux-toolkit framework
- data -- contains mock data
- components -- contains reusable ui components
- scenes -- cointains the individual pagegs of the app
- util -- contains common utilities file.
- firebase-config.js - contains the firebase configurations
```

### Create Environment Variables
Create a .env file in the root folder & following secrets to the .env file, consult Dheeban.
```
REACT_APP_FIREBASE_API_KEY="copy-from-firebase-config"
REACT_APP_FIREBASE_AUTH_DOMAIN="copy-from-firebase-config"
REACT_APP_FIREBASE_PROJECT_ID="copy-from-firebase-config"
REACT_APP_FIREBASE_STORAGE_BUCKET="copy-from-firebase-config"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="copy-from-firebase-config"
REACT_APP_FIREBASE_APP_ID="copy-from-firebase-config"
REACT_APP_ADMIN_BASE_URL="your-base-url"
REACT_APP_ZEN_WATCH_DEV_API_KEY="your-zen-watch-api-key"
```

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

``` npm start ```
Starts the app with node command.

``` num run build ```
Builds the app for production.

``` npm run test ```
Runs the tests for the app.

### Starting the app in product using PM2
For admin-dashboard, run from the root (make sure to start the admin-api-server before this):
```
npm run build
pm2 start app.config.json
```