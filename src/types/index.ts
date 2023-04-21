export type answers = {
  type?: "commander" | "list";
  name?: string;
  projectPath?: string;
  message?: string;
  listItem?: answers;
  choices?: answers[] | undefined | Function;
}
