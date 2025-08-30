import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { getProject } from "@/firebase/firebaseDatabase";
import { ProjectDataType } from "@/types/projectType";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";
import ToastMessage from "@/components/ToastMessage";


export default function DetailsScreen() {
    const { colors } = useTheme();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [project, setProject] = useState<ProjectDataType>();


    const [toastVisible, setToastVisible] = useState<boolean>(false);
    const [toastErrorMessage, setToastErrorMessage] = useState<string>("");



    useEffect(() => {
        if (!user) return;
        const getData = async () => {
            const data = await getProject(user.uid, id);

            // Handle empty array (project not found)
            if (Array.isArray(data)) {
                console.log("Project not found");
                return;
            }

            // Handle error object
            if ("success" in data && data.success === false) {
                console.error("Error fetching project:", data.errorMessage);
                return;
            }

            if (!Array.isArray(data) && !("success" in data)) {
                setProject({
                    createdAt: data.createdAt,
                    projectName: data.projectName,
                    yarnType: data.yarnType,
                    projectType: data.projectType,
                    yardsPerBall: data.yardsPerBall,
                    min: data.min,
                    max: data.max,
                    yarnBrand: data.yarnBrand,
                    yarnMaterial: data.yarnMaterial,
                    yarnUsed: data.yarnUsed,
                    hookSize: data.hookSize,
                    timeSpent: data.timeSpent,
                    public: data.public,
                    projectMin: data.projectMin,
                    projectMax: data.projectMax,
                    personalNotes: data.personalNotes,
                    publicCaption: data.publicCaption
                });
            }


        }
        getData();
    }, []);

    if (!project) {
        return (
            <ThemedView>
                <AppText>Loading project...</AppText>
            </ThemedView>
        );
    }

    console.log(project.public);

    function goBack() {
        router.back();
    }

    async function saveChanges() {

    }


    function onEditPress() {
        router.push(`/edit?id=${id}`)
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

                <AppText variant="heading">Details</AppText>


                <ScrollView contentContainerStyle={[styles.container]} style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                            <AppText variant="display" >{project.projectName}</AppText>
                            {project.public !== undefined && <Ionicons name={project.public ? "lock-open-outline" : "lock-closed-outline"} color={project.public ? "green" : "red"} size={26} />}
                        </View>
                        <Pressable onPress={onEditPress}>
                            <Ionicons name="create-outline" color={colors.text.base} size={24} />
                        </Pressable>

                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 15 }}>
                        <View style={{ padding: 10, borderRadius: 8, flex: 1, borderWidth: 1, backgroundColor: colors.primary.base }}>
                            <AppText center bold style={{ color: colors.background.base }}>{project.yarnType}</AppText>
                        </View>
                        <View style={{ padding: 10, borderRadius: 8, flex: 1, borderWidth: 1, backgroundColor: colors.secondary.base }}>
                            <AppText center bold style={{ color: colors.background.base }}>{project.projectType}</AppText>
                        </View>
                    </View>

                    <AppText variant="title">Your Calculation</AppText>
                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.primary.base,
                        padding: 12,
                        marginVertical: 12,
                        borderRadius: 8,
                        gap: 6,
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <AppText variant="body">Project yards required:</AppText>
                            <AppText bold>{project.projectMin} - {project.projectMax}</AppText>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <AppText variant="body">Yards per ball:</AppText>
                            <AppText bold>{project.yardsPerBall}</AppText>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <AppText variant="body">Estimated balls needed:</AppText>
                            <AppText bold>{project.min} - {project.max}</AppText>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <AppText variant="body">Balls already used:</AppText>
                            <AppText bold>{project.yarnUsed === 0 ? "N/A" : project.yarnUsed}</AppText>
                        </View>
                    </View>
                    <AppText variant="title">Personal notes:</AppText>
                    <View style={{ borderWidth: 1, borderColor: colors.secondary.base, padding: 10, marginVertical: 15, borderRadius: 7, height: "20%", alignItems: "center", justifyContent: "center" }}>
                        <AppText>{project.personalNotes === "" ? "Edit project to add notes about this project" : project.personalNotes}</AppText>
                    </View>

                    <View style={{ gap: 10, marginVertical: 10 }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <AppText variant="title">Yards Brand:</AppText>
                            <AppText bold>{project.yarnBrand === "" ? "N/A" : project.yarnBrand}</AppText>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <AppText variant="title">Yards Material:</AppText>
                            <AppText bold>{project.yarnMaterial === "" ? "N/A" : project.yarnBrand}</AppText>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <AppText variant="title">Total hours spent:</AppText>
                            <AppText bold>{project.timeSpent === 0 ? "N/A" : project.yarnBrand}</AppText>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <AppText variant="title">Hook Size:</AppText>
                            <AppText bold>{project.hookSize === 0 ? "N/A" : project.yarnBrand}</AppText>
                        </View>
                    </View>



                    {/* Save Button */}
                    {/* <AppButton onPress={saveChanges} buttonStyle={styles.button}>Save changes</AppButton> */}

                    {/* Cancel Button */}
                    {/* <AppButton onPress={goBack} buttonStyle={styles.button}>Cancel</AppButton> */}

                    {/* Delete project button */}
                    {/* <AppIconButton onPress={() => { }} name="trash" buttonStyle={[{ backgroundColor: "transparent", borderWidth: 1, borderColor: colors.text.base }, styles.button]} textStyle={{ color: colors.text.base }} color={colors.text.base} size={15}>Delete Project</AppIconButton> */}

                    {
                        toastVisible && (
                            <ToastMessage visible={toastVisible} hideToast={() => setToastVisible(false)} type="success" message={toastErrorMessage} />

                        )
                    }


                </ScrollView>
            </ThemedView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        width: 120,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flex: 1,
    },
    button: {
        marginTop: 20,

    },
});
