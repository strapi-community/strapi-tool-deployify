<div align="center">
<h1>@Strapi-community/herokufy</h1>
	
<p style="margin-top: 0;">Add docker support for a Strapi Project with ease 🚀</p>
	
<p>
  <a href="https://discord.strapi.io">
    <img src="https://img.shields.io/discord/811989166782021633?color=blue&label=strapi-discord" alt="Strapi Discord">
  </a>
  <a href="https://www.npmjs.org/package/@strapi-community/herokufy">
    <img src="https://img.shields.io/npm/v/@strapi-community/herokufy/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.org/package/@strapi-community/herokufy">
    <img src="https://img.shields.io/npm/dm/@strapi-community/herokufy" alt="Monthly download on NPM" />
  </a>
</p>
</div>

## Table of Contents <!-- omit in toc -->

- [🚦 Current Status](#---current-status)
- [✨ Usage](#--usage)
  - [🤖 Using CLI Arguments](#---using-cli-arguments)
  - [🧹 Resetting project](#---resetting-project)
- [🚀 Features](#---features)
- [🐳 Docker-compose support](#---docker-compose-support)
- [🎗 Contributing](#---contributing)
- [⭐️ Show your support](#---show-your-support)
- [🔗 Links](#---links)
- [🌎 Community support](#---community-support)
- [🙋‍♀️ Authors](#------authors)
- [🔖 License](#---license)

## 🚦 Current Status

This package is currently under development and should be consider **BETA** in terms of state. I/We are currently accepting contributions and/or dedicated contributors to help develop and maintain this package.

For more information on contributing please see [the contrib message below](#contributing).

## ✨ Usage

```bash
npx @strapi-community/herokufy
```

You can also call it directly with arguments

```bash
npx @strapi-community/herokufy new --dbclient=mysql --dbhost=localhost --dbport=1234 --dbname=strapi --dbusername=strapi --dbpassword=strapi --projecttype=js --packagemanager=yarn --usecompose=false --env=both
```

### 🤖 Using CLI Arguments

Please note the `new` keyword is required for this to take effect.

```markdown
npx @strapi-community/herokufy new
--dbtype=<dbclient>
--dbhost=<dbhost>
--dbport=<dbport>
--dbname=<dbname>
--dbusername=<dbusername>
--dbpassword=<dbpassword>
--projecttype=<projecttype>
--packagemanager=<packagemanager>
--usecompose=<usecompose>
--env=<env>
```

```markdown
| 💻 Command     | 💬 Value                                | 🦄 Type | 🐲 Default    |
| -------------- | --------------------------------------- | ------- | ------------- |
| dbclient       | `postgres` \| `mysql` \| `mariadb`      | String  | `postgres`    |
| dbhost         |                                         | String  | `localhost`   |
| dbport         | `5432` \| `3306`                        | Number  | `5432`        |
| dbname         |                                         | String  | `strapi`      |
| dbusername     |                                         | String  | `strapi`      |
| dbpassword     |                                         | String  |               |
| projecttype    | `ts` \| `js`                            | String  | `js`          |
| packagemanager | `yarn` \| `npm`                         | String  | `yarn`        |
| usecompose     | `true` \| `false`                       | Boolean | `false`       |
| env            | `development` \| `production` \| `both` | String  | `development` |
```

### 🧹 Resetting project

```bash
@strapi-community/herokufy reset
```

_Note_ that **RESET** will delete the `config/env` folder with all of it's content

## 🚀 Features

- Easy add support for docker
- Auto detects `yarn` or `npm` in your project
- Build a docker-compose file

## 🐳 Docker-compose support

- Postgres 12
- MySQL 5.7
- MariaDB

## 🎗 Contributing

I/We are actively looking for contributors, maintainers, and others to help shape this package. As this plugins sole purpose within the Strapi community is to be used by other developers and plugin maintainers to get fast responses time.

If interested please feel free to email the lead maintainer Simen at: simen@dehlin.dev or ping `Cookie Monster#6725` on Discord.

## ⭐️ Show your support

Give a star if this project helped you.

## 🔗 Links

- [NPM package](https://www.npmjs.com/package/@strapi-community/herokufy)
- [GitHub repository](https://github.com/strapi-community/strapi-tool-herokufy)

## 🌎 Community support

- For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/).
- For support with this plugin you can DM me in the Strapi Discord [channel](https://discord.strapi.io/).

## 🙋‍♀️ Authors

- [@Eventyret / Simen Daehlin](https://github.com/Eventyret)

## 🔖 License

See the [LICENSE](./LICENSE.md) file for licensing information.
