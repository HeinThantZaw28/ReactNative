import {Text, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';

export interface CustomButtonInterface {
  onPress: (event: GestureResponderEvent) => void | null | undefined;
  title: string;
}

const AndroidCustomButton = ({onPress, title}: CustomButtonInterface) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 5,
        padding: 10,
      }}>
      <Text style={{color: 'blue', fontSize: 18}}>{title}</Text>
    </Pressable>
  );
};

export default AndroidCustomButton;
