import React, {useLayoutEffect} from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../screens/home/HomeMain';
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
        name="홈"
        component={HomeMain}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
