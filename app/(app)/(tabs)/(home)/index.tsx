import { useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


import { useTheme } from "@/context/themeContext";

import AppSelectList from "@/components/AppSelectList";
import AppText from "@/components/AppText";
import ThemedView from "@/components/ThemedView";

import {yarnRequirementsByIndex} from "@/assets/yarnRequirements";

import projectTypeData from "@/data/projectTypeData";
import yarnTypeData from "@/data/yarnTypeData";

import SaveProjectModal from "@/app/(app)/(tabs)/(home)/saveProjectModal";
import projectIcons from "@/assets/projectIcons";
import yarnIcons from "@/assets/yarnIcons";
import ToastMessage from "@/components/ToastMessage";
import { useAuth } from "@/context/authContext";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";

import YarnBall from "@/assets/svgs/yarnball.svg"

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
    const [toastErrorMessage, setToastErrorMessage] = useState<string>("");


    function calculateYarnAmount() {


        if (yardsPerBall === 0) {
            //show calculated error toast
            setToastErrorMessage("Enter the number of yards per ball.");
            setShowErrorToast(true);
            return;
        }

        // out of range error

        let requirements = yarnRequirementsByIndex[selectedYarn][selectedProject];

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
                <View style={[styles.responseBody, cs.border]}>
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
        },
        border: {
            borderColor: colors.text.base,
            borderRadius: 8,
            borderWidth: 1,
            padding: 15
        }
    })

    return (
        <>


            <ScrollView style={[cs.scrollView, styles.scroll]}>
                <ThemedView>
                    <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                        <YarnBall width={35} height={35} fill={colors.text.shades[600]} />
                        <AppText variant="display" style={{marginLeft: 10}}>Project Calculator</AppText>
                    </View>

                    <View style={styles.container}>
                        <AppText style={{ marginTop: 20 }}>Select yarn type:</AppText>
                        <AppSelectList data={yarnTypeData} setSelected={changeYarnTypeIcon} />
                        <AppText style={{ marginTop: 20 }}>Select your project:</AppText>
                        <AppSelectList data={projectTypeData} setSelected={changeProjectIcon} />


                        <View style={[styles.yarnRequirements, cs.border]}>
                            <AppText center variant="title" style={{ marginBottom: 5 }}>Yarn requirements</AppText>
                            <AppText center bold>{yarnRequirementsByIndex[selectedYarn][selectedProject].min} - {yarnRequirementsByIndex[selectedYarn][selectedProject].max} yards</AppText>
                        </View>

                        <AppText style={{ marginTop: 20 }}>Yards per ball:</AppText>
                        {/* <TextInput
                            style={[styles.input, styles.border]}
                            onChangeText={yardsPerBallOnTextChange}
                            placeholder="Enter a number"
                            placeholderTextColor={colors.text.base}
                            keyboardType="numeric"
                            returnKeyType="done"
                            keyboardAppearance={theme}
                        /> */}
                        <AppInput style={[styles.input, styles.border]} placeholder="200" variant="numeric" onChangeText={yardsPerBallOnTextChange} />
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
                                projectMin={yarnRequirementsByIndex[selectedYarn][selectedProject].min}
                                projectMax={yarnRequirementsByIndex[selectedYarn][selectedProject].max}
                                user={user}
                                displayToast={displaySuccessToast}
                            />
                        }
                    </View>
                </ThemedView>
            </ScrollView>

            {/* success toast  */}
            {
                <ToastMessage visible={showSuccessToast} hideToast={() => setShowSuccessToast(false)} type="success" message={toastSuccessMessage} />
            }
            {/* on calculate toast error */}
            {
                <ToastMessage visible={showErrorToast} hideToast={() => setShowErrorToast(false)} type="error" message={toastErrorMessage} />
            }
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 25
    },
    background: {
        height: "120%"
    },
    greetings: {
        marginVertical: 20
    },
    container: {
        width: "100%",
        marginBottom: 25,
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
    yarnRequirements: {
        justifyContent: "center",
        textAlign: "center"
    },
    responseContainer: {

    },
    responseBody: {
        marginBottom: 15,
        marginTop: 25,
        alignItems: "center"
    },
    col: {

    },
    minMaxLabel: {
        textAlign: "center"
    }
})