import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import HistoryOption from '../../components/HistoryCard';

import {BackgroundImage, emptyList, style} from '../../global/style';
import {Style} from './style';
import Icon from 'react-native-vector-icons/Ionicons';

import {FavorBar} from '../../Util/BaseData';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import {getUserInfo} from '../../services/loginServices';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { useIsFocused } from "@react-navigation/native";

const History = props => {
  const [daychosen, setDayChosen] = useState('');
  const [monthNumber, setMonthNumber] = useState(0);
  const Month = [
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
  const [drinkHistory, setDrinkHistory] = useState([]);
  const [amount, setAmount] = useState(0.0);

  const [monthFilter, setMonthFilter] = useState(new Date().getMonth());
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [countMonths, setCountMonths] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const isFocused = useIsFocused();

  const downMonth = newNumber => {
    if (countMonths == 0) {
      return;
    }

    if (newNumber < 0) {
      setMonthFilter(11);
      setYearFilter(yearFilter - 1);
    } else {
      setMonthFilter(monthFilter - 1);
      setCountMonths(countMonths - 1);
    }
  };

  const upMonth = newNumber => {
    if (countMonths == 12) {
      return;
    }

    if (newNumber > 11) {
      setMonthFilter(0);
      setYearFilter(yearFilter + 1);
    } else {
      setMonthFilter(monthFilter + 1);
      setCountMonths(countMonths + 1);
    }
  };

  const backDay = () => {
    downMonth(monthFilter - 1);
    setMonthNumber(monthFilter);
    setDayChosen(Month[monthFilter]);
  };

  const fowardDay = () => {
    upMonth(monthFilter + 1);
    setMonthNumber(monthFilter);
    setDayChosen(Month[monthFilter]);
  };

  useEffect(() => {
    setIsLoadingScreen(true);
    getHistory();
  }, [monthFilter, yearFilter,isFocused]);

  async function getHistory() {
    api
      .get(`/historyDrink?month=${monthFilter + 1}&year=${yearFilter}`)
      .then(res => {
        if (res.status == 200) {
          let amount = 0.0;
          res.data.map(item => {
            amount += item.value;
          });
          setDrinkHistory(res.data);
          setAmount(amount);
        }
        setIsLoading(false);
        setIsLoadingScreen(false);
      })
      .catch(error => {
        true;
      });
  }

  return isLoading ? (
    <Loading />
  ) : (
    <BackgroundImage>
      <View style={Style.container}>
        <View style={Style.date}>
          <Pressable onPress={backDay}>
            <Icon name="chevron-back-outline" size={20} color="#fff" />
          </Pressable>
          <View>
            <Text style={Style.textMonth}>
              {Month[monthFilter]} - {yearFilter}
            </Text>
          </View>
          <Pressable onPress={fowardDay}>
            <Icon name="chevron-forward-outline" size={20} color="#fff" />
          </Pressable>
        </View>
        {isLoadingScreen ? (
          <Loading />
        ) : (
          <>
            <View style={Style.cardValue}>
              <Text style={Style.textPriceTitle}>Total de Pedidos</Text>
              <Text style={Style.textPrice}>
                <NumberFormat
                  value={amount}
                  displayType="text"
                  prefix="R$ "
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={item => <Text>{item}</Text>}
                />
              </Text>
            </View>

            <View style={Style.textCard}>
              <Text style={Style.textHistory}>Histórico de consumo</Text>
            </View>

            <SafeAreaView style={{width: '90%', marginBottom: hp('40%')}}>
              <FlatList
                style={{height:'100%'}}
                data={drinkHistory}
                renderItem={item => (
                  <HistoryOption top {...props} item={item.item} />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                  <Text style={emptyList.text}>
                    Nenhum registro encontrado!
                  </Text>
                )}
                refreshing={isLoadingScreen}
                refreshControl={
                    <RefreshControl refreshing={isLoadingScreen} onRefresh={getHistory} />
                  }
              />
            </SafeAreaView>
          </>
        )}
      </View>
    </BackgroundImage>
  );
};
export default History;
