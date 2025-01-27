import { StyleSheet, View, ViewProps } from "react-native"
import {Defs, Ellipse, RadialGradient, Stop, Svg} from 'react-native-svg';

import { Colors } from "@/constants/Colors";

export type BackgroundProps = ViewProps & {};

export const Background = ({style, children}: BackgroundProps) => {
    return(
        <View style={styles.container}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.svg}>
                <Defs>
                    <RadialGradient
                        id="grad"
                        cx="-200" cy="-200" rx="400" ry="400"
                        fx="-200" fy="-200"
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0" stopColor={Colors.main} stopOpacity="1" />
                        <Stop offset="1" stopColor={Colors.background} stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Ellipse cx="-200" cy="-200" rx="400" ry="400" fill="url(#grad)" />
            </Svg>

            <View style={[styles.content, style]}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.background
    },
    content: {
        flex: 1,
        width: '100%'
    },
    svg: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});