import styled from 'styled-components/native'; 
import {StyleSheet} from 'react-native'; 

import Background from '../assets/img/Background.jpg';
import BackgroundCheers from '../assets/img/backgroundCheers.jpg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled.View`
    flex:1;
`;

export const ButtonAccept = styled.Pressable`
    justify-content:center; 
    align-items: center;
    background-color: ${props => props.color || '#00FEC5'}; 
    padding:3%; 
    border-radius:10px;
`; 

ButtonAccept.text =  styled.Text`
    font-family:Quicksand-Medium;
    font-size:15px;
    color: #170028;
`;
 
export const style = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center" ,
        alignItems:'center'
    }
   
})

export const TitleBar = styled.Text`
    font-family:Quicksand-Medium;
    font-size:${props => props.size || '25px'}; 
    color:${props => props.color || '#40E0D0'}; 
`; 


export const SubTitleBar   = styled.Text`
    font-family:Quicksand-Medium;
    font-size: 9px; 
    color:#FFFFFF;   
`;

export const BackgroundImage = styled.ImageBackground.attrs({
    source:Background
})`
    flex:1; 
    align-items:center;
    padding-top:${props => props.top || '15%'};
    background-color:#170028; 
`;
export const BackgroundImageLoginArea = styled.ImageBackground.attrs({
    source:Background
})`
    flex:1; 
    align-items:center;
    background-color:#170028; 
`;
export const BackgroundImageCheers = styled.ImageBackground.attrs({
    source:BackgroundCheers
})`
    flex:1; 
    align-items:center;
    background-color:#170028;
`;

export const ContainerForm = styled.View`
    flex:3; 
    width:100%; 
    align-items:center;
`

ContainerForm.form = styled.View`
    width:90%;
    padding-bottom:50%;
`

export const TextPathen = styled.Text`
    font-family:Quicksand-Medium;
    font-size:${props => props.size || '19px'}; 
    color:${props => props.color || '#fff'}; 
`; 

export const emptyList = StyleSheet.create({
    text:{
        marginTop:20,
        fontSize:hp('2%'),
        color:'#40E0D0', 
        fontFamily:'Quicksand-Medium',
        textAlign:'center',
    },
})