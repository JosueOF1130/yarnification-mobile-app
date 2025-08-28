import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useTheme } from "@/context/themeContext";
import { getCurrentUser } from "@/firebase/firebaseAuth";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, View } from "react-native";


export default function EditProfilePage() {


    console.log(getCurrentUser());

    const { colors } = useTheme();

    function goBack() {
        router.back();
    }

    return (
        <>
            <Stack.Screen options={ { headerShown: false } } />
            <ThemedView>
                <View style={{ marginBottom: 15 }} >
                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.base} />
                        <AppText style={{ marginLeft: 5 }} variant="body">Settings</AppText>
                    </Pressable>
                </View>

                <AppText variant="display">Edit Profile</AppText>
            </ThemedView>
        </>
    );
}