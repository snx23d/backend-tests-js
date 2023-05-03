import { before, describe, it, run } from "mocha";
import { spec } from "pactum";

// eslint-disable-next-line no-unused-vars
let resolveEmperors: (value: string[]) => void;

const pendingEmperors: Promise<string[]> = new Promise((resolve) => {
    resolveEmperors = resolve;
});


before(async function () {
    const response = await spec()
        .get("http://localhost:3000/emperors")
        .expectStatus(200);

    resolveEmperors(response.body);
});


describe('/checksanity API  data driven tests v1', async function () {

    //there has to be a static 'it' in order to execute dynamically generated tests
    //otherwise mocha will just skip the entire 'describe'
    //check https://mochajs.org/#serial-mode for details

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('dummy step', function () {
    });

    const emperors = await pendingEmperors;

    emperors.forEach(emperor => {

        it(`check emperor ${emperor}'s sanity`, async function () {
            await spec()
                .get("http://localhost:3000/checksanity")
                .withQueryParams("name", emperor)
                .expectStatus(200)
                .expectJson({ insane: false });
        });

    });

    run();
});
