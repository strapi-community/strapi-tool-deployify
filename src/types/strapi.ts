import { Environment, ProjectType } from './config';

export interface GenerateStrapiTemplateContext {
  projectType: ProjectType;
}

export interface StrapiRenderTemplateOptions {
  name: `server` | `database`;
  projectType: ProjectType;
  env: Environment;
}
