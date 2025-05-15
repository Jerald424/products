import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { COLORS } from '../utils/colors';

export default function LoaderCmp(props: ActivityIndicatorProps) {
  return <ActivityIndicator color={COLORS?.PRIMARY} {...props} />;
}

export const ModalLoader = () => {
  return <LoaderCmp size={'large'} style={[modalLoaderStyle.loading]} />;
};

let modalLoaderStyle = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 9999,
    right: 0,
    left: 0,
  },
});

interface LoaderWithChildrenProps extends ViewProps {
  isLoading?: boolean;
}

export const LoaderWithChildren = ({...props}: LoaderWithChildrenProps) => {

  return (
    <View {...props}>
      {props?.isLoading && (
        <LoaderCmp
          size={'large'}
          style={[loaderWithChildrenStyle.loaderStyle]}
        />
      )}
      {props?.isLoading && (
        <View
          style={{
            backgroundColor: COLORS.BACKGROUND,
            opacity: 0.5,
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 9,
          }}
        />
      )}
      {props?.children}
    </View>
  );
};

const loaderWithChildrenStyle = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
