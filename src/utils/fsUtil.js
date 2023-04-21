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
exports.FsUtil = exports.fsUtil = void 0;
const fs_1 = __importDefault(require("fs"));
class FsUtil {
    static letterToNumber(letter) {
        return letter.charCodeAt(0);
    }
    /**
     * 异步读取文件夹中文件夹
     */
    static readDir() {
        return new Promise((resolve, reject) => {
            fs_1.default.readdir(this.solveModulesPath, (err, files) => {
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
    static readFile(file) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(file, "utf8", (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    }
    /**
     * 处理将项目中的父文件夹为指定格式返回
     */
    static dirToAnswerHandler(path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.solveModulesPath = path;
            const fileList = yield this.readDir();
            const projectList = [];
            yield Promise.all(fileList.map((item) => __awaiter(this, void 0, void 0, function* () {
                const scrptsArray = [];
                const jsonData = yield this.readFile(item);
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
            })));
            projectList.sort((prev, next) => FsUtil.letterToNumber(prev.name) - FsUtil.letterToNumber(next.name));
            return projectList;
        });
    }
}
exports.FsUtil = FsUtil;
const fsUtil = new FsUtil();
exports.fsUtil = fsUtil;
