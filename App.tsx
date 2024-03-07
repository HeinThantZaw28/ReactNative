/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import IosAndroid from './components/IosAndroid';
import PokemonCard from './src/components/PokemonCard';
import {PokemonCardProps} from './src/type/global';
import LoginForm from './src/components/LoginForm';

const App = () => {
  const pokemons: PokemonCardProps[] = [
    {
      id: 1,
      name: 'Charmander',
      image: require('./src/assets/charmander.png'),
      type: 'Fire',
      hp: 39,
      moves: ['Scratch', 'Ember', 'Growl', 'Leer'],
      weakness: ['Water', 'Rock'],
    },
    {
      id: 2,
      name: 'Squirtle',
      image: require('./src/assets/squirtle.png'), // Replace with the actual image path
      type: 'Water',
      hp: 44,
      moves: ['Tackle', 'Water Gun', 'Tail Whip', 'Withdraw'],
      weakness: ['Electric', 'Grass'],
    },
    {
      id: 3,
      name: 'Bulbasaur',
      image: require('./src/assets/bulbasaur.png'), // Replace with the actual image path
      type: 'Grass',
      hp: 45,
      moves: ['Tackle', 'Vine Whip', 'Growl', 'Leech Seed'],
      weakness: ['Fire', 'Ice', 'Flying', 'Psychic'],
    },
    {
      id: 4,
      name: 'Pikachu',
      image: require('./src/assets/pikachu.png'), // Replace with the actual image path
      type: 'Electric',
      hp: 35,
      moves: ['Quick Attack', 'Thunderbolt', 'Tail Whip', 'Growl'],
      weakness: ['Ground'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <IosAndroid /> */}
      <StatusBar />
      <FlatList
        data={pokemons}
        renderItem={({item}) => <PokemonCard {...item} />}
        ListEmptyComponent={<Text>No Items Found!</Text>}
        ListHeaderComponent={
          <Text style={styles.headerTextStyle}>Pokemon Lists</Text>
        }
        keyExtractor={item => item.id.toString()}
      />
      {/* <ScrollView>
        {pokemons?.map(pokemon => (
          <PokemonCard key={pokemon.id} {...pokemon} />
      </ScrollView> */}
      {/* <LoginForm /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 25,
      },
    }),
  },
  headerTextStyle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default App;
