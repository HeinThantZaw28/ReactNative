import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert(
      'User Login Info',
      `Username is ${username}\nPassword is ${password}`,
    );
    setUserName('');
    setPassword('');
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <View style={styles.form}>
        <Image
          source={require('../assets/pikachu.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.inputStyle}
          value={username}
          onChangeText={setUserName}
        />
        <Text style={styles.labelStyle}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.inputStyle}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={handleLogin}
          style={styles.btnStyle}
          disabled={!username || !password}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '80%',
    gap: 8,
  },
  imageStyle: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
  },
  labelStyle: {
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    padding: 5,
    color: 'black',
  },
  btnStyle: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnText: {
    textAlign: 'center',
  },
});

export default LoginForm;
