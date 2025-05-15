import Toast, {ToastProps, ToastShowParams} from 'react-native-toast-message';

interface showToastProps extends ToastShowParams {}
export default function showToast({...props}: showToastProps) {
  Toast.show({
    ...props,
  });
}
