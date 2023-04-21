import {PkgFiles} from "../src/utils/pkgFiles"
import { FsUtil } from "@/utils/fsUtil";
import path from "path";

// describe("test function", () => {
//   it("path resolve", (done) => {
//     new Promise(async (resolve, reject) => {
//       const res = await PkgFiles.allProjectPackagesFile("packages");
//       console.log(`结果${JSON.stringify(res)}`);
//       resolve(res);
//       done();
//     });
//     setTimeout(() => {
//     }, 0);
//   })
  // it("readfile", (done) => {
  //     new Promise(async (resolve, reject) => {
  //       console.log(await FsUtil.readFile("E:\\前端\\oms-FCT\\packages\\hr\\package.json"));
  //       resolve(1);
  //     });
  //     setTimeout(() => {
  //       done();
  //     }, 0);
  //   })
// })

describe("test path resolve", () => {
  it("path resolve", () => {
    const a = "E:\\前端\\oms-FCT\\packages\\express-f\\package.json";
    const lastIndex = a.lastIndexOf("\\");
    console.log(a.substring(0, lastIndex));
  })
})