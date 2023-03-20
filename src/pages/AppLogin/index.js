import React, {Component, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppRedirect = props => {
  const loginOrHome = async () => {
    const userDataJson = await AsyncStorage.getItem('userData');

    let userData = null;
    try {
      userData = JSON.parse(userDataJson);
    } catch (e) {}

    if (userData && userData.token) {
      api.defaults.headers.common.Authorization = `bearer ${userData.token}`;
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: userData,
            },
          ],
        }),
      );
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'UserLogin',
            },
          ],
        }),
      );
    }
  };

  useEffect(() => {
    loginOrHome();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#170028',
  },
});

export default AppRedirect;
