export interface RenderTemplateOptions<T> {
  filePath: string;
  ctx: T;
  outputFilePath: string;
  outputFileName: string;
}
