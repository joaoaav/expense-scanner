import { router } from 'expo-router';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../services/firebase';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async () => {
    // TODO: implement Firebase Auth login here
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
      }
      await signInWithEmailAndPassword(auth as Auth, email, password);
      router.replace('/scan');
    } catch (err: any) {
      console.log('login error', err);
      setError(err.message);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

        <Button title="Log In" onPress={onLogin} />
      </View>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 10,
    borderRadius: 4,
  },
});