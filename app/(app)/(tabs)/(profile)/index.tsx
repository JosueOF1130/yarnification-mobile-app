import ThemedView from "@/components/ThemedView";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import AppText from "@/components/AppText";
import { useEffect, useState } from "react";
import { getUserProjects } from "@/firebase/firebaseDatabase";
import { isAuthError } from "@/utils/typeGuards";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function ProfileScreen() {

    const router = useRouter();

    const { logOutUser } = useAuth();

    const { colors, toggleTheme, theme } = useTheme();

    const { user } = useAuth();

    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchProjects = async () => {
            setLoading(true);
            const result = await getUserProjects(user.uid);
            if (isAuthError(result)) {
                alert("Failed to fetch projects:" + result.errorMessage);
                setProjects([]);
            } else {
                setProjects(result);
            }
            setLoading(false);
        };

        fetchProjects();
    }, [user]);

    function openProjectDetails(id: string) {
        router.push(`./(profile)/${id}`);
    }


    const styles = StyleSheet.create({
        heading: {
            justifyContent: "space-between",
            flexDirection: "row"
        },
        button: {
            backgroundColor: colors.primary.base,
            padding: 15,
            borderRadius: 8,
            marginVertical: 25,
        },
        buttonText: {
            color: colors.background.base,
            fontWeight: 'bold',
            fontSize: 16,
        },
        projectCard: {
            borderColor: colors.secondary.base,
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            marginVertical: 10,
        },
        projectTitle: {
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 5,
        },
        iconButton: {
            width: 20,

            // backgroundColor: "red"
        },
    })

    return (
        <View style={{ flex: 1 }}>
            <ThemedView>
                <View style={styles.heading}>
                    <AppText variant="display" style={{}}>Profile</AppText>

                    <Pressable style={styles.iconButton}>
                        <Ionicons name="settings" size={24} color={colors.text.base} />
                    </Pressable>
                </View>

                <Pressable style={styles.button} onPress={logOutUser}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={toggleTheme}>
                    <Text style={styles.buttonText}>
                        {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    </Text>
                </Pressable>

                <AppText variant="title" style={{ marginTop: 20, marginBottom: 10 }}>My Projects</AppText>
                {loading && <AppText>Loading projects...</AppText>}
                {!loading && projects.length === 0 && <AppText>No projects found.</AppText>}
                <ScrollView style={{ borderColor: "transparent", borderTopColor: colors.primary.base, borderWidth: 2, }}>
                    {projects.map(project => (
                        <Pressable onPress={() => { openProjectDetails(project.id)}}>
                            <View key={project.id} style={styles.projectCard}>
                                <AppText style={styles.projectTitle}>{project.projectName}</AppText>
                                <AppText>Project type: {project.projectType}</AppText>
                                <AppText>Yarn type: {project.yarnType}</AppText>
                                <AppText>Yards per ball: {project.yardsPerBall}</AppText>
                                <AppText>Min: {project.min} balls</AppText>
                                <AppText>Max: {project.max} balls</AppText>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </ThemedView>
        </View>
    );
}
