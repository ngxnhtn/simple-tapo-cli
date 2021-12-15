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
exports.clearCache = exports.getCache = void 0;
var tapo = __importStar(require("tp-link-tapo-connect"));
var dotenv = __importStar(require("dotenv"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
dotenv.config({
    path: "".concat(__dirname, "/../.env")
});
function getCache() {
    return __awaiter(this, void 0, void 0, function () {
        var tmp, cache, deviceInfo, error_1, token, devices, deviceKey;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 7]);
                    console.log(chalk_1.default.yellow('Getting device key cache...'));
                    tmp = JSON.parse(fs_1.default.readFileSync("".concat(__dirname, "/../cache.json"), 'utf8'));
                    cache = {
                        key: Buffer.from(tmp.key.data),
                        iv: Buffer.from(tmp.iv.data),
                        deviceIp: tmp.deviceIp,
                        sessionCookie: tmp.sessionCookie,
                        token: tmp.token,
                    };
                    return [4 /*yield*/, tapo.getDeviceInfo(cache)];
                case 1:
                    deviceInfo = _b.sent();
                    return [2 /*return*/, {
                            deviceKey: cache,
                            deviceInfo: deviceInfo
                        }];
                case 2:
                    error_1 = _b.sent();
                    console.log(chalk_1.default.yellow('Generating new device key...'));
                    return [4 /*yield*/, tapo.cloudLogin(process.env.MAIL, process.env.PASS)];
                case 3:
                    token = _b.sent();
                    return [4 /*yield*/, tapo.listDevices(token)];
                case 4:
                    devices = _b.sent();
                    return [4 /*yield*/, tapo.loginDevice(process.env.MAIL, process.env.PASS, devices[0])];
                case 5:
                    deviceKey = _b.sent();
                    fs_1.default.writeFileSync("".concat(__dirname, "/../cache.json"), JSON.stringify(deviceKey));
                    _a = {
                        deviceKey: deviceKey
                    };
                    return [4 /*yield*/, tapo.getDeviceInfo(deviceKey)];
                case 6: return [2 /*return*/, (_a.deviceInfo = _b.sent(),
                        _a)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getCache = getCache;
function clearCache() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                fs_1.default.writeFileSync("".concat(__dirname, "/../cache.json"), '');
                return [2 /*return*/, true];
            }
            catch (error) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/];
        });
    });
}
exports.clearCache = clearCache;
