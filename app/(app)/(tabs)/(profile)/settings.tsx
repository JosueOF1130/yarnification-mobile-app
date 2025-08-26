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

    const colorStyles = StyleSheet.create({
        option: {
            borderColor: colors.text.base
        }     
    })

    function goBack() {
        router.back();
    }




    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ThemedView>
                <View style={{ marginBottom: 15 }} >
                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.base} />
                        <AppText style={{ marginLeft: 5 }} variant="body">Profile</AppText>
                    </Pressable>
                </View>

                <AppText variant="display">Settings</AppText>


                <ScrollView style={{ paddingTop: 20 }}>


                    <Pressable style={[styles.option, colorStyles.option, { justifyContent: "space-between"}]}>
                        <View style={styles.content}>
                            <Ionicons name="person" size={24} color={colors.text.base} style={styles.icon} />
                            <AppText style={styles.text}>Edit profile</AppText>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color={colors.text.base} style={styles.icon} />

                    </Pressable>

                    <Pressable onPress={toggleTheme} style={[styles.option, colorStyles.option]}>
                        <Ionicons name="contrast" size={24} color={colors.text.base} style={styles.icon} />
                        <AppText style={styles.text}>
                            {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                        </AppText>
                    </Pressable>


                    <Pressable style={[styles.option, colorStyles.option]} onPress={logOutUser}>
                        <Ionicons name="exit" size={24} color={colors.text.base} style={styles.icon} />
                        <AppText style={styles.text}>Sign out</AppText>
                    </Pressable>



                </ScrollView>
            </ThemedView>
        </>
    );
}



const styles = StyleSheet.create({
    option: {
        flexDirection: "row",
        width: "100%",
        borderWidth: 2,
        borderRadius: 7,
        padding: 15,
        marginBottom: 10
    },
    icon: {
        marginRight: 10
    },
    text: {
        alignSelf: "center"
    },
    content: {
        flexDirection: "row",

    },

});
