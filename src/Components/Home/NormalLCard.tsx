import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Switch } from 'react-native-switch';
import { Colors, FontSize } from "@/Theme";
import { Config } from "@/Config";
import { ILCardProps } from "./SmallLCard";

export const NormalLCard = (props: ILCardProps) => {
    const { id, name, visible, category, progress, onPress } = props;
    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let containerColor: string = Colors.NEW;
    // let isRecall: boolean = false;

    if (progress?.progress.value === 100) {
        containerColor = Colors.SUCCESS;
        // isRecall = true;
    } else if (progress && progress.progress.value !== 0) {
        containerColor = Colors.PRIMARY;
    }

    const defaultImage: string = "/public/image/lesson-default.png";

    return (
        <TouchableOpacity
            style={[styles.container, {backgroundColor: containerColor}]}
            onPress={onPress}
        >
            <View style={styles.thumbnailContainer}>
                <Image style={styles.thumbnail} source={{uri: Config.API_APP_URL.slice(0, -1) + (category?.image === "" ? defaultImage : category?.image)}}></Image>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>{name}</Heading>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT, marginRight: 30}}>{progress ? progress.progress.value : 0}%</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{category?.name}</Text>
                    {/* <View style={styles.switch}>
                        {isRecall ? (
                            <Switch
                                value={isEnabled}
                                onValueChange={toggleSwitch}
                                disabled={false}
                                activeText={"R"}
                                inActiveText={"L"}
                                circleSize={30}
                                circleBorderWidth={1}
                                backgroundActive={Colors.BUTTON_REVIEW}
                                backgroundInactive={Colors.GRAY}
                                circleActiveColor={Colors.SWITCH_CIRCLE_ON}
                                circleInActiveColor={Colors.WHITE}
                                switchLeftPx={2.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                switchRightPx={2.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                // barHeight={1}
                                // renderInsideCircle={() => <Text></Text>} // custom component to render inside the Switch circle (Text, Image, etc.)
                                // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                // innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                                // outerCircleStyle={{}} // style for outer animated circle
                                // renderActiveText={false}
                                // renderInActiveText={false}
                                // switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                                // switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                            />
                        ) : (
                            <></>
                        )}
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: "96%",
        height: 96,
        borderRadius: 20,
        margin: 5,
    },
    thumbnailContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 7,
        marginVertical: 5,
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    thumbnail: {
        resizeMode: "contain",
        width: 64,
        height: 64,
    },
    switch: {
        marginRight: 30,
    }
});