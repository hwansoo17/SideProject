import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/Nav/RootNavigator';
import { Linking } from 'react-native';
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        handleDeepLink(initialURL);
      }
    };
    getInitialURL();
    const subscription = Linking.addEventListener('url', (e) => {
      handleDeepLink(e.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = (url: string) => {
    const { path, queryParams } = Linking.parse(url);
    const cardId = path.split('/')[2];
    console.log(`cardId: ${cardId}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator/>
    </QueryClientProvider>
  );
};

export default App;