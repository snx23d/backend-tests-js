import { readFileSync } from "fs";
import { spec } from "pactum";
import { JiraConfig, JiraHook } from "./interfaces";

const jiraConfigContent = readFileSync("./jira.json", "utf-8");
const jiraHooksContent = readFileSync("./jiraHooks.json", "utf-8");
const mappingContent = readFileSync("./src/jira/testMapping.json", "utf-8");

const jiraConfig: JiraConfig = JSON.parse(jiraConfigContent);
const jiraHooks: JiraHook = JSON.parse(jiraHooksContent);
const mapping = JSON.parse(mappingContent);

function mapTestNames(testNames: string[]) {
    return testNames
        .map(n => mapping[n])
        .filter(v => undefined !== v);
}


export async function postFailedTests(testNames: string[]) {
    const jiraTickets = mapTestNames(testNames);
    const url = jiraConfig.baseUrl.concat(jiraHooks.testFailed);

    await spec()
        .post(url)
        .withHeaders('Content-Type', 'application/json')
        .withBody({
            issues: jiraTickets
        })
        .expectStatus(200)
        .expectBody(null);

}

export async function postPassedTests(testNames: string[]) {
    const jiraTickets = mapTestNames(testNames);
    const url = jiraConfig.baseUrl.concat(jiraHooks.testPassed);

    await spec()
        .post(url)
        .withHeaders('Content-Type', 'application/json')
        .withBody({
            issues: jiraTickets
        })
        .expectStatus(200)
        .expectBody(null);

}
