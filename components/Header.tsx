import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native"
import { router } from "expo-router";

import AlgorandLogo from "@/assets/svgs/algorand-logo.svg";
import ChevronLeftIcon from "@/assets/svgs/chevron-left.svg";
import { Colors } from "@/constants/Colors";

import { Text } from "./Text";

export type HeaderProps = ViewProps & {
    showBackButton?: boolean;
    onExplore?: () => void;
};

export const Header = (props: HeaderProps) => {
    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {
                    props.showBackButton && (
                        <TouchableOpacity testID="back-button" onPress={() => router.back()} activeOpacity={0.7}>
                            <ChevronLeftIcon width={40} height={40}/>
                        </TouchableOpacity>
                    )
                }

                <AlgorandLogo />
            </View>

            {
                props.onExplore && (
                    <TouchableOpacity testID="explore-button" onPress={props.onExplore} activeOpacity={0.7} style={styles.exploreButton}>
                        <Text>Explore</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    exploreButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.green
    }
});