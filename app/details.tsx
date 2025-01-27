import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { useMainContextProvider } from '@/contexts/mainContext';
import { Text } from '@/components/Text';
import ForkIcon from "@/assets/svgs/fork.svg";
import IssueIcon from "@/assets/svgs/issue.svg";
import StarIcon from "@/assets/svgs/star.svg";
import { repoContent } from '@/@types/github';
import { Files } from '@/components/Files';
import { API } from '@/services/api';
import { Heart } from '@/components/Heart';

export default function Details() {
  const [content, setContent] = useState<repoContent[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentRepo, favorites, addToFavorites } = useMainContextProvider();

  useEffect(() => {
    getContent();
  }, [])

  const getContent = async () => {
    setLoading(true);
    try {
      const res = await API<repoContent[]>(`/repos/${currentRepo?.full_name}/contents`);

      if(!res) return;
      
      setContent(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const sortContent = (data: repoContent[]) => {
    const nameSort = data.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    return [
      ...nameSort.filter(item => item.type === 'dir'),
      ...nameSort.filter(item => item.type === 'file'),
      ...nameSort.filter(item => item.type !== 'dir' && item.type !== 'file'),
    ];
  }

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

  const onFavoritePress = async () => {
    if(!currentRepo) return;
    addToFavorites(currentRepo);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Header showBackButton onExplore={onExplore}/>
     
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Image style={styles.image} source={{ uri: currentRepo?.owner.avatar_url }}/>

              <View style={styles.titleWrapperContainer}>
                <Text size='small'>{currentRepo?.owner.login}</Text>
                <Text size='header' weight='bold' numberOfLines={2}>{currentRepo?.name}</Text>
              </View>

              <View style={styles.privateContainer}>
                <Text>{currentRepo?.private ? 'Private' : 'Public'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7} onPress={onFavoritePress}>
              <Heart size="big" favorite={!!currentRepo?.name && favorites.includes(currentRepo.name)}/>
            </TouchableOpacity>
          </View>
        
          {
            loading && (
              <ActivityIndicator style={{ transform: [{ scale: 1.5 }] }}/>
            )
          }

          <Files data={sortContent(content)} onItemSelected={onFilePress}/>

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
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleWrapperContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
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
    justifyContent: 'space-evenly',
    paddingBottom: 20
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  favoriteButton: {
    padding: 5
  }
});
