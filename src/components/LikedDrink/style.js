import styled from 'styled-components/native';


export const OptionCard = styled.View`
    flex-direction:row; 
    width:100%; 
    padding-top:7%;
    padding-bottom:7%;
`;

OptionCard.cardRight = styled.View`
    flex:1;
    justify-content:center;
    align-itens:center;  
`;

OptionCard.card = styled.View`
   flex:${props => props.flexSize || 1};
   justify-content:center;
   align-itens:center; 
`;

OptionCard.cardLeft = styled.View`
    flex:1;
    justify-content:flex-start;
    align-itens:flex-start; 
`;

OptionCard.text = styled.Text`
    color: #fff;
    font-size:${props => props.size || '15px'}; 
    font-family:Quicksand-Medium; 
    ${props => props.flexEnd ? 'text-align: right;' : '' }
`;