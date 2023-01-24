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

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

Create a .env file in the root folder & following secrets to the .env file, consult Dheeban.
```
REACT_APP_FIREBASE_API_KEY="copy-from-firebase-config"
REACT_APP_FIREBASE_AUTH_DOMAIN="copy-from-firebase-config"
REACT_APP_FIREBASE_PROJECT_ID="copy-from-firebase-config"
REACT_APP_FIREBASE_STORAGE_BUCKET="copy-from-firebase-config"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="copy-from-firebase-config"
REACT_APP_FIREBASE_APP_ID="copy-from-firebase-config"
```

``` npm start ```
Starts the app with node command.

``` num run build ```
Builds the app for production.

``` npm run test ```
Runs the tests for the app.


### Setup guides
* [Top charting libraries react-js 2023](https://technostacks.com/blog/react-chart-libraries/)
* [Build a REACT admin dashboard app](https://www.youtube.com/watch?v=wYpCWwD1oz0) - [git](https://github.com/ed-roh/react-admin-dashboard)
* [React MUI Fullstack MERN App](https://www.youtube.com/watch?v=K8YELRmUb5o) - [git](https://github.com/ed-roh/mern-social-media)
* [React TypeScript](https://create-react-app.dev/docs/adding-typescript/)
* [React TypeScript YouTube](https://builtin.com/software-engineering-perspectives/create-react-app-typescript)
* [Google Fonts](https://fonts.google.com/)
* [Firebase authentication](https://www.youtube.com/watch?v=unr4s3jd9qA)
* [React Authentication Crash Course With Firebase And Routing](https://www.youtube.com/watch?v=PKwu15ldZ7k)
* [Followed: React Firebase Authentication Tutorial | Firebase 9 Tutorial](https://www.youtube.com/watch?v=9bXhf_TELP4)
* [Redux toolkit](https://www.youtube.com/watch?v=9zySeP5vH9c)

#### Specific issues
* [Mui typescript error](https://stackoverflow.com/questions/74236131/toggling-colour-mode-when-using-react-context-and-materialui)
* [React Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/)
* [Async button calls](https://stackoverflow.com/questions/54779318/can-async-functions-be-called-in-onclick-in-button-react)
* [Firebase error codes](https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat)
