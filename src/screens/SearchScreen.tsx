/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {XMarkIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import debounce from 'debounce';
import {
  fallbackMoviePoster,
  fetchImage185,
  fetchSearchMovies,
} from '../api/moviedb';
import {ApiResponse, TrendingMovieApiInfo} from '../api/type';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TrendingMovieApiInfo[]>([]);

  const handleSearch = async (value: string) => {
    if (value && value.length > 0) {
      setIsLoading(true);
      const data: ApiResponse<TrendingMovieApiInfo> = await fetchSearchMovies(
        value,
      );
      data?.results && setResults(data.results);
      setIsLoading(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={styles.container}>
      {/**Search Input */}
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleSearch}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={[styles.searchInput, styles.commonText]}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.searchCancel}>
          <XMarkIcon size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.header}>Result (4)</Text>
          <View style={styles.movieContainer}>
            {results?.map((item, i): any => (
              <TouchableOpacity
                style={styles.movie}
                key={i}
                onPress={() => navigation.navigate('Movie', item)}>
                <Image
                  source={{
                    uri: fetchImage185(item.poster_path) || fallbackMoviePoster,
                  }}
                  resizeMode="cover"
                  style={styles.img}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    fontFamily: 'Roboto',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {item.title.length > 22
                    ? item.title.slice(0, 22) + '...'
                    : item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Image
          source={require('../assets/nodata.webp')}
          resizeMode="contain"
          style={{
            width: 400,
            height: 300,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5,
  },
  commonText: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  searchContainer: {
    marginTop: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 30,
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
  },
  searchCancel: {
    padding: 9,
    margin: 2,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  resultContainer: {
    marginVertical: 20,
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  movie: {
    width: '48%',
    height: 340,
    gap: 10,
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
});
