const fetch = require(`node-fetch`);

const NPM_PACKAGE_STATS_URL = `https://api.npmjs.org/downloads/point/last-month/@strapi-community/deployify`;
const GITHUB_STATS_URL = `https://api.github.com/repos/strapi-community/strapi-tool-deployify`;

const getNPMStats = async () => {
  const res = await fetch(NPM_PACKAGE_STATS_URL);
  const npm = await res.json();
  return {
    downloads: npm.downloads
  };
};

const getGithubStats = async () => {
  const res = await fetch(GITHUB_STATS_URL);
  const github = await res.json();
  return {
    stars: github.stargazers_count
  };
};

module.exports = {
  getNPMStats,
  getGithubStats
};
