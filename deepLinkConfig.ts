import { Linking } from 'react-native';


export const linking = {
  prefixes: ['sideproject://'],
  config: {
    screens: {
      initialRouteName : 'Home',
      Home: 'home',
      MyCard: {
        initialRouteName: 'MyCardMain',
        screens: {
          MyCardMain: 'myCard',
          MyCardDetail: 'myCard/Detail/:id',
        },
      },
      Storage: {
        initialRouteName: 'StorageMain',
        screens: {
          StorageMain: 'storage',
          StorageDetail: 'storage/Detail/:id',
          AddCard: 'storage/AddCard',
        },
      },
      Setting: 'setting',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};