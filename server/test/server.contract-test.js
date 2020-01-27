const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const path = require("path");

describe('Pact Verification', () => {
  it("validates the expectations of Matching Service", () => {
    const opts = {
      provider: "server",
      logLevel: "ERROR",
      providerBaseUrl: "https://localhost:5555",
      stateHandlers: {
        "There is a car registered": () => {
          return Promise.resolve(`Cars registered to the db`);
        },
      },
      providerVersion: '2.0.0',
      pactUrls: [path.resolve(process.cwd(), '../client/pacts/carrepository-server.json')],
    };
    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact Verification Complete!");
      console.log(output);
    });
  });
});
