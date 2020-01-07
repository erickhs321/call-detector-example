/**
 * @providesModule HomeComponent
 *
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  PermissionsAndroid,
} from 'react-native';

var callDetector = undefined;

import CallDetectorManager from 'react-native-call-detection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.requestPermission();
    this.startListenerTapped();
  }

  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: 'Need App Permission',
          message: 'App needs access to your phone state',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const logGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Need App Permission',
          message: 'App needs access to your call log',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        logGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
        return true;
      } else {
        console.log('Permissions denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  startListenerTapped() {
    new CallDetectorManager((event, number) => {
      console.log({event, number});
    }, false);
  }

  render() {
    return <></>;
  }
}
