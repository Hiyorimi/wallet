import * as React from 'react';
import { KeyboardTypeOptions, Platform, ReturnKeyTypeOptions, StyleProp, View, ViewStyle, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export interface ATextInputProps {
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off';
    value?: string;
    onValueChange?: (value: string) => void;
    autoFocus?: boolean;
    multiline?: boolean;
    enabled?: boolean;
    textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';

    prefix?: string;
    textAlign?: 'left' | 'center' | 'right' | undefined,
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
    fontSize?: number | undefined;
    lineHeight?: number | undefined;
    preventDefaultHeight?: boolean,
    preventDefaultValuePadding?: boolean
    actionButtonRight?: any
}

export const ATextInput = React.memo((props: ATextInputProps) => {
    return (
        <View style={[{
            backgroundColor: '#F2F2F2',
            borderRadius: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
        }, props.style]}>
            {props.prefix && (
                <Text
                    numberOfLines={1}
                    style={{
                        marginTop: 3,
                        fontSize: 17,
                        fontWeight: '400',
                        alignSelf: 'center',
                        color: '#9D9FA3',
                    }}
                >
                    {props.prefix}
                </Text>
            )}
            <TextInput
                style={{
                    height: props.preventDefaultHeight
                        ? undefined
                        : props.multiline ? 44 * 3 : 48,
                    paddingTop: props.multiline ? 12 : 10,
                    paddingBottom: props.preventDefaultValuePadding
                        ? undefined
                        : props.multiline ? 14 : (Platform.OS === 'ios' ? 12 : 10),
                    flexGrow: 1,
                    fontSize: props.fontSize ? props.fontSize : 17,
                    lineHeight: props.lineHeight ? props.lineHeight : 22,
                    fontWeight: props.fontWeight ? props.fontWeight : '400',
                    textAlignVertical: props.multiline ? 'top' : 'center'
                }}
                textAlign={props.textAlign}
                autoFocus={props.autoFocus}
                placeholder={props.placeholder}
                placeholderTextColor="#9D9FA3"
                autoCapitalize={props.autoCapitalize}
                autoCorrect={props.autoCorrect}
                keyboardType={props.keyboardType}
                returnKeyType={props.returnKeyType}
                autoCompleteType={props.autoCompleteType}
                multiline={props.multiline}
                enabled={props.enabled}
                value={props.value}
                textContentType={props.textContentType}
                onChangeText={props.onValueChange}
            />
            {props.actionButtonRight && (
                props.actionButtonRight
            )}
        </View>
    )
});