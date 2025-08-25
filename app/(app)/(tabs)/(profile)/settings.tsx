import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";



export default function SettingsScreen() {

    const { logOutUser } = useAuth();

const { colors, theme, toggleTheme } = useTheme();
    function goBack() {
        router.back();
    }




    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ThemedView>
                <View style={{ marginVertical: 14 }} >
                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.base} />
                        <AppText style={{ marginLeft: 5 }} variant="title">Profile</AppText>
                    </Pressable>
                </View>

                <AppText variant="display">Settings</AppText>


                <ScrollView>
                    <Pressable style={styles.option} onPress={logOutUser}>
                        <AppText variant="title">Sign out</AppText>
                    </Pressable>
                    <Pressable onPress={toggleTheme}>
                        <Ionicons name="contrast" size={24} color={colors.text.base} />
                        <AppText variant="title">
                            {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                        </AppText>
                    </Pressable>
                </ScrollView>
            </ThemedView>
        </>
    );
}



const styles = StyleSheet.create({
    option: {
        marginVertical: 20,
        flexDirection: "column",
        width: "100%"
    }

});
