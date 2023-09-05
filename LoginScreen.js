// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Hardcoded username and password for demo purposes
    const hardcodedUsername = 'user';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
        Alert.alert('Login successful',"Username is user and passowrd is password");
        navigation.navigate('PostList'); // Navigate to the post list screen
    } else {
      Alert.alert('Login failed',"Please enter password again");
    }
  };

  return (
    <View testID="login-screen" style={styles.container}>
      <Text style={styles.title}>Login App</Text>
      <TextInput
        style={styles.input}
              placeholder='Username'
              accessibilityLabel="Username" // Set the accessibility label
              accessibilityHint='Username'
              testID="username-input" 
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
              placeholder='Password'
              accessibilityLabel="Password" // Set the accessibility label
              accessibilityHint='Password'
              testID="password-input" 
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
          <Button
              title="Login"
              accessibilityLabel="Login"
              accessibilityHint="Login"
              onPress={handleLogin}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
