import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, FontSize, IconSize } from "@/Theme";
import { useLogInMutation } from "@/Services";
import { useDispatch } from "react-redux";
import { logIn } from "@/Store/reducers";

const screenWidth: number = Dimensions.get("window").width;
const screenHeight: number = Dimensions.get("window").height;

export interface IRegisterProps {
  onNavigateLogin: () => void;
};

export const Register = (props: IRegisterProps) => {
    const { onNavigateLogin } = props;

    const dispatch = useDispatch();

    const [username, onChangeUsername] = useState("");

    const [password, onChangePassword] = useState("");

    const [confirmPassword, onChangeConfirmPassword] = useState("");

    const [secure, setSecure] = useState(true);

    const [uploadLogin, { data, isSuccess, isLoading, error }] = useLogInMutation();

    useEffect(() => {
        dispatch(logIn({
            userId: data?.id,
            token: data?.access_token,
            refreshToken: data?.refresh_token,
        }));
    }, [data]);

    const createRegisterAlert = () => {
        Alert.alert(
            "Register",
            "You have successfully registered!",
            [
                {
                    text: "OK",
                    onPress: () => {
                        onNavigateLogin();
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
                <View style={styles.greetingContainer}>
                    <View style={{ flex: 6, alignItems: "flex-start" }}>
                        <View style={styles.triangleLeftCorner}></View>
                        <View style={styles.textHeaderContainer}>
                            <Text style={{ fontSize: FontSize.LARGE, color: Colors.TEXT }}>Hey there!</Text>
                            <Text style={{ fontSize: FontSize.TINY, color: Colors.TEXT, marginTop: 5 }}>Enter your username and password to login or register below.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 4, alignItems: "flex-end" }}>
                        <View style={styles.trapezoid}></View>
                        <View style={styles.triangleRightCorner}></View>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        onPress={() => onNavigateLogin()}
                    >
                        <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: FontSize.SMALL, color: Colors.PRIMARY, textDecorationLine: "underline" }} >Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            editable
                            maxLength={40}
                            onChangeText={text => onChangeUsername(text)}
                            value={username}
                            style={styles.input}
                            placeholder="Username"
                        />
                        <View style={[styles.input, { flexDirection: "row" }]}>
                            <TextInput
                                editable
                                onChangeText={text => onChangePassword(text)}
                                secureTextEntry={secure}
                                value={password}
                                style={{ flex: 1, fontSize: FontSize.SMALL }}
                                placeholder="Password"
                            />
                            <TouchableOpacity onPress={() => setSecure(!secure)}>
                                {
                                    secure 
                                    ?
                                        <Ionicons name="eye-off" size={IconSize.MEDIUM} color={Colors.BLACK}/>
                                    :
                                        <Ionicons name="eye" size={IconSize.MEDIUM} color={Colors.BLACK}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            editable
                            onChangeText={text => onChangeConfirmPassword(text)}
                            secureTextEntry={secure}
                            value={confirmPassword}
                            style={styles.input}
                            placeholder="Confirm Password"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {uploadLogin({ username: username, password: password });createRegisterAlert();}}
                        >
                            <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }} >Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        alignItems: "center",
        justifyContent: "center",
    },
    greetingContainer: {
        flex: 4,
        flexDirection: "row",
        width: "100%",
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    bodyContainer: {
        flex: 5,
        width: "80%",
        backgroundColor: Colors.FLASHCARD,
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 50,
        paddingVertical: 30,
    },
    inputContainer: {
        flex: 4,
        justifyContent: "flex-start",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
    },
    input: {
        backgroundColor: Colors.TRANSPARENT,
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: FontSize.SMALL,
    },
    textBodyContainer: {
        alignItems: "flex-end",
    },
    button: {
        height: 40,
        backgroundColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    triangleLeftCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: screenWidth * 0.275,
        borderTopWidth: screenWidth * 0.275,
        borderRightColor: "transparent",
        borderTopColor: Colors.PRIMARY,
    },
    triangleRightCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: screenWidth * 0.375,
        borderTopWidth: screenWidth * 0.375,
        borderRightColor: "transparent",
        borderTopColor: Colors.PRIMARY,
        transform: [{ rotate: "90deg" }],
    },
    trapezoid: {
        width: screenWidth * 0.375,
        height: 0,
        borderBottomWidth: screenWidth * 0.275,
        borderBottomColor: Colors.PRIMARY,
        borderLeftWidth: screenWidth * 0.275,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderStyle: "solid",
    },
    textHeaderContainer: {
        paddingLeft: "15%",
    },
})