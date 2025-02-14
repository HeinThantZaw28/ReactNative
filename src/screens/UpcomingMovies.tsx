/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {TrendingMovieApiInfo} from '../api/type';
import {fallbackMoviePoster, fetchImage185} from '../api/moviedb';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const itemFullWidth = width * 0.33;
export interface UpcomingMoviesProps {
  title: String;
  hideSeeAll?: Boolean;
  data?: TrendingMovieApiInfo[];
}
const UpcomingMovies = ({
  title,
  hideSeeAll = true,
  data,
}: UpcomingMoviesProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: 'white'}]}>{title}</Text>
        {hideSeeAll && (
          <Text style={[styles.headerText, {color: 'orange'}]}>See All </Text>
        )}
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.push('Movie', item)}>
              <View style={styles.movieContainer}>
                <Image
                  source={{
                    uri: fetchImage185(item.poster_path) || fallbackMoviePoster,
                  }}
                  // source={require('../assets/capmarvel.jpeg')}
                  resizeMode="contain"
                  style={styles.img}
                />
                <Text style={styles.movieText}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        snapToInterval={itemFullWidth}
        horizontal
      />
    </View>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    marginHorizontal: 4,
    marginBottom: 10,
  },
  movieContainer: {
    alignItems: 'center',
  },
  img: {
    width: itemFullWidth,
    height: height * 0.22,
    borderRadius: 30,
  },
  movieText: {
    fontSize: 10,
    color: 'white',
  },
});
