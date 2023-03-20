import {View, Text} from 'react-native';
import React from 'react';
import {OptionCard} from './style';

import {Divider} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Option({
  top = false,
  fun = () => true,
  icon = false,
  title = '',
}) {
  return (
    <>
      {top && <Divider style={{backgroundColor: '#F4F4F2'}} />}
      <OptionCard onPress={fun}>
        <OptionCard.cardLeft>
          {icon}
          <OptionCard.card>
            <OptionCard.text>{title}</OptionCard.text>
          </OptionCard.card>
        </OptionCard.cardLeft>
        <OptionCard.cardRight>
          <Ionicons
            name="chevron-forward-outline"
            color={'#40E0D0'}
            size={25}
          />
        </OptionCard.cardRight>
      </OptionCard>
      <Divider style={{backgroundColor: '#F4F4F2'}} />
    </>
  );
}
