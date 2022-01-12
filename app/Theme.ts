import { DefaultTheme, Theme as ThemeType } from "@react-navigation/native";

export const Theme = {
    textColor: '#000',
    textSecondary: '#8E8E92',
    loader: '#367CDE',
    background: '#F2F2F6',
    accent: '#47A9F1',
    accentLight: '#DD4242',
    accentDark: '#288FD8',
    divider: '#E4E4E5',
    warningText: '#DE641F',
    scoreGold: '#DAA520',

    shadows: {
        1: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
        },
        2: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
        },
        3: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        4: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        },
        5: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }
    }
};

export const NavigationTheme: ThemeType = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: Theme.accent,
        background: Theme.background,
        card: Theme.background
    }
};