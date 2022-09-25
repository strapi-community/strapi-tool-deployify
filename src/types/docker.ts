import { Environment, PackageManagers, ProjectType } from './config';

export interface DockerGenerateOptions {
  env: Environment;
  projectType: ProjectType;
  packageManager: PackageManagers;
}
