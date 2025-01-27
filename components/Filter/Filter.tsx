import { StyleSheet, View, ViewProps } from "react-native"
import { useEffect, useState } from "react";

import { FilterItem } from "./FilterItem";

export type filterItemType = {
    id: string;
    label: string;
};

export type FilterProps = ViewProps & {
   data: filterItemType[];
   onItemSelected: (item: filterItemType) => void;
};

const AllItem: filterItemType = {
    id: 'all',
    label: 'All'
}

export const Filter = ({data, onItemSelected}: FilterProps) => {
    const [selectedId, setSelectedId] = useState<string>(AllItem.id);

    useEffect(() => {
        onItemSelected(AllItem);
    }, [])

    const onPress = (item: filterItemType) => {
        onItemSelected(item);
        setSelectedId(item.id);
    }

    return(
        <View style={styles.container}>
            <FilterItem 
                key={AllItem.id} 
                id={AllItem.id}
                label={AllItem.label}
                selected={selectedId === AllItem.id}
                onPress={() => onPress(AllItem)}
            />

            {
                data.map(item => (
                    <FilterItem 
                        key={item.id} 
                        id={item.id}
                        label={item.label}
                        selected={selectedId === item.id}
                        onPress={() => onPress(item)}
                    />
                ))
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
        padding: 20,
        gap: 10
    }
});