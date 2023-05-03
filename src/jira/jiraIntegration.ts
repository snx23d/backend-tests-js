import { readFileSync } from "fs";
import { spec } from "pactum";
import { JiraConfig, JiraHook } from "./interfaces";

const jiraConfigContent = readFileSync("./jira.json", "utf-8");
const mappingContent = readFileSync("./src/jira/testMapping.json", "utf-8");

let jiraHooksContent: string;
let isConfigPresent = true;
try {
    jiraHooksContent = readFileSync("./jiraHooks.json", "utf-8");
} catch (error) {
    jiraHooksContent = '{}';
    isConfigPresent = false;
}

const jiraConfig: JiraConfig = JSON.parse(jiraConfigContent);
const jiraHooks: JiraHook = JSON.parse(jiraHooksContent);
const mapping = JSON.parse(mappingContent);

function mapTestNames(testNames: string[]) {
    return testNames
        .map(n => mapping[n])
        .filter(v => undefined !== v);
}

async function sendJiraRequest(
    url: string,
    jiraTickets: string[]
) {
    await spec()
        .post(url)
        .withHeaders('Content-Type', 'application/json')
        .withBody({
            issues: jiraTickets
        })
        .expectStatus(200)
        .expectBody(null);
}


export async function postFailedTests(testNames: string[]) {
    const jiraTickets = mapTestNames(testNames);

    if (isConfigPresent) {
        const url = jiraConfig.baseUrl.concat(jiraHooks.testFailed);
        await sendJiraRequest(url, jiraTickets);

    } else {
        console.log(`pretend to move to backlog the following tickets:\n${jiraTickets.join("\n")}\n`);

    }

}

export async function postPassedTests(testNames: string[]) {
    const jiraTickets = mapTestNames(testNames);

    if (isConfigPresent) {
        const url = jiraConfig.baseUrl.concat(jiraHooks.testPassed);
        await sendJiraRequest(url, jiraTickets);

    } else {
        console.log(`pretend to change the status to DONE for the following tickets:\n${jiraTickets.join("\n")}\n`);

    }

}
