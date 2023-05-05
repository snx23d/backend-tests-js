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
