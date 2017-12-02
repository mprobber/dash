const dashButton = require("node-dash-button");
const { readFileSync } = require("fs");

function malformedConfig() {
  console.log("Configuration file was malformed");
  process.exit(1);
}

let config;

const configFile = process.argv[2];

if (!configFile) {
  console.log("Usage: yarn start <config-file>");
  process.exit(1);
}

try {
  config = JSON.parse(readFileSync(configFile));
} catch (e) {
  malformedConfig();
}

if (!Array.isArray(config)) {
  malformedConfig();
}

config.forEach(({ button, mac, integrations, options }) => {
  button = button || mac;

  if (!mac) {
    console.log(
      "You need to provide a MAC address for the button for it to work..."
    );
    return;
  }

  if (!integrations || !Array.isArray(integrations)) {
    console.log(`No integrations found for ${button}... skipping`);
    return;
  }

  const integrationFunctions = integrations
    .map(integration => {
      try {
        return require(`./lib/${integration}`);
      } catch (e) {
        console.log(
          `Could not load integration ${integration} for button ${
            button
          }... skipping.`
        );
        return;
      }
    })
    .filter(Boolean);

  const dash = dashButton(mac);
  dash.on("detected", () => {
    integrationFunctions.forEach(fn => fn(button, options));
  });
});
