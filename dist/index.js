#!/opt/homebrew/bin/node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tapo = __importStar(require("tp-link-tapo-connect"));
var chalk_1 = __importDefault(require("chalk"));
var color_convert_1 = __importDefault(require("color-convert"));
var parser_1 = require("./parser");
var cache_1 = require("./cache");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var argv, deviceData, _a, r, g, b, error_1, _b, tmp;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, parser_1.parser
                    .check(function (arg) {
                    if (!arg.onoff &&
                        !arg.status &&
                        !arg.color &&
                        !arg.brightness &&
                        !arg.profile &&
                        !arg.clearCache) {
                        throw new Error('💣 No option set');
                    }
                    else {
                        return arg;
                    }
                }).argv];
            case 1:
                argv = _c.sent();
                return [4 /*yield*/, (0, cache_1.getCache)()];
            case 2:
                deviceData = _c.sent();
                if (!deviceData.deviceInfo.device_on && !argv.onoff) {
                    console.log(chalk_1.default.red('Device is off'));
                }
                if (!argv.onoff) return [3 /*break*/, 6];
                if (!deviceData.deviceInfo.device_on) return [3 /*break*/, 4];
                return [4 /*yield*/, tapo.turnOff(deviceData.deviceKey)];
            case 3:
                _c.sent();
                console.log(chalk_1.default.red('Device is off'));
                return [3 /*break*/, 6];
            case 4:
                if (!!deviceData.deviceInfo.device_on) return [3 /*break*/, 6];
                return [4 /*yield*/, tapo.turnOn(deviceData.deviceKey)];
            case 5:
                _c.sent();
                console.log(chalk_1.default.green('Device is on'));
                _c.label = 6;
            case 6:
                if (!argv.brightness) return [3 /*break*/, 8];
                return [4 /*yield*/, tapo.setBrightness(deviceData.deviceKey, argv.brightness)];
            case 7:
                _c.sent();
                console.log(chalk_1.default.green("Brightness set to ".concat(argv.brightness)));
                _c.label = 8;
            case 8:
                if (!argv.color) return [3 /*break*/, 18];
                if (!["red", "blue", "green", "yellow", "white", "warmwhite", "daylightwhite"].includes(argv.color)) return [3 /*break*/, 10];
                return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, argv.color)];
            case 9:
                _c.sent();
                console.log(chalk_1.default.green("Color is set to ") + chalk_1.default.yellow(argv.color));
                return [3 /*break*/, 18];
            case 10:
                _c.trys.push([10, 17, , 18]);
                if (!/^[0-9A-F]{6}/ig.test(argv.color)) return [3 /*break*/, 12];
                return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#".concat(argv.color))];
            case 11:
                _c.sent();
                return [3 /*break*/, 16];
            case 12:
                if (!/^[0-256]-[0-256]-[0-256]$/ig.test(argv.color)) return [3 /*break*/, 14];
                _a = argv.color.split('-').map(function (x) { return parseInt(x); }), r = _a[0], g = _a[1], b = _a[2];
                return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#".concat(color_convert_1.default.rgb.hex(r, g, b)))];
            case 13:
                _c.sent();
                return [3 /*break*/, 16];
            case 14: return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#".concat(color_convert_1.default.keyword.hex(argv.color)))];
            case 15:
                _c.sent();
                _c.label = 16;
            case 16: return [3 /*break*/, 18];
            case 17:
                error_1 = _c.sent();
                console.log(chalk_1.default.red("Invalid color: ".concat(argv.color)));
                return [3 /*break*/, 18];
            case 18:
                if (!argv.profile) return [3 /*break*/, 28];
                _b = argv.profile;
                switch (_b) {
                    case 1: return [3 /*break*/, 19];
                    case 2: return [3 /*break*/, 22];
                    case 3: return [3 /*break*/, 25];
                }
                return [3 /*break*/, 28];
            case 19: return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#ffffff")];
            case 20:
                _c.sent();
                return [4 /*yield*/, tapo.setBrightness(deviceData.deviceKey, 100)];
            case 21:
                _c.sent();
                console.log(chalk_1.default.green("Profile 1 set"));
                return [3 /*break*/, 28];
            case 22: return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#ffffff")];
            case 23:
                _c.sent();
                return [4 /*yield*/, tapo.setBrightness(deviceData.deviceKey, 50)];
            case 24:
                _c.sent();
                console.log(chalk_1.default.green("Profile 2 set"));
                return [3 /*break*/, 28];
            case 25: return [4 /*yield*/, tapo.setColour(deviceData.deviceKey, "#ffffff")];
            case 26:
                _c.sent();
                return [4 /*yield*/, tapo.setBrightness(deviceData.deviceKey, 25)];
            case 27:
                _c.sent();
                console.log(chalk_1.default.green("Profile 3 set"));
                return [3 /*break*/, 28];
            case 28:
                if (argv.status) {
                    console.table({
                        onOff: deviceData.deviceInfo.device_on,
                        mac: deviceData.deviceInfo.mac,
                        name: deviceData.deviceInfo.nickname,
                        ip: deviceData.deviceInfo.ip,
                        onTime: deviceData.deviceInfo.on_time,
                    });
                    tmp = deviceData.deviceInfo;
                    console.table(tmp.default_states);
                }
                if (!argv.clearCache) return [3 /*break*/, 30];
                return [4 /*yield*/, (0, cache_1.clearCache)()];
            case 29:
                if (_c.sent()) {
                    console.log(chalk_1.default.green("Cache cleared"));
                }
                else {
                    console.log(chalk_1.default.red("Cache not cleared"));
                }
                _c.label = 30;
            case 30: return [2 /*return*/];
        }
    });
}); })();
