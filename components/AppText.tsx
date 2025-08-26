import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { useTheme } from "@/context/themeContext";

type TextVariant = 'subtext' | 'small' | 'body' | 'title' | 'heading' | 'display';

interface AppTextProps extends TextProps {
    variant?: TextVariant,
    style?: StyleProp<TextStyle>
}


export default function AppText({ variant = 'body', style, ...props }: AppTextProps) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        subtext: {
            fontSize: 12,
            fontWeight: "300",
        },
        small: {
            fontSize: 14,
            fontWeight: "400",
        },
        body: {
            fontSize: 16,
            fontWeight: "400",
        },
        title: {
            fontSize: 20,
            fontWeight: "600",
        },
        heading: {
            fontSize: 24,
            fontWeight: "700",
        },
        display: {
            fontSize: 32,
            fontWeight: "800",
        },
        default: {
            color: colors.text.base,
        }
    })

    return (
        <Text style={[styles.default, styles[variant],style]} {...props} />
    );
}



