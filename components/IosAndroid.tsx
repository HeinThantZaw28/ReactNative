/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  SafeAreaView,
  Button,
  Alert,
  StatusBar,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Platform,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IosCustomButton from './CustomButton/CustomButton.ios';
import AndroidCustomButton from './CustomButton/CustomButton.android';

const IosAndroid = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const windowHeight = useWindowDimensions().height;
  const windowwidth = useWindowDimensions().width;

  // const [dimensions, setDimensions] = useState({
  //   window: Dimensions.get('window'),
  // });

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', ({window}) => {
  //     setDimensions({window});
  //   });
  //   return () => subscription?.remove();
  // }, []);

  // const {
  //   window: {scale, fontScale, height},
  // } = dimensions;
  // console.log('dimensions', scale, fontScale, height);
  const handleShowAlert = () => {
    Alert.alert('Confirm Box', 'Press Ok to confirm this process', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed!'),
      },
      {
        text: 'OK',
        onPress: () => console.log('Ok Pressed!'),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar animated backgroundColor="lightblue" />
      <SafeAreaView>
        <Button title="Press Me" onPress={handleShowAlert} />
        {Platform.OS === 'ios' ? (
          <IosCustomButton
            onPress={() => Alert.alert('Press IOS Btn')}
            title={'IOS Button'}
          />
        ) : (
          <AndroidCustomButton
            title="Andriod Btn"
            onPress={() => Alert.alert('Press on Android Btn')}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

// const windowHeight = Dimensions.get('window').width;
// const windowWidth = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
});

export default IosAndroid;
