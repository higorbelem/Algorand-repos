import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter/Filter';

export default function Home() {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.inputContainer}>
          <Input placeholder='Search'/>
        </View>

        <Filter 
          data={[{id: '2', label: 'Pera Wallet'}, {id: '3', label: 'Algorand Foundation'}, {id: '4', label: 'Algorand'}]}
          onItemSelected={() => {}}
        />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    paddingHorizontal: 20
  }
});
