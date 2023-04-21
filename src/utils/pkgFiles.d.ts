import { answers } from "../types";
/**
 * packages.json文件处理类
 */
declare class PkgFiles {
    /**
     * 要查询的文件夹根目录名
     */
    static filename: string;
    /**
     * 所有问题和答案
     */
    static allChoice: answers[];
    /**
     * 找到该项目下的所有可选项
     */
    static findChoicesByAnswers(answers: answers): answers[] | undefined | Function;
    /**
     * 获取指定文件夹下的所有文件
     * @param filename
     * @returns
     */
    static getCurrentPackagesPath(): string;
    /**
     * 读取下面所有的项目文件，找到package.json，将里面的命令与项目name提取出来，并最后返回回来给问题库
     * @param filename
     * @returns
     */
    private static createChoices;
    /**
     * 找到项目下所有的packages.json文件，
     * @param filename
     */
    static allProjectPackagesFile(filename: string): Promise<answers[]>;
}
declare const pkgFiles: PkgFiles;
export { pkgFiles, PkgFiles };
