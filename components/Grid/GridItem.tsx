import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image";

import { Colors } from "@/constants/Colors";
import { githubRepos } from "@/@types/github";
import ForkIcon from "@/assets/svgs/fork.svg";
import IssueIcon from "@/assets/svgs/issue.svg";
import StarIcon from "@/assets/svgs/star.svg";
import { getLanguageColor } from "@/helpers/getLanguageColor";

import { Text } from "../Text";

export type GridItemProps = githubRepos & {
   onPress: () => void;
};

export const GridItem = (props: GridItemProps) => {

    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={props.onPress}>
            <View style={styles.ownerContainer}>
                <Image source={{uri: props.owner.avatar_url}} style={styles.image}/>
                <Text size="small">{props.owner.login}</Text>
            </View>

            <Text weight="bold">{props.name}</Text>

            <Text size="small" numberOfLines={3} style={styles.description}>{props.description}</Text>

            <View style={styles.middleContainer}>
                <View style={styles.privateContainer}>
                    <Text size="small">{props.private ? 'Private' : 'Public'}</Text>
                </View>

                {
                    !!props.language && (
                        <View style={styles.languageContainer}>
                            <View style={[styles.languageDot, {backgroundColor: getLanguageColor(props.language)}]}/>
                            <Text size="small">{props.language}</Text>
                        </View>
                    )
                }
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statContainer}>
                    <StarIcon />
                    <Text size="small">{props.stargazers_count}</Text>
                </View>

                <View style={styles.statContainer}>
                    <ForkIcon />
                    <Text size="small">{props.forks}</Text>
                </View>

                <View style={styles.statContainer}>
                    <IssueIcon />
                    <Text size="small">{props.open_issues_count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: Colors.text,
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        gap: 10
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 5
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    middleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    privateContainer: {
        backgroundColor: '#ffffff22',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    languageDot: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    description: {
        flex: 1
    }
});