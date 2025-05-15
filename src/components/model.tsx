import React from 'react';
import { TouchableOpacityProps, View, ViewProps } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { COLORS } from '../utils/colors';
import { Heading, Para } from './typography';
import { Button } from './container';

interface ModalCmpProps extends Partial<ModalProps> {
  conProps?: ViewProps;
}

export default function ModalCmp({ children, ...props }: ModalCmpProps) {
  return (
    <Modal
      {...props}
      animationIn={'bounceIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.4}>
      <View
        {...props?.conProps}
        style={[
          {
            backgroundColor: COLORS?.BACKGROUND,
            padding: 20,
            borderRadius: 10,
          },
          props?.conProps?.style,
        ]}>
        {children}
      </View>
    </Modal>
  );
}

export interface ConfirmationModalProps extends ModalCmpProps {
  heading?: string;
  description?: string;
  noButtonProps?: TouchableOpacityProps;
  yesButtonProps?: TouchableOpacityProps;
}

export const ConfirmationModal = ({
  heading = 'Are you sure?',
  description,
  noButtonProps,
  yesButtonProps,
  ...props
}: ConfirmationModalProps) => {
  return (
    <ModalCmp {...props}>
      <Heading>{heading}</Heading>
      {description && <Para>{description}</Para>}
      <View style={[ { marginTop: 10, flexDirection:"row" }]}>
        <Button
          {...noButtonProps}
          style={[{flex:1, marginRight: 10 , backgroundColor:COLORS.DANGER}]}
          >
          NOPE
        </Button>
        <Button {...yesButtonProps} style={[{flex:1, marginLeft: 10 }]}>
          Yes, PLEASE
        </Button>
      </View>
    </ModalCmp>
  );
};
