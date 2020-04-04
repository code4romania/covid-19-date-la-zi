# Date La Zi - Frontend

This contains the project files related to the frontend app.

## Overview

The project's most interesting data is found in the `dashboard` page. It gets the information from the API
in form of a JSON response, then parses it and groups it into several objects that are passed to
individual cards who in turn display certain charts depending on the provided data.

We use the react wrapper for [echartsjs](https://www.echartsjs.com/examples/en/index.html) -
[echarts-for-react](https://github.com/hustcc/echarts-for-react)
and [Bulma](https://bulma.io) for stylesheets.

The information displayed in this app is provided directly by the Ministry Of Health, we structure it and
serve it in form of an API to this frontend app.

## Dependencies

We use `yarn` so you should [install that first](https://classic.yarnpkg.com/en/docs/install#mac-stable) if you don't already have it.

## Install project dependencies

While in **frontend** directory, you can run this:

```
yarn
```

This will fetch the dependencies.

## Run the project in development mode

```
yarn dev
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

