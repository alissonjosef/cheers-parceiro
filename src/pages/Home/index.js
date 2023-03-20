import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';
import {BackgroundImage, emptyList, TextPathen} from '../../global/style';
import TopMenu from '../../components/MenuTop';

import LikedDrink from '../../components/LikedDrink';
import HistoryOption from '../../components/HistoryCard';

import {Container, AddDrink} from './style';
import Loading from '../../components/Loading';
import {getUserInfo} from '../../services/loginServices';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import { isIOS } from '../../Util/Commons';

const Home = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMost, setIsLoadingMost] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [monthDrinks, setMonthDrinks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [moreOrders, setMoreOrders] = useState();
  const isFocused = useIsFocused();
  const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  function getThisMonth() {
    const today = new Date();
    return today.getMonth();
  }
  useEffect(() => {
    if (isFocused) {
      getMost();
      getHistory(getThisMonth());
    } else {
      setSelectedMonth(getThisMonth());
      loadHistory(getThisMonth());
      loadMost();
    }
  }, [props, isFocused]);
  async function getHistory(thisMonth) {
    if (!thisMonth) {
      return false;
    }
    const userData = JSON.parse(await getUserInfo());
    api
      .get('/historyDrink', {
        headers: {
          Authorization: `bearer ${userData.token} `,
        },
      })
      .then(res => {
        setIsLoading(true);
        const {status, data} = res;
        const tempDrinks = [];
        if (status == 200 && data != null) {
          if (data.length > 0) {
            data.forEach(drink => {
              const {date_solicitation} = drink;
              const thisDate = new Date(date_solicitation);
              if (thisDate.getMonth() == thisMonth) {
                tempDrinks.push(drink);
              }
            });
          }
        }
        setMonthDrinks(tempDrinks);
        setIsLoading(false);
        setIsLoadingHistory(false);
      })
      .catch(error => {
        true;
      });
  }
  async function getMost() {
    api
      .get('/drinkMostRequest')
      .then(res => {
        if (res.status == 200) {
          setMoreOrders(res.data);
        }
        setIsLoading(false);
        setIsLoadingMost(false);
      })
      .catch(error => {
        true;
      });
  }

  function loadMost() {
    setIsLoadingMost(true);
    getMost();
  }
  function loadHistory(month) {
    setIsLoadingHistory(true);
    getHistory(month);
  }

  return isLoading ? <Loading /> : <MainContainer />;

  function MainContainer() {
    return (
      <BackgroundImage top={ isIOS ? '3.5%' : '0%'} style={{paddingBottom: 50}}>
        <TopMenu />
        {isLoadingMost ? (
          <Loading />
        ) : (
          <Container>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextPathen>Mais pedidos</TextPathen>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('Mais pedidos');
                }}>
                <TextPathen color={'#FF0099'}>Ver mais</TextPathen>
              </Pressable>
            </View>
            <SafeAreaView style={{width: '100%', marginBottom: 20}}>
              <FlatList
                style={{height: '100%'}}
                data={moreOrders}
                renderItem={item => (
                  <LikedDrink top {...props} item={item.item} />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                  <Text style={emptyList.text}>
                    Nenhum registro encontrado!
                  </Text>
                )}
                refreshing={isLoadingMost}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoadingMost}
                    onRefresh={getMost}
                  />
                }
              />
            </SafeAreaView>
          </Container>
        )}
        {isLoadingHistory ? (
          <Loading />
        ) : (
          <Container style={{paddingBottom: 50}}>
            <View
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextPathen>Histórico de consumo</TextPathen>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('History');
                }}>
                <TextPathen color={'#FF0099'}>Ver mais</TextPathen>
              </Pressable>
            </View>
            <SafeAreaView style={{width: '100%'}}>
              <FlatList
                style={{height: '100%'}}
                data={monthDrinks}
                renderItem={item => <HistoryOption top {...item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                  <Text style={emptyList.text}>
                    Nenhum registro encontrado!
                  </Text>
                )}
                refreshing={isLoadingHistory}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoadingHistory}
                    onRefresh={() => getHistory(getThisMonth())}
                  />
                }
              />
            </SafeAreaView>
          </Container>
        )}
      </BackgroundImage>
    );
  }
};

export default Home;
