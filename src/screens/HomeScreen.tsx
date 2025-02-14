/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from './TrendingMovies';
import UpcomingMovies from './UpcomingMovies';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import {ApiResponse, TrendingMovieApiInfo} from '../api/type';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState<TrendingMovieApiInfo[]>();
  const [upComingMovies, setUpComingMovies] =
    useState<TrendingMovieApiInfo[]>();
  const [topRatedMovies, setTopRatedMovies] =
    useState<TrendingMovieApiInfo[]>();
  const [isLoading, setIsLoading] = useState(true);
  const ios = Platform.OS === 'ios';

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data: ApiResponse<TrendingMovieApiInfo> = await fetchTrendingMovies();
    data?.results && setTrending(data.results);
    setIsLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data: ApiResponse<TrendingMovieApiInfo> = await fetchUpcomingMovies();
    data?.results && setUpComingMovies(data.results);
  };
  const getTopRatedMovies = async () => {
    const data: ApiResponse<TrendingMovieApiInfo> = await fetchTopRatedMovies();
    data?.results && setTopRatedMovies(data.results);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={ios ? {marginBottom: -2} : {marginBottom: 3}}>
        <StatusBar barStyle={'light-content'} />
        {/** header bar and logo */}
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            M<Text style={styles.headerSubText}>ovies</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/**Trending movies carousel */}
          {trending && <TrendingMovies trending={trending} />}
          <UpcomingMovies title={'Upcoming'} data={upComingMovies} />
          <UpcomingMovies title={'Top Rated'} data={topRatedMovies} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: 'orange',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: 'white',
  },
});

export default HomeScreen;
