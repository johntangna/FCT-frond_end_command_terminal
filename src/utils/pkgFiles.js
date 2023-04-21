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
exports.PkgFiles = exports.pkgFiles = void 0;
const path_1 = __importDefault(require("path"));
const fsUtil_1 = require("./fsUtil");
/**
 * packages.json文件处理类
 */
class PkgFiles {
    /**
     * 找到该项目下的所有可选项
     */
    static findChoicesByAnswers(answers) {
        var _a;
        return (_a = PkgFiles.allChoice.find(cb => cb.name == answers.listItem)) === null || _a === void 0 ? void 0 : _a.choices;
    }
    /**
     * 获取指定文件夹下的所有文件
     * @param filename
     * @returns
     */
    static getCurrentPackagesPath() {
        // return path.resolve(path.resolve(__dirname, "..", "..", "node_modules"), "..", PkgFiles.filename);
        /**
         * 这里有些特殊，上面一句，用于测试本项目文件中的packages文件夹
             * 但是实际情况，要检测库里面的父级node_modules的同级文件夹packages
         */
        return path_1.default.resolve(path_1.default.resolve(__dirname, "..", ".."), "..", "..", PkgFiles.filename);
    }
    /**
     * 读取下面所有的项目文件，找到package.json，将里面的命令与项目name提取出来，并最后返回回来给问题库
     * @param filename
     * @returns
     */
    static createChoices() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = PkgFiles.getCurrentPackagesPath();
            const allParentChoices = yield fsUtil_1.FsUtil.dirToAnswerHandler(path);
            return allParentChoices;
        });
    }
    /**
     * 找到项目下所有的packages.json文件，
     * @param filename
     */
    static allProjectPackagesFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            PkgFiles.filename = filename;
            PkgFiles.allChoice = yield PkgFiles.createChoices();
            return [{
                    type: "list",
                    name: "listItem",
                    message: "请选择要运行命令的项目",
                    choices: PkgFiles.allChoice,
                }, {
                    type: "list",
                    name: "command",
                    message: "请选择运行命令",
                    choices: (answers) => {
                        return PkgFiles.findChoicesByAnswers(answers);
                    }
                }];
        });
    }
}
exports.PkgFiles = PkgFiles;
/**
 * 要查询的文件夹根目录名
 */
PkgFiles.filename = "";
/**
 * 所有问题和答案
 */
PkgFiles.allChoice = [];
const pkgFiles = new PkgFiles();
exports.pkgFiles = pkgFiles;
