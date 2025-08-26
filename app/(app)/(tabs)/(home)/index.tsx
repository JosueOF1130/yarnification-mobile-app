import { useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


import { useTheme } from "@/context/themeContext";

import AppSelectList from "@/components/AppSelectList";
import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";

import yarnRequirements from "@/assets/yarnRequirements";

import projectTypeData from "@/data/projectTypeData";
import yarnTypeData from "@/data/yarnTypeData";

import SaveProjectModal from "@/app/(app)/(tabs)/(home)/saveProjectModal";
import projectIcons from "@/assets/projectIcons";
import yarnIcons from "@/assets/yarnIcons";
import ToastMessage from "@/components/ToastMessage";
import { useAuth } from "@/context/authContext";
import AppButton from "@/components/AppButton";



export default function HomePage() {

    const { colors, theme } = useTheme();
    const { user } = useAuth();





    const [selectedYarn, setSelectedYarn] = useState<number>(0);

    const [selectedProject, setSelectedProject] = useState<number>(0);

    const [yardsPerBall, setYardsPerBall] = useState<number>(0);

    const [yarnTypeIcon, setYarnTypeIcon] = useState(yarnIcons[1]);
    const [projectIcon, setProjectIcon] = useState(projectIcons[0]);

    const [minMax, setMinMax] = useState({ min: 0, max: 0 });

    const [calculated, setCalculated] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
    const [toastSuccessMessage, setToastSuccessMessage] = useState<string>("");

    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);


    function calculateYarnAmount() {


        if(yardsPerBall === 0) {
            //show calculated error toast
            // setToastMessage("Enter the number of yards per ball.");
            setShowSuccessToast(true);
            return;
        }

        // out of range error

        let requirements = yarnRequirements[selectedYarn][selectedProject];

        if (!requirements) return;

        const minimum = Math.ceil(requirements.min / yardsPerBall);
        const maximum = Math.ceil(requirements.max / yardsPerBall);

        setMinMax({ min: minimum, max: maximum });
        setCalculated(true);

    }

    function yardsPerBallOnTextChange(text: string) {
        if (calculated) setCalculated(false);
        let numericValue = parseFloat(text);

        if (isNaN(numericValue)) {
            setYardsPerBall(0);
        } else {
            setYardsPerBall(numericValue);
        }


    }

    function changeYarnTypeIcon(text: string) {
        if (calculated) setCalculated(false);
        let numericValue = parseFloat(text);

        let safeValue = isNaN(numericValue) ? 0 : numericValue;

        setSelectedYarn(safeValue);
        setYarnTypeIcon(safeValue);

    }

    function changeProjectIcon(text: string) {
        if (calculated) setCalculated(false);
        let numericValue = parseFloat(text);

        let safeValue = isNaN(numericValue) ? 0 : numericValue;

        setSelectedProject(safeValue);
        setProjectIcon(safeValue);
    }

    function saveProject() {

        setShowModal(true);
    }

    const Response = () => {
        return (
            <View style={styles.responseContainer}>
                <View style={styles.responseBody}>
                        <AppText variant="body" bold>Balls of yarn needed:</AppText>
                        <AppText style={styles.minMaxLabel} bold>{minMax.min}{" - "}{minMax.max}</AppText>
                </View>
                <AppButton onPress={saveProject} buttonStyle={styles.button}>Save project?</AppButton>
            </View>
        );
    }

    useEffect(() => {
        if (!showModal) {
            setSelectedYarn(0);
            setSelectedProject(0);
            yardsPerBallOnTextChange("0");
            setMinMax({ min: 0, max: 0 });
            setCalculated(false);
        }
    }, [showModal]);


    function displaySuccessToast(message: string) {
        setShowSuccessToast(true);
        // setToastMessage(message);
    }


    const cs = StyleSheet.create({
        scrollView: {
            backgroundColor: colors.background.base
        }
    })

    return (
        <>


            <ScrollView style={cs.scrollView}>
                <ThemedView>
                    <AppText variant="display">Home</AppText>

                    <View style={styles.container}>
                        <AppText style={{ marginTop: 20 }}>Select yarn type:</AppText>
                        <AppSelectList data={yarnTypeData} setSelected={changeYarnTypeIcon} />
                        <AppText style={{ marginTop: 20 }}>Select your project:</AppText>
                        <AppSelectList data={projectTypeData} setSelected={changeProjectIcon} />
                        <AppText>Minimum: {yarnRequirements[selectedYarn][selectedProject].min} yards</AppText>
                        <AppText>Maximum: {yarnRequirements[selectedYarn][selectedProject].max} yards</AppText>
                        <AppText style={{ marginTop: 20 }}>Yards per ball:</AppText>
                        <TextInput
                            style={[styles.input, styles.border]}
                            onChangeText={yardsPerBallOnTextChange}
                            placeholder="Enter a number"
                            placeholderTextColor={colors.text.base}
                            keyboardType="numeric"
                            returnKeyType="done"
                            keyboardAppearance={theme}
                        />
                        <AppButton onPress={calculateYarnAmount} buttonStyle={styles.button}>Calculate</AppButton>
                        {
                            calculated &&
                            Response()
                        }
                        {
                            <SaveProjectModal
                                visible={showModal}
                                hideModal={() => setShowModal(false)}
                                minMax={minMax}
                                yarnTypeIndex={selectedYarn}
                                projectIndex={selectedProject}
                                yardsPerBall={yardsPerBall}
                                user={user}
                                displayToast={displaySuccessToast}
                            />
                        }
                    </View>
                </ThemedView>
            </ScrollView>


            {
                <ToastMessage visible={showSuccessToast} hideToast={() => setShowSuccessToast(false)} type="success" message={toastSuccessMessage} />
            }
            {/* on calculate toast error */}
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        height: "120%"
    },
    greetings: {
        marginVertical: 20
    },
    container: {
        width: "100%",
        textAlign: "left"
    },
    input: {
        padding: 10,
        height: 50,
        marginVertical: 15
    },
    border: {
        borderWidth: 1,
        borderRadius: 5,
    },
    marginVM: {
        marginVertical: 20
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100
    },
    responseContainer: {
    },
    responseBody: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 15,
        marginVertical: 20,
        alignItems: "center"
    },
    col: {

    },
    minMaxLabel: {
        textAlign: "center"
    }
})