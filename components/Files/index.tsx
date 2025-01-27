import { ScrollView, StyleSheet, ViewProps } from "react-native"

import { repoContent } from "@/@types/github";
import { Colors } from "@/constants/Colors";

import { FilesItem } from "./FilesItem";

export type FilesProps = ViewProps & {
   data: repoContent[];
   onItemSelected: (item: repoContent) => void;
};

export const Files = ({data, onItemSelected}: FilesProps) => {
    const onPress = (item: repoContent) => {
        onItemSelected(item);
    }

    return(
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.content} 
            showsVerticalScrollIndicator={false}
        >

            {
                data.map((item, index) => (
                    <FilesItem 
                        key={item.url} 
                        {...item}
                        onPress={() => onPress(item)}
                        isFirst={index === 0}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 20
    }
});