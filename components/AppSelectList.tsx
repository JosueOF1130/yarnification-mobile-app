import { StyleSheet } from "react-native";

import { SelectList, SelectListProps } from "react-native-dropdown-select-list";

import { useTheme } from "@/context/themeContext";
import { FontAwesome } from "@expo/vector-icons";


interface AppSelectListProps extends Partial<SelectListProps> {
    data: { key: number; value: string }[];
    setSelected: (val: string) => void;
};

export default function AppSelectList({ data, setSelected, ...rest }: AppSelectListProps) {


    const { colors } = useTheme();
    const styles = StyleSheet.create({
        select: {
            color: colors.text.base,
        },
        dropdownText: {
            color: colors.text.base,
        },
        dropdownStyle: {
            marginBottom: 20,
            borderColor: colors.text.base,
            color: colors.text.base
        },
        box: {
            borderColor: colors.text.base,
            marginVertical: 20
        },
    })


    return (
        <SelectList data={data} setSelected={(val: string) => setSelected(val)} save="key"
            inputStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            dropdownStyles={styles.dropdownStyle}
            search={false} boxStyles={styles.box}
            defaultOption={data[0]}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.text.base} />}
            maxHeight={100}
        >
        </SelectList>
    );
}

