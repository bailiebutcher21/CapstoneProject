// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyANO1QJx0fkI8XJBjmHB-JjKPJAlFO-Frg',
    authDomain: 'movie-rater-app.firebaseapp.com',
    databaseURL: 'https://movie-rater-app.firebaseio.com',
    projectId: 'movie-rater-app',
    storageBucket: 'movie-rater-app.appspot.com',
    messagingSenderId: '342867243636'
  }
};
