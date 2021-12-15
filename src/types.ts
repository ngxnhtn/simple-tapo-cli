import { TapoDeviceKey, TapoDeviceInfo } from "tp-link-tapo-connect"

export declare type DeviceKeyCache = {
  'key': {
      'type': string,
      'data': Array<number>
  },
  'iv': {
      'type': string,
      'data': Array<number>
  },
  'deviceIp': string,
  'sessionCookie': string,
  'token': string
}

export declare type CacheResult = {
  deviceKey: TapoDeviceKey,
  deviceInfo: TapoDeviceInfo
}