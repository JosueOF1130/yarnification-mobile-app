import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { getCurrentUser } from "@/firebase/firebaseAuth";
import { Stack } from "expo-router";
import { View } from "react-native";


export default function EditProfilePage() {


    console.log(getCurrentUser);

    return (
        <>
            <Stack.Screen options={ { headerShown: false } } />
            <ThemedView>
                <View>
                    <AppText>
                        Edit Profile
                    </AppText>
                </View>
            </ThemedView>
        </>
    );
}