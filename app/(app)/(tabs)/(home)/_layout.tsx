import { Stack } from "expo-router";


export default function ExplorePageLayout() {
    return(
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}  />
            <Stack.Screen name="toastMessage" options={{ headerShown: false }} />
        </Stack>
    );
}