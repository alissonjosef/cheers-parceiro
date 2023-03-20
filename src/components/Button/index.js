import * as React from 'react';
import {Button} from 'react-native-paper';

const ButtonContainer = ({
  fullSize = '50%',
  icon = false,
  title,
  press = () => {
    true;
  },
}) => {
  return (
    <Button
      icon={icon}
      color="#FF0099"
      mode="contained"
      labelStyle={{fontSize: 10}}
      onPress={press}
      style={{width: fullSize, marginBottom: 10}}>
      {title}
    </Button>
  );
};

export default ButtonContainer;
