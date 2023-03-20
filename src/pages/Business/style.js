import styled from 'styled-components/native';

import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex:1;
  width:90%;
`;

Container.scrool = styled.View`
  flex:2;
  justify-content:center;
  align-items:center;
  margin-top:2%;
  margin-bottom:2%;
`;

Container.button = styled.View`
  justify-content:center;
  align-items:center;
  margin-bottom: ${hp('9%')}px;
`;



export const styles = StyleSheet.create({
    container: { flex: 1, height: hp('70%')},
    inputBox: {
      height: hp('10%'), // 70% of height device screen
      width: wp('90%')   // 80% of width device screen
    },
    myText: {
      fontSize: hp('5%') // End result looks like the provided UI mockup
    }
});