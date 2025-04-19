import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import "react-native-url-polyfill/auto";

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (rootNavigationState?.key) {
      router.replace('/login');
    }
  }, [rootNavigationState]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
