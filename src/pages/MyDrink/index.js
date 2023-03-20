import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {BackgroundImage, emptyList} from '../../global/style';
import Option from '../../components/DrinkOption';

import {Container, AddDrink} from './style';

import api from '../../services/api';

import {useIsFocused} from '@react-navigation/native';
import {getUserInfo} from '../../services/loginServices';
import Loading from '../../components/Loading';

const Drink = props => {
  const [drinkData, setDrinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  async function requestDrink() {
    const userData = JSON.parse(await getUserInfo());

    if (userData != null) {
      api.get('/getDrink?id=' + userData.id).then(res => {
        setDrinkData(res.data);
        setIsLoading(false);
      });
    }
  }
  useEffect(() => {
    requestDrink();
  }, [props, isFocused]);

  return (
    <BackgroundImage>
      <Divider style={{backgroundColor: '#fff'}} />
      <AddDrink
        onPress={() => {
          props.navigation.push('Adicionando um novo Drink', {title: 'teste'});
        }}>
        <AddDrink.title>Adicionar um novo Drink</AddDrink.title>
      </AddDrink>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <SafeAreaView style={{width: '100%', marginBottom: 100}}>
            <FlatList
              style={{height: '100%'}}
              data={drinkData}
              renderItem={data => <Option data={data} top />}
              keyExtractor={item => item.id}
              refreshing={isLoading}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={requestDrink}
                />
              }
              ListEmptyComponent={() => (
                <Text style={emptyList.text}>
                  Você ainda não adicionou nenhum drink!
                </Text>
              )}
            />
          </SafeAreaView>
        </Container>
      )}
    </BackgroundImage>
  );
};

export default Drink;
