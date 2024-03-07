/* eslint-disable @typescript-eslint/no-shadow */
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import React from 'react';
import {PokemonCardProps} from '../type/global';

const PokemonCard = ({
  name,
  image,
  type,
  hp,
  moves,
  weakness,
}: PokemonCardProps) => {
  const getTypeDetails = (type: string) => {
    switch (type.toLowerCase()) {
      case 'electric':
        return {borderColor: '#FFD700', emoji: '⚡️'};
      case 'water':
        return {borderColor: '#6493EA', emoji: '💧'};
      case 'fire':
        return {borderColor: '#FF5733', emoji: '🔥'};
      case 'grass':
        return {borderColor: '#66CC66', emoji: '🌿'};
      default:
        return {borderColor: '#A0A0A0', emoji: '❓'};
    }
  };

  const {borderColor, emoji} = getTypeDetails(type);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerStyle}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.hpStyle}>💖 {hp}</Text>
      </View>
      <Image
        source={image}
        accessibilityLabel={`${name} pokemon`}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={[{borderColor}, styles.typeStyle]}>
        <Text style={styles.typeEmoji}>{emoji}</Text>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      <View style={styles.movesStyle}>
        <Text style={styles.movesText}>Moves: {moves?.join(', ')}</Text>
      </View>
      <View style={styles.weaknessStyle}>
        <Text style={styles.movesText}>Weakness: {weakness?.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowOffset: {width: 2, height: 2},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameStyle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  hpStyle: {
    fontSize: 22,
    color: 'black',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  typeStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 4,
    marginBottom: 40,
    alignSelf: 'center',
  },
  typeEmoji: {fontSize: 30, marginRight: 12},
  typeText: {fontSize: 22, fontWeight: 'bold', color: 'black'},
  movesStyle: {
    marginBottom: 16,
  },
  movesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  weaknessStyle: {
    marginBottom: 6,
  },
});

export default PokemonCard;
