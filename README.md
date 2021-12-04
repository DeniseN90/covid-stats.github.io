# CovidApi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.


# Description

The project is a SPA built using Angular 9
It displays daily updated numbers about Covid-19 in the world  
Here the used API [https://rapidapi.com/api-sports/api/covid-193](https://rapidapi.com/api-sports/api/covid-193)

The project is published at the page [https://denisenanni.github.io/covid-stats/](https://denisenanni.github.io/covid-stats/)

Still in development, contributions are welcomed

## Table of contents
1. Installation
2. Build
3. Build for production
4. Run the app
5. Development server
6. Running tests


## 1. Installation
After downloading the project you will need to install the dependencies, which will be in the folder 'node_modules'. 
Open a terminal in the root of the project and install them running `npm i`


## 2. Build

Run `ng build` to build the project. Generally the build artifacts will be stored in the `dist/` directory, however here they are stored in a folder called `docs/` .
This behavior can be restored modifying the file `package.json` (scripts.build: "/docs" -> "/dist").


## 3. Build for production

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory. 
Use the `--prod` flag for a production build.
`ng build --prod --output-path docs`
Remember to change the property scipts.build:prod in the the file `package.json` 


## 4. Run the app

Before running the application modify the file index.html:
<!-- delete this line-->
<!-- <base href="https://denisen90.github.io/covid-stats/" /> -->
<!-- uncomment this to run it locally -->
<!-- <base href="/" /> -->
 

## 5. Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## 6. Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## CD / CI
The file .workflows/build.yml manages the build and deploy, done upon commit.
The node_modules are cached if changes were not made to the package.json









