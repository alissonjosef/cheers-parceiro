import React from 'react';
import {Text, Image} from 'react-native';
import {Menu} from './style';
import {Divider} from 'react-native-paper';
import Logo from '../../assets/img/cheers-logo-partner.png';

import Ionicons from 'react-native-vector-icons/MaterialIcons';

export default function TopMenu() {
  return (
    <Menu>
      <Menu.Row>
        <Menu.RowLeft>
          <Image
            source={Logo}
            style={{width: 100, height: 50, resizeMode: 'contain'}}
          />
        </Menu.RowLeft>
        <Menu.RowRight>
          <Text style={{textAlign: 'right', paddingRight: 10}}>
            <Ionicons name="search" size={30} color="#40E0D0" />
          </Text>
        </Menu.RowRight>
      </Menu.Row>
    </Menu>
  );
}
