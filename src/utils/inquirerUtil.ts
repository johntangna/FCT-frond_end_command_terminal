import inquirer from "inquirer";
import { PkgFiles } from "./pkgFiles"
import { answers } from "../types";
import { commanderTerminal } from "../index"

/**
 * 命令行交互工具类，给与用户选择的权利
 */
class InquirerUtil {

  static filename: string = "";

  constructor() {

  }

  /**
   * 找到答案下的项目地址，并运行指令
   */

  private static findProjectPathByAnswer(answers: answers) {
    if (typeof answers != "function") {
      return PkgFiles.findChoicesByAnswers(answers) as answers[]
    }
  }

  /**
   * 问题列表，其中要列出所有项目
   */
  private static questionListHandler(): Promise<answers[]> {
    return PkgFiles.allProjectPackagesFile(InquirerUtil.filename);
  }

  static async startChoices(filename: string) {
    InquirerUtil.filename = filename;
    if (!filename) {
      console.log(`监测到传入的文件夹名为空，请在项目中创建一个父目录，用来放置项目。`);
      process.exit(1);
    }
    const questionList = await InquirerUtil.questionListHandler();
    InquirerUtil.inquirerPrompt(questionList);
  }

  /**
   * 命令行交互
   */
  public static async inquirerPrompt(questionList: answers[] | undefined | Function) {
    inquirer.prompt(questionList as answers[]).then((answers: Record<string, any>) => {
      /**
       * 问题列表已经解决,需要让用户根据项目选择，然后再项目中展示各个命令，继而执行
       */
      const commandList = InquirerUtil.findProjectPathByAnswer(answers);
      const projectPath = commandList?.find(cb => cb.name == answers.command);
      console.log(projectPath?.projectPath);
      // if (answers.listItem?.type == "list") {
      //   InquirerUtil.inquirerPrompt(answers);
      // }
      //  else {
        commanderTerminal.shellExec(`cd ${projectPath?.projectPath} && npm run ${answers.command}`)
      // }
    })
  }
}

const inquirerUtil = new InquirerUtil();

export {
  InquirerUtil,
  inquirerUtil
};