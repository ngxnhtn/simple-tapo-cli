"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
var yargs_1 = __importDefault(require("yargs/yargs"));
exports.parser = (0, yargs_1.default)(process.argv.slice(2))
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
        describe: "Set the color of the device\n      > warmwhite || daylightwhite || white <",
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
