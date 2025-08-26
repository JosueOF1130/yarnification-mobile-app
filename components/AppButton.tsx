import { Pressable } from "react-native";
import AppText from "./AppText";


interface AppButtonProps {
    onPress: () => void;
}

export default function AppButton({ onPress }: AppButtonProps) {
    return (
        <>
            <Pressable onPress={onPress}>
                <AppText />
            </Pressable>
        </>
    );
}