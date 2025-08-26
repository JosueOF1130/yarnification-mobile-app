import { useTheme } from "@/context/themeContext";
import { ProjectDataType } from "@/types/projectType"
import { StyleSheet, View } from "react-native";

interface ProjectCardProps {
    project: ProjectDataType
}


export default function ProjectCard({ project }: ProjectCardProps) {

    const { colors } = useTheme();

    const colorStyles = StyleSheet.create({
        viewContainer: {
            borderColor: colors.secondary.base,

        }
    })

    return (
        <>
            <View style={[colorStyles.viewContainer, styles.viewContainer]}>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    }
})