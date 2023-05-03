import { describe, it, run } from "mocha";
import { spec } from "pactum";


async function ddtWrapper() {

    const response = await spec()
        .get("http://localhost:3000/emperors")
        .expectStatus(200);

    const emperors: string[] = response.body;

    describe.only('/checksanity API  data driven tests', async function () {

        emperors.forEach(emperor => {

            it(`check emperor ${emperor}'s sanity ddt v2`, async function () {
                await spec()
                    .get("http://localhost:3000/checksanity")
                    .withQueryParams("name", emperor)
                    .expectStatus(200)
                    .expectJson({ insane: false });
            });
        });
    });

    run();
}

ddtWrapper();
