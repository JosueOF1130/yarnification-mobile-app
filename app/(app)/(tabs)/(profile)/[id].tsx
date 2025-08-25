import AppInput from "@/components/AppInput";
import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { getProject } from "@/firebase/firebaseDatabase";
import { ProjectDataType } from "@/types/projectType";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";

const { colors } = useTheme();

import { router } from "expo-router";


export default function DetailsScreen() {


    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [project, setProject] = useState<ProjectDataType>()




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
                    public: data.public
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


    function goBack() {
        router.back();
    }

    async function saveChanges() {

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
                <AppText variant="display">Details</AppText>


                <ScrollView contentContainerStyle={styles.container}>
                    {/* Editable Inputs */}
                    <View style={styles.row}>
                        <AppText style={styles.label}>Project Name:</AppText>
                        <AppInput

                            style={[styles.input, { color: colors.text.base, borderColor: colors.text.base }]}
                            value={project.projectName}
                            placeholder="Name your project"
                            onChangeText={text => setProject({ ...project, projectName: text })}
                        />
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Yarn Brand:</AppText>
                        <AppInput
                            style={[styles.input, { color: colors.text.base, borderColor: colors.text.base }]}
                            value={project.yarnBrand}
                            placeholder="Enter yarn brand"
                            placeholderTextColor={colors.text.base}
                            onChangeText={text => setProject({ ...project, yarnBrand: text })}
                        />
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Yarn Material:</AppText>
                        <AppInput
                            style={[styles.input, { color: colors.text.base, borderColor: colors.text.base }]}
                            value={project.yarnMaterial}
                            placeholder="Enter yarn material"
                            placeholderTextColor={colors.text.base}
                            onChangeText={text => setProject({ ...project, yarnMaterial: text })}
                        />
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Time Spent (hrs):</AppText>
                        <AppInput
                            style={[styles.input, { color: colors.text.base, borderColor: colors.text.base }]}
                            value={project.timeSpent.toString()}
                            keyboardType="numeric"
                            onChangeText={text => setProject({ ...project, timeSpent: Number(text) })}
                        />
                    </View>

                    {/* Non-editable fields */}
                    <View style={styles.row}>
                        <AppText style={styles.label}>Project Type:</AppText>
                        <AppText>{project.projectType ?? "N/A"}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Yarn Type:</AppText>
                        <AppText>{project.yarnType ?? "N/A"}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Yards per Ball:</AppText>
                        <AppText>{project.yardsPerBall}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Min Balls:</AppText>
                        <AppText>{project.min}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Max Balls:</AppText>
                        <AppText>{project.max}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText style={styles.label}>Hook Size:</AppText>
                        <AppText>{project.hookSize}</AppText>
                    </View>

                    {/* Public Switch */}
                    <View style={styles.row}>
                        <AppText style={styles.label}>Public:</AppText>
                        <Switch
                            value={project.public}
                            onValueChange={value => setProject({ ...project, public: value })}
                            trackColor={{ false: "#767577", true: colors.primary.base }}
                            thumbColor={project.public ? colors.text.base : "#f4f3f4"}
                        />
                    </View>

                    {/* Save Button */}
                    <Pressable onPress={saveChanges} style={styles.button}>
                        <AppText style={styles.buttonTxt}>Save</AppText>
                    </Pressable>
                    <Pressable onPress={goBack} style={styles.button}>
                        <AppText style={styles.buttonTxt}>Cancel</AppText>
                    </Pressable>

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
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: colors.primary.base,
    },
    buttonTxt: {
        color: colors.background.base,
        fontWeight: "bold"
    }

});
