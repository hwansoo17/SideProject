import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const RegisterCard: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <Text>RegisterCard</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flex: 0.1,
    textAlign: 'center',
    // backgroundColor: '#0d0d0d',
    justifyContent: 'space-between',
  },
  leftIcon: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
  Text: {
    color: '#fff',
  },
});

export default RegisterCard;
