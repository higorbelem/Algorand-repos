import { FlatList, ListRenderItem, StyleSheet, View, ViewProps } from "react-native"

import { githubRepo } from "@/@types/github";

import { GridItem } from "./GridItem";
import { Text } from "../Text";

export type GridProps = ViewProps & {
   data: (githubRepo & {favorite: boolean})[];
   onItemSelected: (item: githubRepo) => void;
   emptyText: string;
};

export const Grid = ({data, onItemSelected, emptyText}: GridProps) => {
    
    const renderItem: ListRenderItem<githubRepo> = ({item}) => (
        <GridItem {...item} onPress={() => onItemSelected(item)}/>
    )

    if(!data.length) return (
        <View style={styles.emptyContainer}>
            <Text>{emptyText}</Text>
        </View>
    )

    return(
        <FlatList 
            testID="grid-list"
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
    },
    emptyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});