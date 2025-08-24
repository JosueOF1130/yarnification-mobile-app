import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { getUsername } from "@/firebase/firebaseAuth";
import { isAuthError } from "@/utils/typeGuards";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/context/themeContext";


export default function ExplorePage() {
    const { colors } = useTheme();

    const { user } = useAuth();

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        async function fetchUsername() {
            if (!user) return;

            const username = await getUsername(user.uid);

            if (isAuthError(username)) {
                alert(username.errorMessage);
            } else {
                setUsername(username === null ? "" : username);
            }
        }
        fetchUsername();
    }, [user]);

    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.background.base,
        },
        body: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"

        }
    })

    return (
        <SafeAreaProvider>
            <ThemedView>
                <View style={styles.header}>
                    <AppText variant="display">Explore</AppText>

                    <AppText>{username}</AppText>
                </View>
                <View style={styles.body}>
                    <AppText variant="display">Coming soon...</AppText>
                </View>
            </ThemedView>
        </SafeAreaProvider>
    );



}

