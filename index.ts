// modify these to play around with which functions throw errors
const subAsyncThrowSucceeds = false;
const subPromiseSucceeds = false;

import './style.css'; // import stylesheet

const log = (message: string) => {
  const logDiv = document.createElement('div');
  logDiv.innerHTML = message;
  const appDiv: HTMLElement = document.getElementById('app');
  appDiv.appendChild(logDiv);
};

class App {
  run = async (): Promise<void> => {
    log('Run start');

    const subAsyncThrowResult = await this.subAsyncThrow();
    log(`subAsyncThrowResult=${subAsyncThrowResult}`);
    const subPromiseResult = await this.subPromise();
    log(`subPromiseResult=${subPromiseResult}`);

    // try {
    //   const subAsyncThrowResult = await this.subAsyncThrow();
    //   log(`subAsyncThrowResult=${subAsyncThrowResult}`);
    //   const subPromiseResult = await this.subPromise();
    //   log(`subPromiseResult=${subPromiseResult}`);
    // } catch (error) {
    //   log(`Run catch: ${error}`);
    // }

    log('Run end');
  };

  subAsyncThrow = async (): Promise<string> => {
    log('subAsyncThrow start');

    const x = 'subAsyncThrowResultString';
    if (subAsyncThrowSucceeds == false) throw Error('subAsyncThrow-Error');

    log('subAsyncThrow end');
    return x;
  };

  subPromise = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      log('subPromise start');

      const x = 'subPromiseResultString';
      // if (success == false) throw Error('subAsyncThrow-Error');
      if (subPromiseSucceeds == false) reject('subPromise-Reject');

      log('subPromise end');
      resolve(x + ' aaa');

      log('subPromise second end');
      resolve(x + ' second');

      reject(x + ' second fail');

      return 'bbb';
    });
  };
}

log('Index: start of lines');

const app = new App();
app
  .run() // await cannot be used because we are not in an async method
  .then(() => log('App then'))
  .catch(error => log(`App catch: ${error}`));

log('Index: end of lines');
