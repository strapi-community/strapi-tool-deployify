import fetch from 'node-fetch';
import { GithubStatsResponse, NPMStatsResponse } from '../types';

const NPM_PACKAGE_STATS_URL = `https://api.npmjs.org/downloads/point/last-month/@strapi-community/deployify`;
const GITHUB_STATS_URL = `https://api.github.com/repos/strapi-community/strapi-tool-deployify`;

async function request<T>(url: string) {
  const res = await fetch(url);
  return res.json() as T;
}

export async function getNPMStats() {
  const npm = await request<NPMStatsResponse>(NPM_PACKAGE_STATS_URL);
  return {
    downloads: npm.downloads || 0
  };
}

export async function getGithubStats() {
  const github = await request<GithubStatsResponse>(GITHUB_STATS_URL);
  return {
    stars: github.stargazers_count || 0
  };
}
