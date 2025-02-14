/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TrendingMovieApiInfo} from '../api/type';
import {fetchImage342} from '../api/moviedb';

export interface MovieCardProps {
  item: TrendingMovieApiInfo;
  index: number;
  width: number;
  height: number;
  marginHorizontal: number;
  handleClick: (item: TrendingMovieApiInfo) => void;
}

const MovieCard = ({
  item,
  index,
  width,
  height,
  marginHorizontal,
  handleClick,
}: MovieCardProps) => {
  return (
    <TouchableOpacity onPress={() => handleClick(item)}>
      <View
        style={[
          styles.container,
          {width: width, height: height, marginHorizontal: marginHorizontal},
        ]}>
        <Image
          source={{uri: fetchImage342(item.poster_path)}}
          style={{width: width, height: height}}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 14,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
