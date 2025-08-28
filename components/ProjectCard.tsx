import { useTheme } from "@/context/themeContext";
import { ProjectDataType, ProjectsDataType } from "@/types/projectType"
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

interface ProjectCardProps {
    project: ProjectsDataType;
    press: () => void
}


export default function ProjectCard({ project, press }: ProjectCardProps) {

    const { colors } = useTheme();

    const colorStyles = StyleSheet.create({
        viewContainer: {
            borderColor: colors.secondary.base,

        }
    })

    return (
        <>
            <Pressable onPress={press} key={project.id} style={[styles.viewContainer, colorStyles.viewContainer]}>
                <View style={styles.projectCard}>
                    <AppText style={styles.projectTitle}>{project.projectName}</AppText>
                    <View style={{flexDirection: "row", gap: 10, marginTop: 5}}>
                        <AppText>{project.projectType}</AppText>
                        <AppText>{project.yarnType}</AppText>
                    </View>
                    {/* <AppText>Yards per ball: {project.yardsPerBall}</AppText> */}
                    {/* <AppText>Min: {project.min} balls</AppText> */}
                    {/* <AppText>Max: {project.max} balls</AppText> */}
                </View>
                <View style={{justifyContent: "center"}}>
                    <Ionicons name="arrow-forward" size={24} color={colors.text.base} style={styles.icon} />
                </View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    projectCard: {

    },
    projectTitle: {

    },
    icon: {
        marginRight: 10
    },
})