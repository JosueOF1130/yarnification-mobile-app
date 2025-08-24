import { Stack } from "expo-router";


export default function ExplorePageLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen
                name="[id]"
                options={{
                    title: "Details",        // title shown at top
                    headerBackTitle: "",
                    headerNac: false,  // hides any text next to arrow

                    // headerShown: false
                }}
            /> */}
        </Stack>
    );
}