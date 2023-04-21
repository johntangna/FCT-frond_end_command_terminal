"use strict";
describe("simple test", () => {
    it("test", () => {
        // commanderTernimal.shellExec("dir", done);
        const a = (...args) => {
            console.log(args);
        };
        a("1");
        a("1", "2", "3");
        a("1", "2");
        a();
    });
});
