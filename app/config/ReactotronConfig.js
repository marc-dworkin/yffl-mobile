import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
// https://github.com/infinitered/reactotron/issues/417
import { NativeModules } from 'react-native';
import sagaPlugin from 'reactotron-redux-saga'; // eslint-disable-line import/no-extraneous-dependencies
import { reactotronRedux } from 'reactotron-redux'; // eslint-disable-line import/no-extraneous-dependencies

import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const reactotron = Reactotron
  .configure({ name: 'aizr', host: hostname }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  // todo: immers or seamless immutable
  // .use(reactotronRedux({onRestore: Immutable}))
  // https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect(); // let's connect!


// todo: log https://medium.com/@tranquan/level-up-your-log-in-react-native-with-reactotron-4a0b5638dc11

Reactotron.clear();

Reactotron.log('Reactotron Configured');

export default reactotron;

// Totally hacky, but this allows you to not both importing reactotron-react-native
// on every file.  This is just DEV mode, so no big deal.
// TODO: common log function
// eslint-disable-next-line no-console
console.tron = Reactotron;

/*
  Reactotron
  .configure({
    name: "React Native Demo"
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: { // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: false, // there are more options to editor
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();
  */
