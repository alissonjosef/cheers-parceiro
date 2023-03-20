import React, {useState} from 'react';
import { View,ToastAndroid } from 'react-native';


//componentes
import { SwipeablePanel } from 'rn-swipeable-panel';
import ButtonContainer from '../../../../components/Button';
import { Button } from 'react-native-paper';
import {ContainerSwiper} from './style';


// api 
import api from '../../../../services/api'; 
import {getUserInfo} from '../../../../services/loginServices';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Swiper = ({logOut}) => {

    const [panelConfig] = useState({
        fullWidth: true,
        onlyLarge: true,
        showCloseButton: false,
        closeOnTouchOutside:true,
        style: {backgroundColor:'#790048',height:'40%'},
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    });

    const [isPanelActive,setIsPanelActive] = useState(false);

    const navigation = useNavigation(); 

    const closePanel = () => {
        setIsPanelActive(false)
    }

    const deleteUser = async () => {

        try {           
            const user = JSON.parse(await getUserInfo()); 

            if(user.id) {
                const res = await api.post(`/deletePartner`,{user_id:user.id});
                console.debug('res',res); 
                logOut(); 
            }
        

        } catch (error) {
            console.debug('error',error); 
            ToastAndroid.show("Tente Novamente Mais tarde!!", ToastAndroid.SHORT);
        } finally {
            closePanel();
        }
    }
    return (
        <>
            <View style={{flex:1}}>
                <Button  
                    color="#FF0099" 
                    style={{width:'50%',borderColor:"#FF0099"}} 
                    mode="outlined" 
                    labelStyle={{fontSize:hp('1.5%')}}
                    onPress={() => {setIsPanelActive(true)}}
                >
                    Deletar Conta
                </Button>
            </View>
           
            
            <SwipeablePanel {...panelConfig} isActive={isPanelActive}>
                <ContainerSwiper>
                    <ContainerSwiper.box>
                        <ContainerSwiper.card>
                                <ContainerSwiper.Text>
                                    Validar drink
                                </ContainerSwiper.Text>
                        </ContainerSwiper.card>
                        <ContainerSwiper.card>
                                <ContainerSwiper.Text size={'15px'}>
                                    Clique no botão abaixo para confirmar o cancelamento da sua canto!
                                </ContainerSwiper.Text>
                        </ContainerSwiper.card>

                        <ButtonContainer icon={false} title={'Ok'} press={deleteUser} />

                    </ContainerSwiper.box>
                </ContainerSwiper>
            </SwipeablePanel>
        </>    
    )
}

export default Swiper;
