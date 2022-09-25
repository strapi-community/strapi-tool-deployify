export type PackageManagers = `npm` | `yarn`;
export type ProjectType = `ts` | `js`;
export type Environment = `development` | `production`;

export interface Configuration {
  url: string;
  projectName: string;
  dirs: {
    providers: string;
    output: string;
  };
  provider: string;
  region?: string;
  packageManager: PackageManagers;
  env: Environment;
  useDocker: boolean;
  useDockerTool: boolean;
  projectType: ProjectType;
  strapi: {
    templates: [`server`, `database`];
    secrets: {
      appKeys: string;
      apiTokenSalt: string;
      adminJwtSecret: string;
      jwtSecret: string;
    };
  };
}
