import AppText from "@/components/AppText";
import ProjectCard from "@/components/ProjectCard";
import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { listenToUserProjects } from "@/firebase/firebaseDatabase";
import { ProjectsDataType } from "@/types/projectType";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
export default function ProfileScreen() {

    const router = useRouter();

    const { user } = useAuth();

    const { colors } = useTheme();
    

    const [projects, setProjects] = useState<ProjectsDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (!user) return;


        const unsub = listenToUserProjects(user.uid, (projects) => {
            setProjects(projects);
            setLoading(false);
        });

        return () => unsub();

    }, [user]);

    function openProjectDetails(id: string) {
        router.push(`./(profile)/${id}`);
    }


    const styles = StyleSheet.create({
        header: {
            justifyContent: "space-between",
            alignItems: "center",
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
            width: 25,
            height: 25,
        },
    })

    return (
        <View style={{ flex: 1 }}>
            <ThemedView>
                <View style={styles.header}>
                    <AppText variant="display" style={{}}>Profile</AppText>

                    <Pressable style={styles.iconButton} onPress={() => router.push("./settings")}>
                        <Ionicons name="settings" size={25} color={colors.text.base} />
                    </Pressable>
                </View>

                

                <AppText variant="heading" style={{ marginTop: 20, marginBottom: 10 }}>My Projects</AppText>


                
                {loading && <AppText>Loading projects...</AppText>}
                {!loading && projects.length === 0 && <AppText>No projects found.</AppText>}
                <ScrollView style={{ borderColor: "transparent", borderTopColor: colors.primary.base, borderWidth: 2, }}>
                    {
                        projects.map(project => (
                            <ProjectCard project={project} press={() => openProjectDetails(project.id)} />
                        ))
                    }
                </ScrollView>
            </ThemedView>
        </View>
    );
}
