import { StyleSheet, TouchableOpacity } from "react-native"

import { repoContent } from "@/@types/github";
import FolderIcon from "@/assets/svgs/folder.svg";
import FileIcon from "@/assets/svgs/file.svg";
import { Colors } from "@/constants/Colors";

import { Text } from "../Text";

export type FilesItemProps = repoContent & {
    isFirst: boolean;
   onPress: () => void;
};

export const FilesItem = (props: FilesItemProps) => {
    const style = styles(props.isFirst);

    return(
        <TouchableOpacity style={style.container} activeOpacity={0.7} onPress={props.onPress}>
            {
                props.type === 'dir' ? (
                    <FolderIcon width={20} height={20}/>
                ) : (
                    <FileIcon width={20} height={20}/>
                )
            }
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = (isFirst: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        padding: 15,
        width: '100%',
        borderTopWidth: isFirst ? 0 : 1,
        borderTopColor: Colors.text
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 5
    }
});