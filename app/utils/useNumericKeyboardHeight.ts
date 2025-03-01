import { useDimensions } from '@react-native-community/hooks';
import { Platform } from 'react-native';

// 216 / 291 / 301
// 667 / 812 / 896

export function useNumericKeyboardHeight() {
    if (Platform.OS === 'ios') {
        if (Platform.isPad) {
            return 0;
        }
        if (Platform.isTV) {
            return 0;
        }
        if (Platform.isTVOS) {
            return 0;
        }

        let dimensions = useDimensions();
        if (dimensions.screen.height <= 667) {
            return 216 + 45;
        }
        if (dimensions.screen.height <= 812) {
            return 291 + 45;
        }
        return 301 + 45;
    }

    return 0;

    // const safeArea = useSafeAreaInsets();
    // const keyboard = useKeyboard();
    // return keyboard.keyboardShown ? keyboard.keyboardHeight : safeArea.bottom;
    // if (keyboard.keyboardShown) {
    //     return keyboard.keyboardHeight + safeArea.bottom + safeArea.top;
    // } else {
    //     return safeArea.bottom;
    // }
}