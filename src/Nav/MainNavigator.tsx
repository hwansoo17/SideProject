import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyCardTab from '../bottomTabs/MyCardTab';
import StorageTab from '../bottomTabs/StorageTab';
import HomeTab from '../bottomTabs/HomeTab';
import useAuthStore from '../store/useAuthStore';
import CustomTabBar from '../components/CustomTabBar';

const MyCardIcon = require('../assets/tabBarIcon/MyCardIcon.svg').default;
const HomeIcon = require('../assets/tabBarIcon/HomeIcon.svg').default;
const StorageIcon = require('../assets/tabBarIcon/StorageIcon.svg').default;
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const {logout} = useAuthStore();
  return (
    <Tab.Navigator 
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="MyCard"
        component={MyCardTab}
        options={{
          tabBarLabel: '내 명함',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MyCardIcon color={focused ? '#FFFFFF' : '#A1A1A1'} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: '홈',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? '#FFFFFF' : '#A1A1A1'} />
          ),
        }}
      />
      <Tab.Screen
        name="Storage"
        component={StorageTab}
        options={{
          tabBarLabel: '보관함',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <StorageIcon color={focused ? '#FFFFFF' : '#A1A1A1'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
