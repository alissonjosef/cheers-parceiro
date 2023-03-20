import React, { Component, useEffect ,useState} from 'react';
import { Text, View,ScrollView } from 'react-native';
import {BackgroundImageLoginArea} from '../../global/style'
import {
  Row,
  MenuLogo,
  Main,
  Title,
  OptionContariner
} from './style'; 

import { Button } from 'react-native-paper';

import AvatarUser from '../../components/UserAvatar/';
import Option from '../../components/OptionLogin/';
import Loading from '../../components/Loading/'

import Logo from '../../assets/svg/Vertical-Neon.svg'; 
import Dolar from '../../assets/svg/dolar.svg'; 
import Exit from '../../assets/svg/exit.svg'; 
import Fac from '../../assets/svg/fac.svg'; 
import Hand from '../../assets/svg/hand.svg'; 
import Heart from '../../assets/svg/heart.svg';

import Drink from '../../assets/svg/iconsTab/drink.svg';
import History from '../../assets/svg/iconsTab/history.svg';

import api from '../../services/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import { LogoutUser , getUserInfo } from '../../services/loginServices';

import Swiper from './components/Swiper'

const LoginArea = (props) => {

  const [userData,setUserData] = useState({})
  const [isLoading,setIsLoading] = useState(true)
  
  const logout = () => {
    try {
      delete api.defaults.headers.common['Authorization']
      LogoutUser()
      props.navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: 'UserLogin',
                },
            ],
        })
      )
    } catch (e) {
      console.log(e)
    }
    
  }

  const LoadingDataStorage = async () => {
    let data = await getUserInfo();
    console.log( `bearer ${data}`)
    setUserData(JSON.parse(data))
    setIsLoading(false);
  }

  useEffect(()=> {
    LoadingDataStorage();
  }, [props])


  function MainContainer (){
    return (<View >
        <MenuLogo>
         <AvatarUser userData={userData}/> 
        </MenuLogo>  
      <Main>
        <View style={{marginBottom:20,marginLeft:20}}>
          <Title style={{fontSize: 20}}>
            Um drink grátis por{'\n'} dia, todos os dias!
          </Title>
        </View>          
      </Main>
      <OptionContariner>
        <ScrollView>
          <Option 
          
            top
            icon={<Drink height={30} width={30} fill={'#40E0D0'} style={{marginRight: 5}}/>}
            title={'Meus Drinks'}
            fun={()=> {props.navigation.navigate('Drinks')}}
          />
          <Option 
            icon={<Dolar height={30} width={30} fill='#40e0d0' style={{marginRight: 3}}/>}
            title={'Históricos de Pedidos'}
            fun={()=> {props.navigation.push('Históricos de Pedidos')}}
          />
          <Option 
            icon={<Fac height={30} width={30} style={{marginRight: 3}}/>}
            title={' Ajuda'}
            fun={()=> {props.navigation.push('Ajuda')}}
          />
          <Option 
            icon={<Heart height={30} width={30} style={{marginRight: 5}}/>}
            title={'Meu Negócio'}
            fun={()=> {props.navigation.push('Meu Negócio')}}
          />
          <Option 
            top
            icon={<History height={30} width={30} fill={'#40E0D0'} style={{marginRight: 4}}/>}
            title={'Horário de Drinks'}
            fun={()=> {props.navigation.navigate('Horários Bar')}}
          />
          <Option 
            icon={<Exit height={30} width={30} style={{marginRight: 7}}/>}
            title={'Sair'}
            fun={logout}
          
          />
        </ScrollView>

        <View style={{
            flex:2,
            justifyContent:'flex-start',
            marginBottom:20, 
            alignItems:'center',
        }}>

          <Swiper 
            logOut={logout} 
          />
        </View>
        
      </OptionContariner>
    </View>)
  }

  return (
    <BackgroundImageLoginArea> 
      
       {isLoading?<Loading/>:<MainContainer/>}
    </BackgroundImageLoginArea>
    
  )
  
}

export default LoginArea;
