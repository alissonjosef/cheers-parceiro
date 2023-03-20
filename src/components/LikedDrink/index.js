import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Divider, Switch, Card} from 'react-native-paper';

import Drink from '../../assets/img/drink.jpg';
import {OptionCard} from './style';
import {BASE_URL} from '../../Util/Constants';

const Option = ({top = false, title = '', item = []}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <>
      {top && <Divider style={{backgroundColor: '#F4F4F2'}} />}
      <OptionCard>
        <OptionCard.cardLeft style={{marginRight: 20}}>
          <View style={{flex: 1}}>
            <ImageBackground
              style={{flex: 1}}
              imageStyle={{borderRadius: 6}}
              source={{uri: BASE_URL + item.imagemDrink}}
            />
          </View>
        </OptionCard.cardLeft>

        <OptionCard.card flexSize={3}>
          <OptionCard.text>{item.nomeDrink}</OptionCard.text>
          <OptionCard.text size={'9px'}>{item.ingredientes}</OptionCard.text>
        </OptionCard.card>
        <OptionCard.cardRight>
          <OptionCard.text flexEnd size={'15px'}>{item.quantity}</OptionCard.text>
        </OptionCard.cardRight>
      </OptionCard>
      <Divider style={{backgroundColor: '#F4F4F2'}} />
    </>
  );
};

export default Option;
