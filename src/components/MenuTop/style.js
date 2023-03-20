import styled from 'styled-components/native';

export const Menu = styled.View`
    width:100%;
    height:10%;
    padding-vertical:5%;
    padding-horizontal:5%;
`;

Menu.Row = styled.View`
    flex-direction:row; 
    
`;
Menu.RowLeft  = styled.View`
    flex:3; 
`;

Menu.RowRight  = styled.View`
    flex:1; 
    jusitfy-content:flex-end; 
    align-itens:center  
`;