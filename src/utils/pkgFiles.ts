import { QuestionCollection, Answers } from "inquirer";
import path from "path";
import { FsUtil } from "./fsUtil"
import { answers } from "../types";

/**
 * packages.json文件处理类
 */
class PkgFiles {

  /**
   * 要查询的文件夹根目录名
   */
  static filename: string = "";

  /**
   * 所有问题和答案
   */
  static allChoice: answers[] = [];

  /**
   * 找到该项目下的所有可选项
   */
  public static findChoicesByAnswers(answers: answers): answers[] | undefined | Function {
    return PkgFiles.allChoice.find(cb => cb.name == answers.listItem)?.choices;
  }

  /**
   * 获取指定文件夹下的所有文件
   * @param filename 
   * @returns 
   */
  public static getCurrentPackagesPath() {
    // return path.resolve(path.resolve(__dirname, "..", "..", "node_modules"), "..", PkgFiles.filename);
    /**
     * 这里有些特殊，上面一句，用于测试本项目文件中的packages文件夹
         * 但是实际情况，要检测库里面的父级node_modules的同级文件夹packages
     */
    return path.resolve(path.resolve(__dirname, "..", ".."), "..", "..", PkgFiles.filename);
  }

  /**
   * 读取下面所有的项目文件，找到package.json，将里面的命令与项目name提取出来，并最后返回回来给问题库
   * @param filename 
   * @returns 
   */
  private static async createChoices(): Promise<answers[]> {
    const path = PkgFiles.getCurrentPackagesPath();
    const allParentChoices = await FsUtil.dirToAnswerHandler(path);
    return allParentChoices;
  }

  /**
   * 找到项目下所有的packages.json文件，
   * @param filename 
   */
  public static async allProjectPackagesFile(filename: string): Promise<answers[]> {
    PkgFiles.filename = filename;
    PkgFiles.allChoice = await PkgFiles.createChoices();
    return [{
      type: "list",
      name: "listItem",
      message: "请选择要运行命令的项目",
      choices: PkgFiles.allChoice,
    }, {
      type: "list",
      name: "command",
      message: "请选择运行命令",
      choices: (answers: answers) => {
        return PkgFiles.findChoicesByAnswers(answers);
      }
    }];
  }
}

const pkgFiles = new PkgFiles();

export {
  pkgFiles,
  PkgFiles
};