#!/usr/bin/env node
import { program } from "commander";
import { exec } from "shelljs";
import { version } from "../package.json"
import { InquirerUtil } from "./utils/inquirerUtil";

/**
 * 命令终端执行器
 */
class CommanderTernimal {

  constructor() {
    this.commanderExec("v", "库版本", () => { console.info(version) })
    this.commanderExec("run <packages>", "该命令将根据<packages>指定文件夹开始运行", InquirerUtil.startChoices);
    program.parse(process.argv);
  }

  /**
   * commander执行方式，通过传入指定的命令格式进行运行
   * "cmdr run <packages>"，回调函数可以读取packages参数
   * @param command 
   */
  commanderExec(command: string, description: string, callback: Function = () => { }) {
    program.command(command)
      .description(description)
      .action((args) => {
        callback(args);
      });
  }

  /**
   * 通过传入指定的命令字符串来执行，回调函数用于特殊情况
   * @param command 命令字符串
   * @param callback 回调函数
   */
  shellExec(command: string, callback: Function = () => { }) {
    exec(command, (code: number, stdout: string, stderr: string) => {
      console.log(`错误码：${code}，输出：${stdout}, 错误信息：${stderr}`);
      callback();
    });
  }

}

const commanderTerminal = new CommanderTernimal();

export { commanderTerminal, CommanderTernimal };