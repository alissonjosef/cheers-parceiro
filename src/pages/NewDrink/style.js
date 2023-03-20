import styled from 'styled-components/native';

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  width: 90%;
  padding-bottom: 15%;
`;

Container.scrool = styled.View`
  flex: 2;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 2%;
  margin-bottom: 2%;
`;

Container.button = styled.View`
  justify-content: center;
  align-items: center;
`;

export const styles = StyleSheet.create({
  container: {flex: 2},
  inputBox: {
    height: hp('10%'), // 70% of height device screen
    width: wp('90%'), // 80% of width device screen
    marginBottom: 50
  },
  nameBox: {
    marginRight: wp('5%'),
    height: hp('10%'), // 70% of height device screen
    width: wp('52.5%'), // 80% of width device screen
  },
  valueBox: {
    height: hp('10%'), // 70% of height device screen
    width: wp('32.5%'), // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%'), // End result looks like the provided UI mockup
  },
  containerInput: {
    flexDirection: 'row',
  },
});

export const stylesCheckBox = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
