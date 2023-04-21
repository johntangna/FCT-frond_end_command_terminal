import { answers } from "../types";
/**
 * 命令行交互工具类，给与用户选择的权利
 */
declare class InquirerUtil {
    static filename: string;
    constructor();
    /**
     * 找到答案下的项目地址，并运行指令
     */
    private static findProjectPathByAnswer;
    /**
     * 问题列表，其中要列出所有项目
     */
    private static questionListHandler;
    static startChoices(filename: string): Promise<void>;
    /**
     * 命令行交互
     */
    static inquirerPrompt(questionList: answers[] | undefined | Function): Promise<void>;
}
declare const inquirerUtil: InquirerUtil;
export { InquirerUtil, inquirerUtil };
