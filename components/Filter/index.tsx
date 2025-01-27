import { ScrollView, StyleSheet, ViewProps } from "react-native"
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
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.content} 
            horizontal 
            showsHorizontalScrollIndicator={false}
        >
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
       flexGrow: 0
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 20
    }
});