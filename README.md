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

### Step 3 - AngularJS 1.5+

- Upgrade "angular", "angular-animate" and "angular-resource" to the latest 1.x version of angualr (1.6.2 in this example)

### Step 4

*Controllers => Components*
- Rename folder `controllers` to `components`
- Rename `*.controller.ts` to `*.component.ts`
- Change all controllers to be components using a component definition object
    - Remove relevant template files and inline in component
    - Components use controller as syntax by default so in template remember to now use `$ctrl`
    - Note: selector in component will be converted to snake case when used in template, so `personList` will be used as `person-list`
    - Change `templates/form.html` this is used in edit and create components and now needs to use `$ctrl`

*Directives => Components*
- Move the `card.directive` and `spinner.directive` to the component folder and rename to components
- Convert both of these to components as well
    
- Changed `app.routes.ts` to use components as HTML tags i.e. `template: '<person-list></person-list>'`    

### Step 5 - ES6'ify

- We've already actually started using ES6 in the componentify section.
- We changed `contact.resource`, don't have `ngResource` in Angular but we do have an equivalent to `$http`, so we move to using `$http` instead.
- We update `contact.service` to use an ES6 class.
    - Use `for..of` instead of `angular.forEach`
    - Use `Promise` instead of `$q`
    - Use `service` instead of `factory`
    
    
### Step 6 - Dual Boot
    
- Add Angular dependencies to `package.json`
- Add `polyfills.ts` file
- Remove `ng-app` from `index.html` file
- Add polyfills, `NgModule` and hybrid bootstrap code to `app.main.ts`

