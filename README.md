# ContractClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Set the command to run when the container starts
FROM node:18-alpine as node
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json /app/package.json
COPY tailwind.config.js /app/tailwind.config.js

RUN npm install --force
RUN npm install -D tailwindcss postcss autoprefixer
RUN npx tailwindcss init
RUN npm install -g @angular/cli
COPY . .
RUN export NODE_OPTIONS=--openssl-legacy-provider && ng build
# add app


# start app
FROM nginx:alpine
COPY --from=node /app/dist/contractClient /usr/share/nginx/html
