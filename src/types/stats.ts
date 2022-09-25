export interface NPMStatsResponse {
  downloads: number;
  [x: string]: unknown;
}

export interface GithubStatsResponse {
  stargazers_count: number;
  [x: string]: unknown;
}
