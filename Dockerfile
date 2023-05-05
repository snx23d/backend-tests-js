FROM node:18.16.0-alpine3.16

RUN mkdir /opt/backend_tests_js

COPY src/ /opt/backend_tests_js/src/
COPY node_modules/ /opt/backend_tests_js/node_modules/
COPY tests/ /opt/backend_tests_js/tests/

COPY package.json /opt/backend_tests_js/package.json
COPY package-lock.json /opt/backend_tests_js/package-lock.json
COPY jira.json /opt/backend_tests_js/jira.json

ENV MOCHAWESOME_REPORTDIR=report
ENV PORT_NUMBER = 3000

RUN mkdir /opt/backend_tests_js/$MOCHAWESOME_REPORTDIR

WORKDIR /opt/backend_tests_js

CMD ["npm", "run", "testLinux"]
