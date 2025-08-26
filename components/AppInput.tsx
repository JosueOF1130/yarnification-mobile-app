import { useTheme } from "@/context/themeContext";
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

type InputVariant = 'default' | 'number-pad' | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';

interface AppInputProps extends TextInputProps {
    variant?: InputVariant;
    style?: StyleProp<TextStyle>;
};

export default function AppInput({ variant = "default", style, ...props }: AppInputProps) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        default: {
            fontSize: 16,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.text.base,
            color: colors.text.base,
        }
    });
    return (
        <TextInput
            style={[styles.default, style]}
            keyboardType={variant}
            {...props}
        />
    );
}
