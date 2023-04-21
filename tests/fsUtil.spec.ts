import {PkgFiles} from "../src/utils/pkgFiles"
import { FsUtil } from "@/utils/fsUtil";
import path from "path";

describe("test function", () => {
  it("path resolve", () => {
    console.log(process.cwd());
    console.log(path.resolve(__dirname, "..", "..", "node_modules"), "..");
  })
});