import React, { useState } from 'react';
import { View , ImageBackground } from 'react-native'
import { Divider,Switch } from 'react-native-paper';
import api from '../../services/api';
import { BASE_URL } from '../../Util/Constants';
import { OptionCard } from './style'; 


const Option = ({data,top = false, title = ''})  =>  {
    const [isSwitchOn, setIsSwitchOn] = useState(data.item.active == 'S');

    async function onToggleSwitch(){
        setIsSwitchOn(!isSwitchOn)
        api.put('/toggleDrink',data.item)
        
    };
    
    return (
        <>
            {top && (<Divider style={{backgroundColor:'#F4F4F2'}}/>)}            
            <OptionCard>
                <OptionCard.card style={{marginRight:10}}>
                    <ImageBackground 
                        style={{flex:1}} 
                        imageStyle={{ borderRadius: 6}}
                        source={{uri: BASE_URL + data.item.imagemDrink}}
                    />                          
                </OptionCard.card>  
              
                <OptionCard.card flexSize={3}>
                    <OptionCard.text>
                        {data.item.nomeDrink}
                    </OptionCard.text>
                    <OptionCard.text size={'9px'}>
                        {data.item.ingredientes}
                    </OptionCard.text>
                </OptionCard.card>  
                <OptionCard.card> 
                    <View>
                        <Switch color={'#FF0099'} value={isSwitchOn} onValueChange={onToggleSwitch} />
                    </View>               
                </OptionCard.card>            
            </OptionCard>
            <Divider style={{backgroundColor:'#F4F4F2'}}/>
        </>    
    )
}

export default Option; 