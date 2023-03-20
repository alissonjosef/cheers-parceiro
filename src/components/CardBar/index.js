import React from 'react';
import {Text, View} from 'react-native';
import { Card } from 'react-native-paper';
import {CardTitle}  from './style';

import Drink from '../../assets/img/drink.jpg';

const CardBar = () => (
    <View style={{width:150,height:'70%',margin:5,borderRadius:40}}>
     <Card style={{height:'50%'}}>
        <Card.Cover source={Drink}/>
        <CardTitle style={{color:'#fff'}}>Mojito</CardTitle>
     </Card>
    </View>    

);

export default CardBar;