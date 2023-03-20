import styled from 'styled-components/native';

export const AddDrink = styled.View`
  justify-content:center;
  align-items:flex-start;
  width:90%;
  padding-bottom:5%; 
`;

AddDrink.title = styled.Text`
  font-family:Quicksand-Bold;
  font-size:15px; 
  color:#FFFFFF;  
`;

export const Container = styled.View`
  flex:1;
  width:90%;
`;

Container.scrool = styled.View`
  flex:2;
  justify-content:flex-end;
  align-items:flex-end;
  margin-top:2%;
  margin-bottom:2%;
`;

Container.button = styled.View`
  justify-content:center;
  align-items:center;
`;