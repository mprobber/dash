const { spawn } = require("child_process");

module.exports = (button, options) => {
  const { signal: config } = options;
  if (!config) {
    console.log(
      "Could not find configuration for signal group to send message to"
    );
  }

  const child = spawn("signal-cli", [
    "-u",
    config.number,
    "send",
    "-g",
    config.groupId,
    "-m",
    `${button} was pressed`
  ]);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on("close", code => {
    if (code !== 0) {
      console.log("message not successfully sent");
    } else {
      console.log("message successfully sent");
    }
  });
};
