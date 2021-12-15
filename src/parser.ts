import yargs from "yargs/yargs";

export const parser = yargs(process.argv.slice(2))
  .options({
    onoff: {
      alias: 'o',
      describe: 'Turn on/off the device',
      type: 'boolean',
    },
    status: {
      alias: 's',
      describe: 'Get the status of the device',
      type: 'boolean',
    },
    color: {
      alias: 'c',
      describe: `Set the color of the device
      > warmwhite || daylightwhite || white <`,
      type: 'string',
    },
    brightness: {
      alias: 'b',
      describe: 'Set the brightness of the device',
      type: 'number',
    },
    profile: {
      alias: 'p',
      describe: 'Set the profile of the device',
      type: 'number',
    },
    clearCache: {
      alias: 'l',
      describe: 'Clear the cache',
      type: 'boolean',
    }
});