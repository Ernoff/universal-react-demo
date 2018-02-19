const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-282338.oktapreview.com",
  token: "00JaLCsZYkhuKlcu5r46jPBOWryjghESzSZ5j7IxEK"
});

module.exports = client