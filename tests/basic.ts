import { describe, it } from "mocha";
import { spec } from "pactum";
import assert from "assert";
import { getBaseUrl } from "../src/utils";

const baseUrl = getBaseUrl();

describe('/emperors API tests', function () {

    it('should return a list of strings', async function () {
        await spec()
            .get(`${baseUrl}/emperors`)
            .expectStatus(200)
            .expect((res) => {
                const response = <string[]>res.res.json;
                const strings = response.filter(e => typeof e === "string");

                assert.deepEqual(response, strings, "response should be an array of strings");
            });
    });

});
