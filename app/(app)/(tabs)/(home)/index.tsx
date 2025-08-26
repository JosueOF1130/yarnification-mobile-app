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
    const [toastMessage, setToastMessage] = useState<string>("");


    function calculateYarnAmount() {
        console.log(yardsPerBall);
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
            return;
        } else {
            setYardsPerBall(numericValue);
            console.log(yardsPerBall);
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
                    <View>
                        <AppText>You'll need about this amount of balls of yarn</AppText>
                        <AppText style={styles.minMaxLabel}>{minMax.min}{" < Yards < "}{minMax.max}</AppText>
                    </View>
                    <AppButton onPress={saveProject} buttonStyle={styles.button}>Save project?</AppButton>
                </View>
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
        setToastMessage(message);
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
                        <AppSelectList data={yarnTypeData} setSelected={changeYarnTypeIcon}/>
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
                            keyboardType="number-pad"
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
                <ToastMessage visible={showSuccessToast} hideToast={() => setShowSuccessToast(false)} type="success" message={toastMessage}/>
            }
            {/* on calculate toast error */}
        </>
    );
}

const styles = StyleSheet.create({
        background: {
            // backgroundColor: colors.background.base,
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
            // color: colors.text.base,
            marginTop: 15
        },
        border: {
            borderWidth: 1,
            // borderColor: colors.text.base,
            borderRadius: 5,
        },
        marginVM: {
            marginVertical: 20
        },
        button: {
            // backgroundColor: colors.primary.shades[500],
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 25,
        },
        buttonText: {
            // color: colors.text.base,
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
            marginTop: 20
        },
        col: {

        },
        minMaxLabel: {
            textAlign: "center"
        }
    })