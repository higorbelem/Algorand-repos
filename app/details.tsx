import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { useState } from 'react';

import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { useMainContextProvider } from '@/contexts/mainContext';
import { Text } from '@/components/Text';
import ForkIcon from "@/assets/svgs/fork.svg";
import IssueIcon from "@/assets/svgs/issue.svg";
import StarIcon from "@/assets/svgs/star.svg";
import { reposContentMock } from '@/constants/mocks';
import { repoContent } from '@/@types/github';
import { Files } from '@/components/Files';

export default function Details() {
  const [content, setContent] = useState<repoContent[]>(reposContentMock);
  const { currentRepo } = useMainContextProvider();

  const onExplore = async () => {
    if(currentRepo?.html_url && await Linking.canOpenURL(currentRepo.html_url)) 
      Linking.openURL(currentRepo.html_url);
  }

  const onFilePress = async (item: repoContent) => {
    if(item?.html_url && await Linking.canOpenURL(item.html_url)) 
      Linking.openURL(item.html_url);
  }

  const onStarPress = async () => {
    if(!currentRepo?.html_url) return;
    
    const url = `${currentRepo.html_url}/stargazers`;

    if(url && await Linking.canOpenURL(url)) 
      Linking.openURL(url);
  }

  const onForkPress = async () => {
    if(!currentRepo?.html_url) return;
    
    const url = `${currentRepo.html_url}/forks`;

    if(url && await Linking.canOpenURL(url)) 
      Linking.openURL(url);
  }

  const onIssuesPress = async () => {
    if(!currentRepo?.html_url) return;
    
    const url = `${currentRepo.html_url}/issues`;

    if(url && await Linking.canOpenURL(url)) 
      Linking.openURL(url);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Header showBackButton onExplore={onExplore}/>
     
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Image style={styles.image} source={{ uri: currentRepo?.owner.avatar_url }}/>
            <Text size='header' weight='bold'>{currentRepo?.name}</Text>

            <View style={styles.privateContainer}>
              <Text>{currentRepo?.private ? 'Private' : 'Public'}</Text>
            </View>
          </View>

          <Files data={content} onItemSelected={onFilePress}/>

          <View style={styles.statsContainer}>
            <TouchableOpacity onPress={onStarPress} style={styles.statContainer} activeOpacity={0.7}>
              <StarIcon width={30} height={30}/>
              <Text>{currentRepo?.stargazers_count || 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onForkPress} style={styles.statContainer} activeOpacity={0.7}>
              <ForkIcon width={30} height={30}/>
              <Text>{currentRepo?.forks || 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onIssuesPress} style={styles.statContainer} activeOpacity={0.7}>
              <IssueIcon width={30} height={30}/>
              <Text>{currentRepo?.open_issues_count || 0}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    gap: 20
  },
  container: {
    flex: 1,
    width: '100%',
    gap: 20
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  privateContainer: {
    backgroundColor: '#ffffff22',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
});
