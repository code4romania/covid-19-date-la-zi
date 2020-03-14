# co-viz-19 Ffrontend

This will contain the project and all files related to the frontend app that will consume the API

## Dependencies

### Bulma css

The CSS framework used to build the interface is [Bulma](https://bulma.io)

### echartsjs

For building data visualizations we use the react wrapper for `echartsjs`: [echarts-for-react](https://github.com/hustcc/echarts-for-react).

Some usage examples can be found [here](https://github.com/hustcc/echarts-for-react/tree/master/demo/src/charts)

Official docs for [echartsjs](https://www.echartsjs.com/examples/en/index.html)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run lint` or `yarn run lint:fix`

The project uses `eslint` to assure consistency across the codebase. It extends the `standard-jsx` with some custom rules.

**IMPORTANT:** the project has in place a pre-commit hook that will run `yarn run lint:fix` before each commit. However there are errors that can't be automatically fixed(e.g. shadowed variables). In that case the commit will fail and you'll have to fix the errors manually before being able to commit.
If you're in a hurry and really need to commit you can bypass the hook by using the `-n` flag when committing(e.g `git commit -am "message" -n`). However it is not recommended to do that.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
