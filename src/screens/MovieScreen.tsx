/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import UpcomingMovies from './UpcomingMovies';
import {
  ApiResponse,
  CastApiInfo,
  DetailApiResponse,
  MovieCreditApiResponse,
  TrendingMovieApiInfo,
} from '../api/type';
import {
  fallbackMoviePoster,
  fetchImage500,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from '../api/moviedb';
import Loading from '../components/Loading';

interface ParamsProps {
  key: string;
  name: string;
  path?: string | undefined;
  params: TrendingMovieApiInfo;
}

const MovieScreen = () => {
  const {params: item} = useRoute<ParamsProps>();
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<DetailApiResponse>();
  const [movieCredits, setMovieCredits] = useState<CastApiInfo[]>([]);
  const [similarMovies, setSimilarMovies] = useState<TrendingMovieApiInfo[]>(
    [],
  );

  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item]);

  const getMovieDetails = async () => {
    setIsLoading(true);
    const data = await fetchMovieDetails(item.id);
    data && setMovie(data);
    setIsLoading(false);
  };

  const getMovieCredits = async () => {
    const data: MovieCreditApiResponse = await fetchMovieCredits(item.id);
    data && setMovieCredits(data.cast);
  };

  const getSimilarMovies = async () => {
    const data: ApiResponse<TrendingMovieApiInfo> = await fetchSimilarMovies(
      item.id,
    );
    data?.results && setSimilarMovies(data.results);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/**header bar */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerLeftIcon}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon
                size={28}
                strokeWidth={2.5}
                color={'white'}
                // style={{position: 'relative', top: 2}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
              <HeartIcon size={35} color={isFavourite ? 'orange' : 'white'} />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{
                uri:
                  fetchImage500(movie?.poster_path as string) ||
                  fallbackMoviePoster,
              }}
              // source={require('../assets/infinitywar.jpeg')}
              style={{width, height: height / 2}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{
                width,
                height: height * 0.4,
                position: 'absolute',
                bottom: 0,
              }}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>
          {/**movie detail  */}
          <View style={{marginTop: -(height * 0.09), gap: 10}}>
            <Text style={styles.movieName}>{movie?.title}</Text>
            {/**status, release, runtime */}
            <Text style={styles.movieReleaseDate}>
              {movie?.status} . {movie?.release_date.split('_')[0]} .{' '}
              {movie?.runtime} min
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {movie?.genres.map((genre, index) => {
                let showDot = index + 1 !== movie.genres.length;
                return (
                  <Text key={genre.id} style={styles.movieReleaseDate}>
                    {genre.name} {showDot ? '- ' : null}
                  </Text>
                );
              })}
            </View>
            {/**description */}
            <Text style={styles.movieDesc}>{movie?.overview}</Text>
          </View>
          {/*top cast */}
          {movieCredits.length > 0 && <Cast casts={movieCredits} />}
          {/**similar movies */}
          {similarMovies?.length > 0 && (
            <UpcomingMovies
              title={'Similar Movies'}
              hideSeeAll={false}
              data={similarMovies}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
  },
  headerLeftIcon: {
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  movieTitle: {
    // marginTop,
  },
  movieName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  movieReleaseDate: {
    color: 'gray',
    fontWeight: '600',
    textAlign: 'center',
  },
  movieDesc: {
    color: 'gray',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'justify',
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
  },
});
