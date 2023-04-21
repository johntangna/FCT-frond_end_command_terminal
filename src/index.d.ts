#!/usr/bin/env node
/**
 * 命令终端执行器
 */
declare class CommanderTernimal {
    constructor();
    /**
     * commander执行方式，通过传入指定的命令格式进行运行
     * "cmdr run <packages>"，回调函数可以读取packages参数
     * @param command
     */
    commanderExec(command: string, description: string, callback?: Function): void;
    /**
     * 通过传入指定的命令字符串来执行，回调函数用于特殊情况
     * @param command 命令字符串
     * @param callback 回调函数
     */
    shellExec(command: string, callback?: Function): void;
}
declare const commanderTerminal: CommanderTernimal;
export { commanderTerminal, CommanderTernimal };
