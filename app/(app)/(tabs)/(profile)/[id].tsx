import AppText from "@/components/AppText";
import { View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import ThemedView from "@/components/ThemedView";


export default function DetailsScreen() {

    //use effect to get project name based on id


    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <>
        <Stack.Screen options={{ title: "Project" }} />
            <ThemedView>
                <AppText variant="display">Details</AppText>
                {id}
            </ThemedView>
        </>
    );
}