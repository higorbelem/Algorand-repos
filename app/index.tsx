import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Grid } from '@/components/Grid';
import { useMainContextProvider } from '@/contexts/mainContext';
import { githubRepo } from '@/@types/github';

export default function Home() {
  const {repos, orgs, setCurrentRepository, fetchRepositories, loading, favorites} = useMainContextProvider();
  const [filter, setFilter] = useState<string>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchRepositories();
  }, []);

  const filterRepos = (items: githubRepo[]): githubRepo[] => {
    return items.filter(item => {
      if(!filter || filter === 'all') return true;

      if(filter === 'favorites') return favorites.includes(item.name);

      return item.owner.login === filter;
    })
  }

  const filteredRepos = filterRepos(repos);
  const filteredSearchRepos = filteredRepos.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const onRepoPress = (item: githubRepo) => {
    setCurrentRepository(item);
    router.push('/details');
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.inputContainer}>
          <Input placeholder='Search' onChangeText={text => setSearch(text)}/>
        </View>

        <Filter 
          data={orgs.map(item => ({id: item.id, label: item.name}))}
          onItemSelected={item => setFilter(item.id)}
          showFavorites
        />

        {
          loading && (
            <ActivityIndicator style={{ transform: [{ scale: 1.5 }] }}/>
          )
        }
        
        <Grid 
          data={filteredSearchRepos.map(item => ({ ...item, favorite: favorites.includes(item.name) }))}
          onItemSelected={onRepoPress}
          emptyText='No repositories'
        />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    gap: 20
  },
  inputContainer: {
    paddingHorizontal: 20
  }
});
