#!/usr/local/bin/node
import * as tapo from "tp-link-tapo-connect";
import yargs from "yargs/yargs";
import chalk from "chalk";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const parser = yargs(process.argv.slice(2))
    .usage("Usage: $0 <options>")
    .options({
        "onoff": {
            alias: "o",
            describe: "Turn on or off the tapo",
            type: "boolean"
        },
        "color": {
            alias: "c",
            describe: "Set the color of the tapo",
            type: "string"
        },
        "brightness": {
            alias: "b",
            describe: "Set the brightness of the tapo",
            type: "number"
        },
        "profile": {
            alias: "p",
            describe: "Set the profile of the tapo",
            choices: [1, 2, 3]
        },
        "status": {
            alias: "s",
            describe: "Get the status of the tapo",
            type: "boolean"
        },
    });

(async () => {
    const argv = await parser
        .check((argv) => {
            // check if at least one command is given
            if (!argv.onoff && !argv.color && !argv.brightness && !argv.profile && !argv.status) {
                throw new Error("No command given");
            } else {
                return true;
            }
        })
        .argv;
    const deviceToken = await tapo.loginDeviceByIp(process.env.MAIL, process.env.PASS, process.env.HOST);
    const deviceInfo = await tapo.getDeviceInfo(deviceToken);

    if (argv.status) {
        const generalInfo = {
            device_id: deviceInfo.device_id,
            type: deviceInfo.type,
            model: deviceInfo.model,
            mac: deviceInfo.mac,
            specs: deviceInfo.specs,
            lang: deviceInfo.lang,
            device_on: deviceInfo.device_on,
            on_time: deviceInfo.on_time,
            overheated: deviceInfo.overheated,
            nickname: deviceInfo.nickname,
            avatar: deviceInfo.avatar,
            time_diff: deviceInfo.time_diff,
            region: deviceInfo.region,
            longitude: deviceInfo.longitude,
            latitude: deviceInfo.latitude,
            has_set_location_info: deviceInfo.has_set_location_info,
            ip: deviceInfo.ip,
            ssid: deviceInfo.ssid,
            signal_level: deviceInfo.signal_level,
            rssi: deviceInfo.rssi,
        };
        console.table(generalInfo);
        console.table(deviceInfo.default_states);
        return;
    }

    if (!deviceInfo.device_on && !argv.onoff) {
        console.log(chalk.red.bold("Device is off"));
        return;
    }

    if (argv.onoff) {
        if (deviceInfo.device_on) {
            await tapo.turnOff(deviceToken);
            console.log(chalk.red.bold("Device is off"));
            return;
        } else {
            await tapo.turnOn(deviceToken);
            console.log(chalk.green.bold("Device is on"));
        }
    }

    if (argv.profile) {
        switch (argv.profile) {
            case 1:
                await tapo.setColour(deviceToken, "#ffffff");
                await tapo.setBrightness(deviceToken, 100);
                break;
            case 2:
                await tapo.setColour(deviceToken, "#ffffff");
                await tapo.setBrightness(deviceToken, 50);
                break;
            case 3:
                await tapo.setColour(deviceToken, "#ffffff");
                await tapo.setBrightness(deviceToken, 25);
                break;
        }
        return;
    }

    if (argv.color) {
        if (/^[0-9A-F]{6}/ig.test(argv.color)) {
            await tapo.setColour(deviceToken, `#${argv.color}`);
            console.log(chalk.green.bold("Color is set to ") + chalk.yellow(`#${argv.color}`));    
        } else if (["red", "blue", "green", "yellow", "white", "warmwhite", "daylightwhite"].includes(argv.color)) {
            await tapo.setColour(deviceToken, argv.color);
            console.log(chalk.green.bold("Color is set to ") + chalk.yellow(argv.color));
        } else {
            console.log(chalk.red.bold("Invalid color"));
        }
    }

    if (argv.brightness) {
        if (argv.brightness > 0 && argv.brightness <= 100) {
            await tapo.setBrightness(deviceToken, argv.brightness);
            console.log(chalk.green.bold("Brightness is set to ") + chalk.yellow(argv.brightness));
        } else {
            console.log(chalk.red.bold("Invalid brightness"));
        }
    }
})()