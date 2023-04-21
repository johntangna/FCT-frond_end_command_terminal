import { answers } from "../types";
import fs from "fs"
import { Answers, ChoiceOptions, QuestionCollection } from "inquirer";

class FsUtil {

  private static solveModulesPath: string

  private static letterToNumber(letter: string): number {
    return letter.charCodeAt(0);
  }

  /**
   * 异步读取文件夹中文件夹
   */
  public static readDir(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.solveModulesPath, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files.map(item => this.solveModulesPath + "\\" + item + "\\package.json"));
      });
    });
  }

  /**
   * 解析指定文件的内容，由于是json，指定用JSON.parse解析
   * @param file 文件路径
   */
  public static readFile(file: string): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      })
    })
  }

  /**
   * 处理将项目中的父文件夹为指定格式返回
   */
  public static async dirToAnswerHandler(path: string): Promise<answers[]> {
    this.solveModulesPath = path;
    const fileList = await this.readDir();
    const projectList: Record<string, any>[] = [];
    await Promise.all(fileList.map(async (item) => {
      const scrptsArray: Record<string, any>[] = [];
      const jsonData: Record<string, any> = await this.readFile(item);
      // 细分其中命令脚本，将命令整合起来，一起返回到最终数组
      for (let [key, value] of Object.entries(jsonData.scripts)) {
        scrptsArray.push({
          type: "commander",
          name: key,
          projectPath: item.substring(0, item.lastIndexOf("\\")),
        });
      }
      projectList.push({
        type: "list",
        name: jsonData.name,
        message: "请选择运行命令?",
        choices: scrptsArray
      });
    }))
    projectList.sort((prev, next) => FsUtil.letterToNumber(prev.name) - FsUtil.letterToNumber(next.name))
    return projectList;
  }
}

const fsUtil = new FsUtil();

export {
  fsUtil,
  FsUtil
}