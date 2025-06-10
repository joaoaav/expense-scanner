import { Redirect, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../services/firebase';

const HomeScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments(); // Get the current segments of the URL
  
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsub;
  }, []);
  
  // Determine if the user is currently in the authentication flow segments
  const inAuthGroup = segments[0] === '(auth)';

  // Redirect logic based on authentication state and current location
  if (!loading) {
    if (!user && !inAuthGroup) {
      // If not logged in and not in the auth group, redirect to login
      return <Redirect href="/auth/login" />;
    } else {
      // If logged in and in the auth group, redirect to the main app
      return <Redirect href="/scan" />;
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default HomeScreen;