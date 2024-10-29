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
    backgroundColor: '#282828',
  },
  header: {
    flex: 0.1,
    textAlign: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  leftIcon: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
});

export default RegisterCard;
