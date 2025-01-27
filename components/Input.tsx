import { StyleSheet, TextInput, TextInputProps, View } from "react-native"

import { Colors } from "@/constants/Colors";

export const Input = (props: TextInputProps) => {
    return(
        <View style={styles.container}>
            <TextInput {...props} style={styles.input} placeholderTextColor={Colors.text}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.text,
        borderWidth: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15
    },
    input: {
        width: '100%',
        height: '100%',
        color: Colors.text
    },
});