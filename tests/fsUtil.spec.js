"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
describe("test function", () => {
    it("path resolve", () => {
        console.log(process.cwd());
        console.log(path_1.default.resolve(__dirname, "..", "..", "node_modules"), "..");
    });
});
