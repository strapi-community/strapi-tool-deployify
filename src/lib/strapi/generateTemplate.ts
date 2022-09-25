import path from 'path';
import { renderTemplate } from 'utils/renderer';
import {
  StrapiRenderTemplateOptions,
  GenerateStrapiTemplateContext,
  RenderTemplateOptions
} from 'types';

export function generateTemplate(options: StrapiRenderTemplateOptions) {
  let renderOptions: RenderTemplateOptions<GenerateStrapiTemplateContext> = {
    filePath: path.join(`templates`, options.name),
    outputFileName: `${options.name}.${options.projectType}`,
    outputFilePath: path.join(process.cwd(), `config`, `env`, options.env),
    ctx: {
      projectType: options.projectType
    }
  };

  return renderTemplate<GenerateStrapiTemplateContext>(renderOptions);
}
