import AppInput from "@/components/AppInput";
import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import projectTypeData from "@/data/projectTypeData";
import yarnTypeData from "@/data/yarnTypeData";
import { getProject } from "@/firebase/firebaseDatabase";
import { ProjectDataType } from "@/types/projectType";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export default function EditProjectScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { colors } = useTheme();

    function goBack() {
        router.back();
    }
    const { user } = useAuth();
    const [project, setProject] = useState<ProjectDataType>();



    useEffect(() => {
        console.log("Calllllled");
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


    const yarnType = yarnTypeData.find(item => item.value === project.yarnType);
    const projectType = projectTypeData.find(item => item.value === project.projectType);


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ThemedView>
                <View style={{ marginVertical: 14 }} >
                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.base} />
                        <AppText style={{ marginLeft: 5 }} variant="title">Project Details</AppText>
                    </Pressable>
                </View>

                <AppText variant="heading">Edit project</AppText>

                <View>
                    <AppInput value={project.projectName} onChangeText={(text) => setProject(prev => ({ ...prev!, projectName: text }))} ></AppInput>
                </View>
            </ThemedView>

        </>
    );
}