import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Grid } from '@/components/Grid';
import { useMainContextProvider } from '@/contexts/mainContext';

export default function Home() {
  const {repos, orgs} = useMainContextProvider();
  const [filter, setFilter] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const filteredRepos = repos.filter(item => filter === undefined || filter === 'all' ? true : item.owner.login === filter);
  const filteredSearchRepos = filteredRepos.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

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
        />

        <Grid data={filteredSearchRepos} onItemSelected={() => {}}/>
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
