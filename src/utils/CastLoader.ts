import { loadScriptAsync } from './utils';

const SENDER_SDK_URL: string =
  '//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

class CastLoader {
  static load(): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      window['__onGCastApiAvailable'] = (isAvailable: boolean) =>
        CastLoader.onGCastApiAvailable(isAvailable, resolve);
      CastLoader.loadCastSDK()
        .then(() => {
          console.warn('Cast sender lib has been loaded successfully');
        })
        .catch(e => {
          console.warn('Cast sender lib loading failed', e);
          reject(e);
        });
    });
  }

  static loadCastSDK(): Promise<any> {
    if (window['cast'] && window['cast']['framework']) {
      return Promise.resolve();
    }
    return loadScriptAsync(SENDER_SDK_URL);
  }

  static onGCastApiAvailable(isAvailable: boolean, resolve: Function): void {
    if (isAvailable) {
      resolve();
    } else {
      console.warn(`Google cast API isn't available yet`);
    }
  }
}

export { CastLoader };
