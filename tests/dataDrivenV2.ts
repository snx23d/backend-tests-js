import { describe, it, run } from "mocha";
import { spec } from "pactum";
import { getBaseUrl } from "../src/utils";

const baseUrl = getBaseUrl();

async function ddtWrapper() {

    const response = await spec()
        .get(`${baseUrl}/emperors`)
        .expectStatus(200);

    const emperors: string[] = response.body;

    describe('/checksanity API  data driven tests', async function () {

        emperors.forEach(emperor => {

            it(`check emperor ${emperor}'s sanity ddt v2`, async function () {
                await spec()
                    .get(`${baseUrl}/checksanity`)
                    .withQueryParams("name", emperor)
                    .expectStatus(200)
                    .expectJson({ insane: false });
            });
        });
    });

    run();
}

ddtWrapper();
