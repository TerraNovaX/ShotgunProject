import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={28} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => router.replace('/login')}
          >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, any> = {
            home: 'home',
            maps: 'map',
            search: 'search',
            myEvents: 'calendar',
          };
          return (
            <Ionicons name={icons[route.name] || 'help'} size={size} color={color} />
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="maps" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="myEvents" />
    </Tabs>
  );
}
