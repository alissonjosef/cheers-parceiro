import {View, Text, Image} from 'react-native';
import React from 'react';

import {LogoContainer} from './style';
import logo from '../../assets/img/logo-partner.png';

const LogoCheers = ({title, subtitle}) => {
  return (
    <LogoContainer>
      <LogoContainer.card>
        <Image source={logo} style={{width: 190, height: 150}} />
      </LogoContainer.card>
      <LogoContainer.title>{title}</LogoContainer.title>
      <LogoContainer.subtitle>{subtitle}</LogoContainer.subtitle>
    </LogoContainer>
  );
};

export default LogoCheers;
