# backend-tests-js
a few tests written in js


# Running tests

Run following in the console:

    npm run test


# JIRA integration

Test framework is integrated with friend's of mine private cloud JIRA.

Each scenario corelates to a separate JIRA ticket. After test execution tickets for failed scenarios are moved back to the backlog (they change status DONE -> BACKLOG)
and passed scenarios are moved to the DONE column accordingly. 

In this particular case the integration uses separate webhooks for the above cases.

 `jiraHooks.json` is omitted from the repo for obvious reasons.

 For some reason npm and Windows don't like relative paths in package.json, hence `test` and `testLinux`.

 # Commands

Chain of commands to run tests inside Docker container:

1. delete any previous instances of images and containers for both backend and test suite
2. enter folder with backend application
3. `docker build -t backend:1.0 .`
4. enter folder with backend test suite
5. `docker build -t backend-tests-js:1.0 .`
6. `docker-compose -f docker-compose.yaml up`
7. tests are executing now
8. stop both services: `docker-compose -f docker-compose.yaml down`

If version of backend or tests changes it has to be the same in both the building command and the `docker-compose.yaml` file

