import { FlatList, ListRenderItem, StyleSheet, ViewProps } from "react-native"

import { githubRepo } from "@/@types/github";

import { GridItem } from "./GridItem";

export type GridProps = ViewProps & {
   data: githubRepo[];
   onItemSelected: (item: githubRepo) => void;
};

export const Grid = ({data, onItemSelected}: GridProps) => {
    
    const renderItem: ListRenderItem<githubRepo> = ({item}) => (
        <GridItem {...item} onPress={() => {}}/>
    )

    return(
        <FlatList 
            data={data} 
            renderItem={renderItem} 
            numColumns={2}
            style={styles.container}
            contentContainerStyle={styles.content}
            columnWrapperStyle={styles.columnContent}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
        paddingTop: 0,
        gap: 10
    },
    columnContent: {
        gap: 10
    }
});