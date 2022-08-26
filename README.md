<div align="center">
<h1>@Strapi-community/deployify</h1>
	
<p style="margin-top: 0;">Easily deploy a Strapi Project to cloud platforms 🚀</p>
	
<p>
  <a href="https://discord.strapi.io">
    <img src="https://img.shields.io/discord/811989166782021633?color=blue&label=strapi-discord" alt="Strapi Discord">
  </a>
  <a href="https://www.npmjs.org/package/@strapi-community/deployify">
    <img src="https://img.shields.io/npm/v/@strapi-community/deployify/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.org/package/@strapi-community/deployify">
    <img src="https://img.shields.io/npm/dm/@strapi-community/deployify" alt="Monthly download on NPM" />
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
npx @strapi-community/deployify
```

### 🧹 Resetting project

```bash
@strapi-community/deployify reset
```

_Note_ that **RESET** will delete the `everything` from heroku related to the projectname.

## 🚀 Features

- Easy deploy of your project to some cloud platforms

## 🖐 Requirements

Supported Strapi Versions:

| Strapi Version  | Is Compatible | Last Tested |
| --------------- | ------------- | ----------- |
| v3.x.x          | ❌            | Never       |
| v4.0.x          | ✅            | Never       |
| v4.1.x          | ✅            | Never       |
| v4.2.x          | ✅            | Never       |
| v4.3.x          | ✅            | Never       |
| Future Versions | ✅            | Never       |

**This tool will not work with Strapi v3 projects as it utilizes the V4 folder format that don't exist in the v3!**

## 🎗 Contributing

I/We are actively looking for contributors, maintainers, and others to help shape this package. As this plugins sole purpose within the Strapi community is to be used by other developers and plugin maintainers to get fast responses time.

If interested please feel free to email the lead maintainer Simen at: simen@dehlin.dev or ping `Cookie Monster#6725` on Discord.

## ⭐️ Show your support

Give a star if this project helped you.

## 🔗 Links

- [NPM package](https://www.npmjs.com/package/@strapi-community/deployify)
- [GitHub repository](https://github.com/strapi-community/strapi-tool-deployify)

## 🌎 Community support

- For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/).
- For support with this plugin you can DM me in the Strapi Discord [channel](https://discord.strapi.io/).

## 🙋‍♀️ Authors

- [@Eventyret / Simen Daehlin](https://github.com/Eventyret)

## 🔖 License

See the [LICENSE](./LICENSE.md) file for licensing information.
