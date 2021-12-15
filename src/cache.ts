import * as tapo from 'tp-link-tapo-connect';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import {
    DeviceKeyCache,
    CacheResult
} from './types';

dotenv.config({
    path: `${__dirname}/../.env`
});

export async function getCache(): Promise < CacheResult > {
    try {
        console.log(chalk.yellow('Getting device key cache...'));

        const tmp: DeviceKeyCache = JSON.parse(fs.readFileSync(`${__dirname}/../cache.json`, 'utf8'));
        const cache: tapo.TapoDeviceKey = {
            key: Buffer.from(tmp.key.data),
            iv: Buffer.from(tmp.iv.data),
            deviceIp: tmp.deviceIp,
            sessionCookie: tmp.sessionCookie,
            token: tmp.token,
        };
        const deviceInfo = await tapo.getDeviceInfo(cache);
        return {
            deviceKey: cache,
            deviceInfo
        }
    } catch (error) {
        console.log(chalk.yellow('Generating new device key...'));

        const token = await tapo.cloudLogin(process.env.MAIL, process.env.PASS);
        const devices = await tapo.listDevices(token);
        const deviceKey = await tapo.loginDevice(process.env.MAIL, process.env.PASS, devices[0]);
        fs.writeFileSync(`${__dirname}/../cache.json`, JSON.stringify(deviceKey));
        return {
            deviceKey,
            deviceInfo: await tapo.getDeviceInfo(deviceKey)
        }
    }
}

export async function clearCache(): Promise<boolean> {
    try {
        fs.writeFileSync(`${__dirname}/../cache.json`, '');
        return true;
    } catch (error) {
        return false;
    }
}