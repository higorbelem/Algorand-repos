# Welcome to Algorand repos

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Add a .env file to the root of the project, and add the following environment:

   ```
    EXPO_PUBLIC_GITHUB_KEY=github_xxxxxxxxxx
   ```
   

3. Start the app

   ```bash
    npx expo start
   ```
   
## Screenshots

<p float="left">
   <img src="https://drive.usercontent.google.com/download?id=1BX8KfjHT1JrIkX_GQ0Sk9ekxTHDGiA43" alt="drawing" width="400"/>
   <img src="https://drive.usercontent.google.com/download?id=1Kf2B4hYmGody53zSZvb1GqC3cZVSCISf" alt="drawing" width="400"/>
</p>

## Inspirations

1. The main inspiration for the UI was of course github itself, but parts of the identity were changed to fit the company a bit better, like the blue background.

2. The Figma file can be seen [here](https://www.figma.com/design/ut8B39UwSGojdLTDKLv69N/Algorand-repos?node-id=0-1&t=WCOVStoWdgF6I69c-1).

## Improvements

1. <strong>Improve searching</strong>: Since the github API doesn't provide a proper searching parameter, all the searching was done in app. On a real situation the searching would be done on the database through a backend, and also pagination should be implemented.

2. <strong>Favorite</strong>: The favorite system is using only AsyncStorage to store the data, in a real scenario all the logic would be on the backed.

3. <strong>Fetching repositories</strong>: Since the github API doesn't provide a way to get the repositories from multiple orgs at the same time, multiple calls were made.

4. <strong>Markdown</strong>: Due to time, I was not able to implement a Markdown viewer, to preview the README.md.