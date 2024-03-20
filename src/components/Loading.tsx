import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const Loading = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View
      style={{height, width, justifyContent: 'center', alignItems: 'center'}}>
      <Progress.CircleSnail thickness={12} size={160} color={'orange'} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
