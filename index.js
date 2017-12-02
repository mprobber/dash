const dashButton = require("node-dash-button");
const { readFileSync } = require("fs");

function malformedConfig() {
  console.log("Configuration file was malformed");
  process.exit(1);
}

let config;

const configFile = process.argv[1];
if (!configFile) {
  console.log(`Usage: ${process.argv[0]} <config-file>`);
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

config.forEach(({ button, integrations }) => {
  if (!button) {
    console.log(
      "You need to provide a MAC address for the button for it to work..."
    );
    return;
  }
  if (!integrations || Array.isArray(integrations)) {
    console.log(`No integrations found for ${button}... skipping`);
    return;
  }

  const dash = dashButton(button);
  dash.on("detected", () => {
    integrations.forEach(integration => {
      try {
        const integrationFunction = require(`./lib/${integration}`);
        integrationFunction();
      } catch (e) {
        console.log(`Could not run integration ${integration}`);
      }
    });
  });
});
