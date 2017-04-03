# AngularJS Migration Workshop

This the sample project used in the ngconf workshop by [Asim Hussain](http://twitter.com/jawache) from [codecraft.tv](codecraft.tv) on _Migrating from AngularJS_

## Setup

The project is bootstrapped using npm but at the same time since this is a use case of migrating an old AngularJS project created some time ago we use bower to install the dependencies since that was the norm until a few years ago.

`npm run setup`

## Running

We have a simple server side which we run using 

`npm run server` - this runs a json-server and refreshes the data bases on each run so the deleted contacts will appear again.

To run the application we type

`npm start` - this loads the application using a local webserver, check the console for the port number to use.

The application is a simple contacts application where you can search, create or edit a contact.

## Steps

### Step 1 - Style guide

- Ensure all entities are in separate files

### Step 2 - TypeScript & build tools

*Files*
- Renamed all js files into ts files and added `index.ts` files to make importing easier.
- Copy packages from `bower.json` into `package.json`, run `npm install` and fix some issues are we go along
    - "ngInfiniteScroll" => "ng-infinite-scroll"
    - "AngularJS-Toaster" => "angularjs-toaster"
    - "angular-auto-validate": "^1.19.6" => "angular-auto-validate": "^1.19.0"
- Created entry point `src/main.ts` which contains imports for all required packages, which webpack uses to figure out what to bundle.

*Tooling*
- Installed packages for build tooling `rimraf`, `ts-loader`, `typescript`  and `webpack` via package.json
- Added `tsconfig.json` and `webpack.config.js` to configure typescript compilation and bundling via webpack.
- Added build script in `package.json` so we can run the build tools using `npm run build`. 
- Fix any problems which we had when running the above command.
    - Some errors with contacts service due to stricter checking 
    - Add `import * as angular from 'angular';` so that typescript knows where to load angular from.
    - Add `"@types/angular": "^1.4.0"` to `package.json` to remove any typescript errors

*Consuming*
- Replace all the js files in index.html with just one script tag `<script src="dist/bundle.js"></script>`


