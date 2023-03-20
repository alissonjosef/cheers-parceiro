// import 'react-native-gesture-handler';
import React, {lazy} from 'react';
import {Text,Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Telas
import LoginArea  from './pages/LoginArea';
import Help  from './pages/Help';
import Faq  from './pages/Faq';
import ContactUs  from './pages/ContactUs';
import Business  from './pages/Business';
import DrinkNew  from './pages/NewDrink';
import Drink  from './pages/MyDrink';
import MoreOrders  from './pages/MoreOrders';
import Home  from './pages/Home';
import Login  from './pages/Login';
import AppRedirect  from './pages/AppLogin';
import Partner from './pages/Partner';
import  History from './pages/History'


//componentes
import Back from '../src/components/BackMenuIcon/'

//estilos
import {styleNavigation} from './global/styleNavigation'

//icons 
import BarIcon from './assets/svg/iconsTab/bar.svg'; 
import DrinkIcon from './assets/svg/iconsTab/drink.svg'; 
import HistoryIcon from './assets/svg/iconsTab/history.svg'; 
import HomeIcon from './assets/svg/iconsTab/home.svg'; 
import RecoverPassword from './pages/RecoverPassword';
import CodeRecover from './pages/CodeRecover';
import Recover from './pages/Recover';
import CodeVoucher from './pages/CodeVoucher';
import DayHours from './pages/DayHours';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='MoreDrink'>

      <Stack.Screen 
       name="MoreDrink"
       component={Home}
       options={{
        headerShown:false,
        }}
      />
      <Stack.Group 
          screenOptions={({navigation})=>{
              return {  
                headerStyle: {
                  backgroundColor: 'transparent',
          
                },   
                headerTitleStyle:{
                  fontSize:hp('2.5%'),
                  fontFamily:'Quicksand-Bold'
                },                   
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTintColor:'#40E0D0',
                headerLeft: (props) => (
                  <Back {...navigation}/>
                )                               
              }}
            }
          >
            <Stack.Screen name="Mais pedidos" component={MoreOrders}/>
          </Stack.Group>
    </Stack.Navigator >
  )
}

const OptionsArea = () => {
  return (
    <Stack.Navigator initialRouteName='Options'>

      <Stack.Screen 
       name="Options"
       component={LoginArea}
       options={{
        headerShown:false,
        }}
      />
      <Stack.Group 
          screenOptions={({navigation})=>{
              return {  
                headerStyle: {
                  backgroundColor: 'transparent',
                                 
                },   
                headerTitleStyle:{
                  fontSize:hp('2.5%'),
                  fontFamily:'Quicksand-Bold'
                },                   
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTintColor:'#40E0D0',
                headerLeft: (props) => (
                  <Back {...navigation}/>
                )                               
              }}
            }
          >
            <Stack.Screen name="Ajuda" component={Help}/>
            <Stack.Screen name="Fale Conosco" component={ContactUs}/>
            <Stack.Screen name="Dúvidas frequentes" component={Faq}/>
            <Stack.Screen name="Meu Negócio" component={Business}/>
            <Stack.Screen name="Horários Bar" component={DayHours}/>
            <Stack.Screen name="Históricos de Pedidos" component={History}/>
          </Stack.Group>
    </Stack.Navigator >
  )

}


const MyDrink = () => {
  return (
    <Stack.Navigator initialRouteName='Drink'>
    <Stack.Group 
        screenOptions={({navigation})=>{
            return {  
              headerStyle: {
                backgroundColor: 'transparent'               
              },   
              headerTitleStyle:{
                fontSize:hp('2.5%'),
                fontFamily:'Quicksand-Bold'
              },                   
              headerTransparent: true,
              headerTitleAlign: 'center',
              headerTintColor:'#40E0D0',
              headerLeft: (props) => (
                <Back {...navigation}/>
                )                               
            }}
          }
        >
          <Stack.Screen name="Meus Drinks" component={Drink}/>       
          <Stack.Screen name="Adicionando um novo Drink" component={DrinkNew}/>  
        </Stack.Group>
    </Stack.Navigator > 
  )
}

const Tabs = () => { 
   return (
    <Tab.Navigator 
      initialRouteName='LoginArea'
      screenOptions={styleNavigation}      
      >  
        <Tab.Screen  name="LoginArea" component={OptionsArea}
          options={{
            headerShown:false,
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <BarIcon height={30} width={30} fill={color} />
            ),
          }}
        />     
        <Tab.Screen name="Drinks" component={MyDrink}
          options={({navigation})=>{
            return {
              tabBarLabel: '',
              headerShown:false,
              tabBarIcon: ({color}) => (
                <DrinkIcon height={30} width={30} fill={color}/>
              ),
            } 
            
          }}
        />   
        <Tab.Screen  name="History" component={History}
       
          options={({navigation})=>{
            return {
              headerTransparent: true,
              tabBarLabel: '',
              headerTitleAlign: 'center',
              headerTintColor:'#40E0D0',
              headerTitle:'Histórico de Pedidos',
              headerLeft: (props) => (
                <Back {...navigation}/>
              ),
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <HistoryIcon height={30} width={30} fill={color}/>
              ),
            }
          }}
        />   
        
        <Tab.Screen name="TabHome" component={HomeStack}
        options={{
          headerShown:false,
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <HomeIcon height={30} width={30} fill={color}/>         
          ),
        }}        
        />   
  
      </Tab.Navigator>
   )
}


const UserLogin = () => { 
  return (
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}/>
        <Stack.Screen name="RecuperarSenha" component={RecoverPassword} options={{headerShown:false}}/>
        <Stack.Screen name="CodigoRecuperacao" component={CodeRecover} options={{headerShown:false}}/>
        <Stack.Screen name="Recuperar" component={Recover} options={{headerShown:false}}/>
        <Stack.Screen name="Cadastro" component={Partner}  options={{headerShown:false}}/>
        <Stack.Screen name="Voucher" component={CodeVoucher}  options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}


export default function Router() {
  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='LoginOrHome'>
        <Stack.Screen name="UserLogin" component={UserLogin}  options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Tabs}  options={{headerShown:false}} />
        <Stack.Screen name="LoginOrHome" component={AppRedirect}  options={{headerShown:false}} /> 
        </Stack.Navigator>
    </NavigationContainer>
  );
}