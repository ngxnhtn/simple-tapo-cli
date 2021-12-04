#!/usr/local/bin/node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tapo = __importStar(require("tp-link-tapo-connect"));
const yargs_1 = __importDefault(require("yargs/yargs"));
const chalk_1 = __importDefault(require("chalk"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/../.env" });
const parser = (0, yargs_1.default)(process.argv.slice(2))
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const argv = yield parser
        .check((argv) => {
        // check if at least one command is given
        if (!argv.onoff && !argv.color && !argv.brightness && !argv.profile && !argv.status) {
            throw new Error("No command given");
        }
        else {
            return true;
        }
    })
        .argv;
    const deviceToken = yield tapo.loginDeviceByIp(process.env.MAIL, process.env.PASS, process.env.HOST);
    const deviceInfo = yield tapo.getDeviceInfo(deviceToken);
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
        console.log(chalk_1.default.red.bold("Device is off"));
        return;
    }
    if (argv.onoff) {
        if (deviceInfo.device_on) {
            yield tapo.turnOff(deviceToken);
            console.log(chalk_1.default.red.bold("Device is off"));
            return;
        }
        else {
            yield tapo.turnOn(deviceToken);
            console.log(chalk_1.default.green.bold("Device is on"));
        }
    }
    if (argv.profile) {
        switch (argv.profile) {
            case 1:
                yield tapo.setColour(deviceToken, "#ffffff");
                yield tapo.setBrightness(deviceToken, 100);
                console.log(chalk_1.default.green.bold("Profile 1 set"));
                break;
            case 2:
                yield tapo.setColour(deviceToken, "#ffffff");
                yield tapo.setBrightness(deviceToken, 50);
                console.log(chalk_1.default.green.bold("Profile 2 set"));
                break;
            case 3:
                yield tapo.setColour(deviceToken, "#ffffff");
                yield tapo.setBrightness(deviceToken, 25);
                console.log(chalk_1.default.green.bold("Profile 3 set"));
                break;
        }
        return;
    }
    if (argv.color) {
        if (/^[0-9A-F]{6}/ig.test(argv.color)) {
            yield tapo.setColour(deviceToken, `#${argv.color}`);
            console.log(chalk_1.default.green.bold("Color is set to ") + chalk_1.default.yellow(`#${argv.color}`));
        }
        else if (["red", "blue", "green", "yellow", "white", "warmwhite", "daylightwhite"].includes(argv.color)) {
            yield tapo.setColour(deviceToken, argv.color);
            console.log(chalk_1.default.green.bold("Color is set to ") + chalk_1.default.yellow(argv.color));
        }
        else {
            console.log(chalk_1.default.red.bold("Invalid color"));
        }
    }
    if (argv.brightness) {
        if (argv.brightness > 0 && argv.brightness <= 100) {
            yield tapo.setBrightness(deviceToken, argv.brightness);
            console.log(chalk_1.default.green.bold("Brightness is set to ") + chalk_1.default.yellow(argv.brightness));
        }
        else {
            console.log(chalk_1.default.red.bold("Invalid brightness"));
        }
    }
}))();
