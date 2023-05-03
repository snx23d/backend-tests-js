import { Context } from "mocha";


const passedTests: string[] = [];
const failedtests: string[] = [];

export const mochaHooks = {

    afterEach(this: Context) {

        if (undefined !== this.currentTest) {
            if ("passed" === this.currentTest.state) {
                passedTests.push(this.currentTest?.title);
            } else {
                failedtests.push(this.currentTest.title)
            }
        }
    },
};

export async function mochaGlobalTeardown() {
    console.log("sssssssssssssss");

}
