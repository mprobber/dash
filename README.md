# Dash button framework

The amazon dash buttons are cheap, and I needed a doorbell, so of course I
bought four dash buttons, and decided to make a framework for interacting with
them.

## Usage

As simple as `yarn run start <config-path>`

The config is pretty simple. It's a json file of the following format

```json
[
  {
    "button": "<MAC ADDRESS>",
    "integrations": ["<INTEGRATION NAME>", "<INTEGRATION NAME>"]
  }
];
```

Integrations can be found in `lib/integrations`
