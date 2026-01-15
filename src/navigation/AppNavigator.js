import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Screens (we will create these next)
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/app/HomeScreen';
import ResourcesScreen from '../screens/app/ResourcesScreen';
import QuizzesScreen from '../screens/app/QuizzesScreen';
import ForumsScreen from '../screens/app/ForumsScreen';
import StatsScreen from '../screens/app/StatsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

function AppTabs() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Resources') iconName = 'file-document';
                    else if (route.name === 'Quizzes') iconName = 'school';
                    else if (route.name === 'Forums') iconName = 'forum';
                    else if (route.name === 'Stats') iconName = 'chart-bar';

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Resources" component={ResourcesScreen} />
            <Tab.Screen name="Quizzes" component={QuizzesScreen} />
            <Tab.Screen name="Forums" component={ForumsScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
