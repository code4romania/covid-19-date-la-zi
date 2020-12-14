![logo](src/images/logo-coviz.svg)

# Date la zi • [Live](https://datelazi.ro/)

## Vizualization App to track the COVID-19 virus epidemic

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/date-la-zi.svg?style=for-the-badge)](https://github.com/code4romania/date-la-zi/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/date-la-zi.svg?style=for-the-badge)](https://github.com/code4romania/date-la-zi/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

### Objective

Clear information of the public, increase in transparency, diminishing panic.

### How

System that takes in anonymised data from the cases database and transforms it into information understandable by the large public. Adapted for all devices. [See it Live](https://datelazi.ro/)

[Contributing](#contributing) | [Built with](#built-with) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](https://github.com/code4romania/.github/blob/master/CONTRIBUTING.md). If you want to make any change to this repository, please **make a fork first**.

Help us out by testing this project in the [staging environment](https://date-la-zi-git-develop.code4romania.vercel.app). If you see something that doesn't quite work the way you expect it to, open an Issue. Make sure to describe what you _expect to happen_ and _what is actually happening_ in detail.

If you would like to suggest new functionality, open an Issue and mark it as a **[Feature request]**. Please be specific about why you think this functionality will be of use. If you can, please include some visual description of what you would like the UI to look like, if you are suggesting new UI elements.

Also, this is [the workflow we follow](https://github.com/code4romania/.github/blob/master/WORKFLOW.md).

## Overview

The project's most interesting data is found in the `dashboard` page. It gets the information from the API
in form of a JSON response, then parses it and groups it into several objects that are passed to
individual cards who in turn display certain charts depending on the provided data.

We use the react wrapper for [echartsjs](https://www.echartsjs.com/examples/en/index.html) -
[echarts-for-react](https://github.com/hustcc/echarts-for-react)
and [Bulma](https://bulma.io) for stylesheets.

The information displayed in this app is provided directly by the Ministry Of Health.

## Setup

We use `yarn` so you should [install that first](https://classic.yarnpkg.com/en/docs/install#mac-stable) if you don't already have it.

### Install project dependencies

```
yarn
```

### Run the project in development mode

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

If you need any assistance you can contact the project's technical lead, [@CristiHabliuc](https://github.com/CristiHabliuc) on github / `@cristi` on Code 4 Romania's Slack.

## Built With

### Programming languages

- Frontend: React JS

## Deployment

The builds are automatically deployed when changes are merged as follows:

- Merging a PR into `develop` will trigger the deployment into our staging environment, found at [https://date-la-zi-git-develop.code4romania.vercel.app](https://date-la-zi-git-develop.code4romania.vercel.app)
- Merging a PR into `master` (usually only production releases from `develop`) will trigger the deployment into our production environment, found at [https://datelazi.ro](https://datelazi.ro)

## Old setup

For the old setup, that includes: Github Actions, Terraform for AWS deployment and a C# backend, please take a look at [https://github.com/code4romania/date-la-zi/releases/tag/old-setup](https://github.com/code4romania/date-la-zi/releases/tag/old-setup)

## Feedback

- Request a new feature on GitHub.
- Vote for popular feature requests.
- File a bug in GitHub Issues.
- Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
