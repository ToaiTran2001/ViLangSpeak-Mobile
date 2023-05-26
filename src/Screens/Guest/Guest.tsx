import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors, FontSize, IconSize } from "@/Theme";
import { useLogInMutation, useRegisterMutation } from "@/Services";
import { useDispatch } from "react-redux";
import { logIn } from "@/Store/reducers";
import { useHeaderHeight } from "@react-navigation/elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from 'expo-constants';

const screenWidth: number = Dimensions.get("window").width;
const screenHeight: number = Dimensions.get("window").height;

export interface IGuestProps {
    randomString: string;
    goBack: () => void;
}

export const Guest = (props: IGuestProps) => {
    const { randomString, goBack } = props;

    const dispatch = useDispatch();

    const [name, onChangeName] = useState("");

    const [pressOk, setPressOk] = useState(false);

    const register = useRegisterMutation();

    const login = useLogInMutation();

    const handleChangeName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const result = e.nativeEvent.text.replace(/[^a-z]/gi, '');;
        onChangeName(result);
    };

    useEffect(() => {
        if (register[1].data) {
            login[0]({ username: name + randomString, password: "123456" });
        }
    }, [register[1].data]);

    useEffect(() => {
        dispatch(logIn({
            userId: login[1].data?.id,
            token: login[1].data?.access_token,
            refreshToken: login[1].data?.refresh_token,
        }));
    }, [login[1].data]);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT, alignSelf: "flex-start" }}>Your name</Text>
            <TextInput
                editable
                maxLength={40}
                onChange={handleChangeName}
                value={name}
                style={styles.input}
                placeholder="Name"
            />
            {
                name === "" && pressOk &&
                <Text style={{ fontSize: FontSize.TINY, color: Colors.TEXT_ERROR, alignSelf: "flex-start", marginBottom: 10 }}>Please type your name!</Text>
            }
            <Text style={{ fontSize: FontSize.SMALL, color: Colors.ICON_GRAY, alignSelf: "flex-start" }}>If you uses as guest, your data will be disappeared when you logout our app!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.PRIMARY }]}
                    onPress={() => {
                        setPressOk(true);
                        if (name !== "") {
                            register[0]({ name: name, birthday: "1000-01-01", username: name + randomString, password: "123456" });
                        }
                    }}
                >
                    <Text style={{ fontSize: FontSize.STANDARD, color: Colors.TEXT, fontWeight: "bold" }} >OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.TRANSPARENT, borderWidth: 1, borderColor: Colors.BLACK }]}
                    onPress={() => {goBack();}}
                >
                    <Text style={{ fontSize: FontSize.STANDARD, color: Colors.TEXT, fontWeight: "bold" }} >GO BACK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.FLASHCARD,
        justifyContent: "center",
        alignItems: "center",
        padding: 35,
    },
    input: {
        backgroundColor: Colors.WHITE,
        width: "100%",
        height: 50,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        fontSize: FontSize.SMALL,
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "center",
        marginVertical: 30,
    },
    button: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 5,
    },
})