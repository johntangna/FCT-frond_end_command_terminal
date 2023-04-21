#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommanderTernimal = exports.commanderTerminal = void 0;
const commander_1 = require("commander");
const shelljs_1 = require("shelljs");
const package_json_1 = require("../package.json");
const inquirerUtil_1 = require("./utils/inquirerUtil");
/**
 * 命令终端执行器
 */
class CommanderTernimal {
    constructor() {
        this.commanderExec("v", "库版本", () => { console.info(package_json_1.version); });
        this.commanderExec("run <packages>", "该命令将根据<packages>指定文件夹开始运行", inquirerUtil_1.InquirerUtil.startChoices);
        commander_1.program.parse(process.argv);
    }
    /**
     * commander执行方式，通过传入指定的命令格式进行运行
     * "cmdr run <packages>"，回调函数可以读取packages参数
     * @param command
     */
    commanderExec(command, description, callback = () => { }) {
        commander_1.program.command(command)
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
    shellExec(command, callback = () => { }) {
        (0, shelljs_1.exec)(command, (code, stdout, stderr) => {
            console.log(`错误码：${code}，输出：${stdout}, 错误信息：${stderr}`);
            callback();
        });
    }
}
exports.CommanderTernimal = CommanderTernimal;
const commanderTerminal = new CommanderTernimal();
exports.commanderTerminal = commanderTerminal;
