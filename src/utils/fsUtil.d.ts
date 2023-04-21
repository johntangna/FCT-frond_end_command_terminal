import { answers } from "../types";
declare class FsUtil {
    private static solveModulesPath;
    private static letterToNumber;
    /**
     * 异步读取文件夹中文件夹
     */
    static readDir(): Promise<string[]>;
    /**
     * 解析指定文件的内容，由于是json，指定用JSON.parse解析
     * @param file 文件路径
     */
    static readFile(file: string): Promise<Record<string, any>>;
    /**
     * 处理将项目中的父文件夹为指定格式返回
     */
    static dirToAnswerHandler(path: string): Promise<answers[]>;
}
declare const fsUtil: FsUtil;
export { fsUtil, FsUtil };
