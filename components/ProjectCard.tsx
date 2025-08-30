import { useTheme } from "@/context/themeContext";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { ProjectCardProps } from "@/interfaces/component";



export default function ProjectCard({ project, press }: ProjectCardProps) {

    const { colors } = useTheme();

    const colorStyles = StyleSheet.create({
        viewContainer: {
            borderColor: colors.secondary.base,

        },
        projectTag: {
            color: colors.background.base,
            backgroundColor: colors.text.shades[700]
        },
        yarnTag: {
            color: colors.background.base,
            backgroundColor: colors.text.shades[900]
        }
    })

    return (
        <>
            <Pressable onPress={press} key={project.id} style={[styles.viewContainer, colorStyles.viewContainer]}>
                <View>
                    <AppText variant="title">{project.projectName}</AppText>
                    <View style={{flexDirection: "row", gap: 10, marginTop: 5}}>
                        <AppText style={[styles.tag, colorStyles.projectTag]} variant="small" bold>{project.projectType}</AppText>
                        <AppText style={[styles.tag, colorStyles.yarnTag]} bold variant="small">{project.yarnType}</AppText>
                    </View> 
                </View>
                <View style={{justifyContent: "center"}}>
                    <Ionicons name="arrow-forward" size={25} color={colors.text.base} style={styles.icon} />
                </View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    icon: {
        marginRight: 10
    },
})