import { Liquid } from 'liquidjs';
import path from 'path';
import { RenderTemplateOptions } from 'types';
import * as file from './file';

const renderer = new Liquid({
  extname: `.liquid`
});

export async function renderTemplate<T extends object = {}>(
  options: RenderTemplateOptions<T>
) {
  const template = await renderer.renderFile(options.filePath, options.ctx);
  const outputPath = path.join(options.outputFilePath, options.outputFileName);
  return file.generate(outputPath, template);
}
