"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquirerUtil = exports.InquirerUtil = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const pkgFiles_1 = require("./pkgFiles");
const index_1 = require("../index");
/**
 * 命令行交互工具类，给与用户选择的权利
 */
class InquirerUtil {
    constructor() {
    }
    /**
     * 找到答案下的项目地址，并运行指令
     */
    static findProjectPathByAnswer(answers) {
        if (typeof answers != "function") {
            return pkgFiles_1.PkgFiles.findChoicesByAnswers(answers);
        }
    }
    /**
     * 问题列表，其中要列出所有项目
     */
    static questionListHandler() {
        return pkgFiles_1.PkgFiles.allProjectPackagesFile(InquirerUtil.filename);
    }
    static startChoices(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            InquirerUtil.filename = filename;
            if (!filename) {
                console.log(`监测到传入的文件夹名为空，请在项目中创建一个父目录，用来放置项目。`);
                process.exit(1);
            }
            const questionList = yield InquirerUtil.questionListHandler();
            InquirerUtil.inquirerPrompt(questionList);
        });
    }
    /**
     * 命令行交互
     */
    static inquirerPrompt(questionList) {
        return __awaiter(this, void 0, void 0, function* () {
            inquirer_1.default.prompt(questionList).then((answers) => {
                /**
                 * 问题列表已经解决,需要让用户根据项目选择，然后再项目中展示各个命令，继而执行
                 */
                const commandList = InquirerUtil.findProjectPathByAnswer(answers);
                const projectPath = commandList === null || commandList === void 0 ? void 0 : commandList.find(cb => cb.name == answers.command);
                console.log(projectPath === null || projectPath === void 0 ? void 0 : projectPath.projectPath);
                // if (answers.listItem?.type == "list") {
                //   InquirerUtil.inquirerPrompt(answers);
                // }
                //  else {
                index_1.commanderTerminal.shellExec(`cd ${projectPath === null || projectPath === void 0 ? void 0 : projectPath.projectPath} && npm run ${answers.command}`);
                // }
            });
        });
    }
}
exports.InquirerUtil = InquirerUtil;
InquirerUtil.filename = "";
const inquirerUtil = new InquirerUtil();
exports.inquirerUtil = inquirerUtil;
