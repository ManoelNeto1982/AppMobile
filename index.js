


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
/**
 * @format
 */
 import 'react-native-gesture-handler';
 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import { registerRootComponent } from 'expo';

 AppRegistry.registerComponent(appName, () => App);
