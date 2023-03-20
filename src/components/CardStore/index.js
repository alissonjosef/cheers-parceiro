import React, {Component} from 'react';
import {TouchableOpacity,ImageBackground,View,Text} from 'react-native'; 
import {BarBox} from './style';
import Background from '../../assets/img/man.jpg';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CardBox({navigation,value = false}) {
      
        return (
            <View opacity={0.8} style={{height:150,margin:3}}>
                <TouchableOpacity  style={{flex:1}} onPress={() => {navigation.navigate('BarInformation')}} >
                    <ImageBackground source={Background} style={{flex:1,justifyContent:'flex-end'}} >
                            <BarBox>
                                <View style={{flex:2}}>
                                    <BarBox.Text>Bar do Seu Francisco</BarBox.Text>
                                    <BarBox.SubText>Rua Joaquim Antunes, 248 - Pinheiros</BarBox.SubText>
                                </View>
                                {value?.favor &&
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="heart" size={20} color="#FF0099"/>
                                </View>}
                            </BarBox>
                    </ImageBackground> 
                </TouchableOpacity>
     
            </View>          
               
        )
    
}
