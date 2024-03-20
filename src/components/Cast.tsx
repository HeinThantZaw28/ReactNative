import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CastApiInfo} from '../api/type';
import {fallbackPersonImage, fetchImage185} from '../api/moviedb';

export interface CastProps {
  casts: CastApiInfo[];
}

const Cast = ({casts}: CastProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.castText}>Top Casts</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        horizontal
        style={styles.castContainer}>
        {casts?.map((cast, i: any) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.inContainer}
              onPress={() => navigation.navigate('Person', {cast: cast})}>
              {/* <View style={styles.img}> */}
              <Image
                // source={require('../assets/keanureeves.jpg')}
                source={{
                  uri: fetchImage185(cast.profile_path) || fallbackPersonImage,
                }}
                resizeMode="cover"
                style={{width: 60, height: 60, borderRadius: 60}}
              />
              {/* </View> */}
              <Text style={styles.castName}>
                {cast.character.length > 10
                  ? cast.character.slice(0, 10) + '...'
                  : cast.character}
              </Text>
              <Text style={styles.actorName}>
                {cast.name.length > 10
                  ? cast.name.slice(0, 10) + '...'
                  : cast.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    gap: 10,
    marginBottom: 20,
  },
  castText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'lightgray',
    fontSize: 20,
  },
  castContainer: {},
  inContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 150,
    backgroundColor: 'white',
  },
  castName: {
    color: 'lightgray',
    fontWeight: '600',
    fontSize: 12,
    marginVertical: 3,
  },
  actorName: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 12,
  },
});
