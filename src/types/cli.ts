export interface CommandMeta {
  name: string;
  description: string;
}

export interface Command {
  invoke(): Promise<void>;
  meta: CommandMeta;
}
