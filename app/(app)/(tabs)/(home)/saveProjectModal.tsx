import AppText from "@/components/AppText";
import ToastMessage from "@/components/ToastMessage";
import { useTheme } from "@/context/themeContext";
import projectTypeData from "@/data/projectTypeData";
import yarnTypeData from "@/data/yarnTypeData";
import { saveProject } from "@/firebase/firebaseDatabase";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


interface ModalProps {
    visible: boolean;
    hideModal: () => void;
    minMax: { min: number, max: number };
    yarnTypeIndex: number;
    projectIndex: number;
    yardsPerBall: number;
    user: User | null;
    projectMin: number,
    projectMax: number
    displayToast: (message: string) => void;
}

import type { ProjectDataType } from "@/types/projectType";


export default function SaveProjectModal({ visible, hideModal, minMax, yarnTypeIndex, projectIndex, yardsPerBall, user, displayToast, projectMin, projectMax }: ModalProps) {

    const { colors } = useTheme();



    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            backgroundColor: colors.background.base,
            borderRadius: 10,
            padding: 25,
            width: 340,
            height: 500,
            justifyContent: "space-around"

        },
        button: {
            marginTop: 20,
            padding: 10,
            borderRadius: 8,
        },
        form: {

        },
        input: {
            padding: 10,
            height: 50,
            color: colors.text.base
        },
        border: {
            borderWidth: 1,
            borderColor: colors.text.base,
            borderRadius: 5,
        }

    });


    const [errorToastVisible, setErrorToastVisible] = useState<boolean>(false);

    const [yarnBrand, setYarnBrand] = useState<string>("");
    const [yarnMaterial, setYarnMaterial] = useState<string>("");
    const [yarnUsed, setYarnUsed] = useState<number>(0);
    const [hookSize, setHookSize] = useState<number>(0)
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [projectName, setProjectName] = useState<string>("");

    const yarnType = yarnTypeData.find(item => item.key === yarnTypeIndex);
    const yarnTypeValue = yarnType ? yarnType.value : null;


    const projectType = projectTypeData.find(item => item.key === projectIndex);
    const projectTypeValue = projectType ? projectType.value : null;


    function resetModal() {
        setYarnBrand("");
        setYarnMaterial("");
        setYarnUsed(0);
        setHookSize(0);
        setTimeSpent(0);
        setProjectName("");
        setErrorToastVisible(false);
    }

    function closeModal() {
        resetModal();
        hideModal();
    }

    async function onSave() {

        if (!user) return;

        const newProject: ProjectDataType = {
            projectName,

            yarnType: yarnTypeValue ?? "",
            projectType: projectTypeValue ?? "",

            projectMin,
            projectMax,

            yardsPerBall,
            min: minMax.min,
            max: minMax.max,

            yarnBrand,
            yarnMaterial,
            yarnUsed,
            hookSize,
            timeSpent,

            createdAt: Date.now(),

            personalNotes: "",
            publicCaption: "",

            public: false
        }


        const result = await saveProject(user.uid, newProject);

        if (result.success) {
            closeModal();
            displayToast("Project Saved");
        } else {
            console.log(result.errorMessage);
            setErrorToastVisible(true);
            //TODO: remove console log
        }

    }

    useEffect(() => {
        if (!visible) {
            resetModal();
        }
    }, [visible]);





    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <View>
                        <AppText variant="heading">
                            Save Your Project?
                        </AppText>

                        <View style={styles.form}>
                            <AppText variant="body" style={{ marginTop: 20, marginBottom: 10 }}>Project name</AppText>
                            <TextInput
                                style={[styles.input, styles.border]}
                                placeholder="Donnie's Hat"
                                value={projectName}
                                onChangeText={setProjectName}
                                autoCapitalize="words"
                            />
                        </View>
                        <View>
                            <AppText variant="title" style={{ marginVertical: 20 }}>Project info:</AppText>
                            <AppText style={{ marginBottom: 10 }}>Project: {projectTypeValue !== null ? projectTypeValue : "N/A"}</AppText>
                            <AppText style={{ marginBottom: 10 }}>Yarn type: {yarnTypeValue !== null ? yarnTypeValue : "N/A"}</AppText>
                            <AppText style={{ marginBottom: 10 }}>Yards per ball: {yardsPerBall} yards</AppText>
                            <AppText style={{ marginBottom: 10 }}>Minimum: {minMax.min} balls of yarn</AppText>
                            <AppText style={{ marginBottom: 10 }}>Maximum: {minMax.max} balls of yarn</AppText>
                        </View>
                    </View>
                    <Pressable style={[styles.button, { backgroundColor: colors.primary.shades[500] }]} onPress={onSave}>
                        <Text style={{ color: colors.text.base, fontWeight: "bold", alignSelf: "center" }}>Save</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: colors.primary.shades[500] }]} onPress={closeModal}>
                        <Text style={{ color: colors.text.base, fontWeight: "bold", alignSelf: "center" }}>Close</Text>
                    </Pressable>
                </View>
            </View>
            {
                <ToastMessage visible={errorToastVisible} hideToast={() => setErrorToastVisible(false)} type="error" message={"Could not save your project. Please try again."} />
            }
        </Modal>
    );
}

