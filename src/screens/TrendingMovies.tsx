/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import MovieCard from '../components/MovieCard';
import {useNavigation} from '@react-navigation/native';
import {TrendingMovieApiInfo} from '../api/type';

export const remToPx = (rem: number) => {
  const baseFontSize = 16;
  return rem * baseFontSize;
};

export interface TrendinMovie {
  trending: TrendingMovieApiInfo[];
}

export const TrendingMovies = ({trending}: TrendinMovie) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const ITEM_WIDTH = 250;
  const ITEM_HEIGHT = 400;
  const MARGIN_HORIZONTAL = 20;
  const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
  const SPACER = (width - ITEM_FULL_WIDTH) / 2;

  const handleClick = (item: TrendingMovieApiInfo) => {
    navigation.navigate('Movie', item);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Trending</Text>
      <FlatList
        data={trending}
        // keyExtractor={item => item.id + item.name}
        renderItem={({item}) => {
          return (
            <MovieCard
              item={item}
              index={item.id}
              height={ITEM_HEIGHT}
              width={ITEM_WIDTH}
              marginHorizontal={MARGIN_HORIZONTAL}
              handleClick={handleClick}
            />
          );
        }}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{width: SPACER}}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{width: SPACER}}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        snapToInterval={ITEM_FULL_WIDTH}
        style={styles.flatListStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: remToPx(2),
  },
  text: {
    color: 'white',
    fontSize: remToPx(1.25),
    marginHorizontal: 8,
    marginBottom: remToPx(1.25),
  },
  customButtonStyle: {
    ...Platform.select({
      ios: {
        backgroundColor: 'lightblue',
        borderRadius: 15,
        padding: 10,
      },
      android: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        padding: 10,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  customButtonTextStyle: {
    ...Platform.select({
      ios: {
        color: 'yellow',
        fontSize: 18,
      },
      android: {
        color: 'yellow',
        fontSize: 20,
      },
    }),
  },
  flatListStyle: {
    marginVertical: 10,
  },
});

export default TrendingMovies;
