#!/opt/homebrew/bin/node

import * as tapo from 'tp-link-tapo-connect';
import chalk from 'chalk';
import convert from 'color-convert';
import {
  parser
} from './parser';
import {
  getCache,
  clearCache
} from './cache';

(async () => {
  const argv = await parser
    .check((arg) => {
      if (
        !arg.onoff &&
        !arg.status &&
        !arg.color &&
        !arg.brightness &&
        !arg.profile &&
        !arg.clearCache) {
        throw new Error('💣 No option set');
      } else {
        return arg;
      }
    }).argv;

  const deviceData = await getCache();

  if (!deviceData.deviceInfo.device_on && !argv.onoff) {
    console.log(chalk.red('Device is off'));
  }

  if (argv.onoff) {
    if (deviceData.deviceInfo.device_on) {
      await tapo.turnOff(deviceData.deviceKey);
      console.log(chalk.red('Device is off'));
    } else if (!deviceData.deviceInfo.device_on) {
      await tapo.turnOn(deviceData.deviceKey);
      console.log(chalk.green('Device is on'));
    }
  }

  if (argv.brightness) {
    await tapo.setBrightness(deviceData.deviceKey, argv.brightness);
    console.log(chalk.green(`Brightness set to ${argv.brightness}`));
  }

  if (argv.color) {
    if (["red", "blue", "green", "yellow", "white", "warmwhite", "daylightwhite"].includes(argv.color)) {
      await tapo.setColour(deviceData.deviceKey, argv.color);
      console.log(chalk.green("Color is set to ") + chalk.yellow(argv.color));
    } else {
      try {
        if (/^[0-9A-F]{6}/ig.test(argv.color)) {
          await tapo.setColour(deviceData.deviceKey, `#${argv.color}`);
        } else if (/^[0-256]-[0-256]-[0-256]$/ig.test(argv.color)) {
          const [r, g, b] = argv.color.split('-').map(x => parseInt(x));
          await tapo.setColour(deviceData.deviceKey, `#${convert.rgb.hex(r, g, b)}`);
        } else {
          await tapo.setColour(deviceData.deviceKey, `#${convert.keyword.hex(argv.color)}`);
        }
      } catch (error) {
        console.log(chalk.red(`Invalid color: ${argv.color}`));
      }
    }
  }

  if (argv.profile) {
    switch (argv.profile) {
      case 1:
        await tapo.setColour(deviceData.deviceKey, "#ffffff");
        await tapo.setBrightness(deviceData.deviceKey, 100);
        console.log(chalk.green("Profile 1 set"));
        break;
      case 2:
        await tapo.setColour(deviceData.deviceKey, "#ffffff");
        await tapo.setBrightness(deviceData.deviceKey, 50);
        console.log(chalk.green("Profile 2 set"));
        break;
      case 3:
        await tapo.setColour(deviceData.deviceKey, "#ffffff");
        await tapo.setBrightness(deviceData.deviceKey, 25);
        console.log(chalk.green("Profile 3 set"));
        break;
    }
  }

  if (argv.status) {
    console.table({
      onOff: deviceData.deviceInfo.device_on,
      mac: deviceData.deviceInfo.mac,
      name: deviceData.deviceInfo.nickname,
      ip: deviceData.deviceInfo.ip,
      onTime: deviceData.deviceInfo.on_time,  
    });
    console.table(deviceData.deviceInfo.default_states);
  }

  if (argv.clearCache) {
    if (await clearCache()) {
      console.log(chalk.green("Cache cleared"));
    } else {
      console.log(chalk.red("Cache not cleared"));
    }
  }
})();