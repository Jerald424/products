import LottieView, {LottieViewProps} from 'lottie-react-native';
import {Dimensions, TextProps, View, ViewProps} from 'react-native';
import React from 'react';
import { SubHeading } from './typography';

interface NoDataProps extends ViewProps {
  imgProps?: LottieViewProps;
  textProps?: TextProps;
  msg?: string;
}

export default function NoData({
  imgProps,
  textProps,
  msg = 'NoData',
  ...props
}: NoDataProps) {
  return (
    <View
      {...props}
      style={[
        props?.style,
        {
          alignItems: 'center',
          justifyContent: 'center',
          flex:1
        },
      ]}>
      <LottieView
        source={require('../assets/no_data.json')}
        autoPlay
        loop
        style={{height: 200, width: '100%'}}
        {...imgProps}
      />
      <SubHeading style={[{textAlign:"center"}]} {...textProps}>
        {msg}
      </SubHeading>
    </View>
  );
}
