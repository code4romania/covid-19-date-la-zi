![logo](frontend/public/images/logo-coviz.svg)

# Date la zi • [Live](https://datelazi.ro/)

## Vizualization App to track the COVID-19 virus epidemic

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/date-la-zi.svg?style=for-the-badge)](https://github.com/code4romania/date-la-zi/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/date-la-zi.svg?style=for-the-badge)](https://github.com/code4romania/date-la-zi/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

### Objective

Clear information of the public, increase in transparency, diminishing panic.

### How

System that takes in anonymised data from the cases database and transforms it into information understandable by the large public. Adapted for all devices. [See it Live](https://datelazi.ro/)

[Contributing](#contributing) | [Built with](#built-with) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](.github/CONTRIBUTING.md).

If you plan on contributing code to the project, it's very important to read the [Collaboration Workflow](.github/WORKFLOW.md) we use at Code 4 Romania.
It's very important to create your own fork, push code to branches into your fork, then creating PRs that go into the original project's `develop` branch.
It's all very detailed in the link above.

If you need any assistance you can contact the project's technical lead, [@CristiHabliuc](https://github.com/CristiHabliuc) on github / `@cristi` on Code 4 Romania's Slack.

## Built With

### Programming languages

- Backend: .NET Core
- Frontend: React JS

## Deployment

The builds are automatically deployed when changes are merged as follows:

- Merging a PR into `develop` will trigger the deployment into our staging environment, found at `https://staging.datelazi.ro`
- Merging a PR into `master` (usually only production releases from `develop`) will trigger the deployment into our production environment, found at `https://datelazi.ro`

Read these guides for running locally depending on the module: 

- [Frontend](frontend/README.md)
- [Backend](backend/README.md)

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
