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
REACT_APP_ADMIN_BASE_URL="your-base-url"
REACT_APP_ZEN_WATCH_DEV_API_KEY="your-zen-watch-api-key"
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
* [PrivateRoutes - React Router V6](https://www.youtube.com/watch?v=2k8NleFjG7I) - [article](https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c)

#### Fetch API
* https://kentcdodds.com/blog/using-fetch-with-type-script
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* https://javascript.info/fetch#post-requests
* https://www.geeksforgeeks.org/javascript-fetch-method/

#### Specific issues
* [Mui typescript error](https://stackoverflow.com/questions/74236131/toggling-colour-mode-when-using-react-context-and-materialui)
* [React Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/)
* [Async button calls](https://stackoverflow.com/questions/54779318/can-async-functions-be-called-in-onclick-in-button-react)
* [Firebase error codes](https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat)
* [Ignore non-serial payload redux-toolkit](https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)
* [Tell typescript process.env is not undefined](https://stackoverflow.com/questions/49817290/how-to-tell-typescript-that-process-is-not-undefined)
* [No Matched Route - React Router 6 Default](https://www.youtube.com/watch?v=5AFzz-aAdfE)
* [Merge arrays ES6](https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items)
* [Warning - updating another state while rendering another component](https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning)
* [Typescript Dict Type](https://stackoverflow.com/questions/42211175/typescript-hashmap-dictionary-interface)
* [JSON pretty print Javascript](https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript)
* [Iterate json Typescript](https://stackoverflow.com/questions/42400298/iterate-json-data-in-javascript-typescript)

##### Cors Error
* [What is CORS and How to solve CORS error in Node.js (Express.js)](https://www.youtube.com/watch?v=OX-9oOcPDfE)
* [Learn CORS In 6 Minutes-Web Dev Simplified](https://www.youtube.com/watch?v=PNtFSVU-YTI)
* [Express (NodeJS) - How to enable CORS](https://www.youtube.com/watch?v=zDqwbiCyur8)
* [NodeJS - How to use CORS with Express](https://www.youtube.com/watch?v=XHNn0ToXovA)
* https://www.twilio.com/blog/add-cors-support-express-typescript-api

