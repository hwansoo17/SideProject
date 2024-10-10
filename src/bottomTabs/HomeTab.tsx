import React, {useLayoutEffect} from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../screens/home/HomeMain';
// import MakeCard from '../screens/home/MakeCard';
import MakeCard from '../screens/register/MakeCard';
import RegisterCard from '../screens/register/RegisterCard';
import CardDetail from '../screens/home/CardDetail';
import useTabBarVisibilityStore from '../store/useTabBarVisibilityStore'; 

const Stack = createStackNavigator();

const HomeTab: React.FC<{ route: any }> = ({ route }) => {

  const { showTabBar, hideTabBar } = useTabBarVisibilityStore();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'HomeMain' || routeName === undefined) {
      showTabBar();
    } else {
      hideTabBar();
    }
  }, [route, showTabBar, hideTabBar]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="MakeCard"
        component={MakeCard}
      /> */}
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
      />
      <Stack.Screen
        name="MakeCard"
        component={MakeCard}
      />
      <Stack.Screen
        name="RegisterCard"
        component={RegisterCard}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
