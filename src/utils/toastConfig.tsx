// App.jsx
import React from 'react';
import {View} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import { Para, SubHeading } from '../components/typography';
import { COLORS } from './colors';

export const getToastConfig = () => {

  return {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: COLORS?.SUCCESS}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: COLORS?.DANGER}}
        text1Style={{
          fontSize: 15,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({text1, text2}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <SubHeading>{text1}</SubHeading>
        <Para>{text2}</Para>
      </View>
    ),
  };
};
