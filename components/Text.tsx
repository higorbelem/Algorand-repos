import { StyleSheet, Text as T, TextProps as ReactTextProps } from "react-native"

import { Colors } from "@/constants/Colors";

const sizes = {
    header: 24,
    normal: 16,
    small: 12,
    tiny: 10
}

const weights = {
    bold: "700",
    normal: "400",
}

export type TextProps = ReactTextProps & {
   size?: keyof typeof sizes;
   weight?: keyof typeof weights;
};

export const Text = (props: TextProps) => {
    return(
        <T 
            {...props} 
            style={[
                styles.text, 
                props.style, 
                {
                    fontSize: sizes[props.size || 'normal'],
                    fontWeight: weights[props.weight || 'normal'] as any
                }
            ]}
        >{props.children}</T>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.text
    },
});