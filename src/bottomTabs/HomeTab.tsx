import React, {useLayoutEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../screens/home/HomeMain';
import MakeCard from '../screens/home/MakeCard';
import RegisterCard from '../screens/home/RegisterCard';
import CardDetail from '../screens/myCard/MyCardDetail';
import useTabBarVisibilityStore from '../store/useTabBarVisibilityStore';
import Search from '../screens/home/Search';
import Capture from '../screens/home/Capture';
// import Capture from '../screens/home/Capture';
const Stack = createStackNavigator();

const HomeTab: React.FC<{route: any}> = ({route}) => {
  const {showTabBar, hideTabBar} = useTabBarVisibilityStore();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'HomeMain' || routeName === undefined) {
      showTabBar();
    } else {
      hideTabBar();
    }
  }, [route, showTabBar, hideTabBar]);
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CardDetail" component={CardDetail} options={{headerShown: false}}/>
      <Stack.Screen
        name="MakeCard"
        component={MakeCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterCard"
        component={RegisterCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Capture"
        component={Capture}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
