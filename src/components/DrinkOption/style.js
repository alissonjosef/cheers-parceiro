import styled from 'styled-components/native';


export const OptionCard = styled.View`
    flex-direction:row; 
    justify-content:space-between;  
    padding:5%;
    width:100%; 
`;

OptionCard.cardLeft = styled.View`
    flex-direction:row;   
`;

OptionCard.card = styled.View`
   flex:${props => props.flexSize || 1};
   justify-content:center;
   align-itens:center; 
`;

OptionCard.cardRight = styled.View`
   align-itens:flex-end;
   padding-vertical:2%;
`;

OptionCard.text = styled.Text`
    color: #fff;
    font-size:${props => props.size || '15px'}; 
    font-family:Quicksand-Medium; 
`;