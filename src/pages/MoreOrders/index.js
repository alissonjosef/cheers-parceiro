import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {Divider} from 'react-native-paper';
import {BackgroundImage, emptyList} from '../../global/style';
import LikedDrink from '../../components/LikedDrink';
import Loading from '../../components/Loading';
import api from '../../services/api';

import {Container, AddDrink} from './style';

import {Data} from '../../Util/BaseData';

const MoreOrders = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [drinkMost, setDrinkMost] = useState([]);

  useEffect(() => {
    getMost();
  }, []);

  async function getMost() {
    api
      .get('/drinkMostRequest')
      .then(res => {
        if (res.status == 200) {
          setDrinkMost(res.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        true;
      });
  }

  return isLoading ? (
    <BackgroundImage>
      <Loading />
    </BackgroundImage>
  ) : (
    <BackgroundImage>
      <Divider style={{backgroundColor: '#fff'}} />
      <AddDrink>
        <AddDrink.title>Os Drinks mais pedidos</AddDrink.title>
      </AddDrink>
      <Container>
        <SafeAreaView style={{width: '100%', marginBottom: 50}}>
          <FlatList
            style={{height:'100%'}}
            data={drinkMost}
            renderItem={item => <LikedDrink top {...props} item={item.item} />}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getMost} />
            }
            ListEmptyComponent={() => (
              <Text style={emptyList.text}>
                Você ainda não tem nenhum pedido!
              </Text>
            )}
          />
        </SafeAreaView>
      </Container>
    </BackgroundImage>
  );
};
export default MoreOrders;
