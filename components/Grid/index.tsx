import { FlatList, ListRenderItem, StyleSheet, ViewProps } from "react-native"

import { githubRepos } from "@/@types/github";

import { GridItem } from "./GridItem";

export type GridProps = ViewProps & {
   data: githubRepos[];
   onItemSelected: (item: githubRepos) => void;
};

export const Grid = ({data, onItemSelected}: GridProps) => {
    
    const renderItem: ListRenderItem<githubRepos> = ({item}) => (
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
        
    },
    content: {
        padding: 20,
        gap: 10
    },
    columnContent: {
        gap: 10
    }
});