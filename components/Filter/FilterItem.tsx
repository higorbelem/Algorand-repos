import { StyleSheet, TouchableOpacity } from "react-native"

import { Colors } from "@/constants/Colors";

import { Text } from "../Text";
import { filterItemType } from ".";

export type FilterItemProps = filterItemType & {
   selected: boolean;
   onPress: () => void;
};

export const FilterItem = ({label, selected, onPress}: FilterItemProps) => {
    const style = styles(selected);

    return(
        <TouchableOpacity testID="filter-item" style={style.container} activeOpacity={0.7} onPress={onPress}>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = (selected: boolean) => StyleSheet.create({
    container: {
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: selected ? Colors.main : '#ffffff22',
        alignItems: 'center',
        justifyContent: 'center'
    }
});