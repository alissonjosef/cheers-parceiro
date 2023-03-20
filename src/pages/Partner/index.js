import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,Alert} from 'react-native'
import { TextInput,Button, Snackbar, HelperText } from 'react-native-paper';

import {BackgroundImageCheers} from '../../global/style';
import {Container} from './style'

import LogoCheers from '../../components/LogoCheers/';
import SocialMedia from '../../components/SocialMedia/';
import PerTextInput from '../../components/TextInput/';
import AvatarUser from '../../components/UserAvatar/';

import api from  '../../services/api';
import {registerParner} from '../../services/partner/index';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Loading from '../../components/Loading';
import { CommonActions } from '@react-navigation/native';

const Partner = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConfirm,setPasswordConfirm] = useState('');
  const [name,setName] = useState('');
  const [businessName,setBusinessName] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const [withError,setWithError] = useState([]);
  const [error,setError] = useState(false)
  const [errorMessage,setErrorMessage] = useState('Obrigátorio preencher todos os campos')

  const cleanState = () => {
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
    setName('')
    setBusinessName('')
  }

  const register = async () => {

    if(checkData()){
      let data = {
        email:email.toLowerCase().trim(),
        password:password,
        nome:name,
        nome_negocio:businessName
      }
      setIsLoading(true)
      api.post('/signuppartner',data).then(res => {
          cleanState();
          props.navigation.dispatch(
            CommonActions.navigate({
                name:'Login',
                params: {
                  registeredNow:true,
                }
            }) )
        })
      .catch(error => {
        if(!error.response && error.toString().includes('Network Error')) {
          setError(true);
          return setErrorMessage("Erro ao se comunicar com o servidor!")
        }
        if(error.response.status == 303){
          setError(true);
          setErrorMessage("Esse email já está em uso!")
          setWithError(['email'])
        }
        return setIsLoading(false)
      }
      )
    }
  }

  const checkData = () => {
    Keyboard.dismiss()
    const errors = []
    setError(false)

    if (name.length === 0)
      errors.push('name')
    if (businessName.length === 0)
      errors.push('businessName')
    if ((password.length > 0 && password.length < 6 ) || passwordConfirm != password || password.length === 0)
      errors.push('password')




    if (passwordConfirm != password) {
      setError(true)
      setErrorMessage('Senhas não conferem.')
    }
    if (password.length > 0 && password.length < 6) {
      setError(true)
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.')
    }
    if(email.length === 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      errors.push('email')
      setError(true)
      setErrorMessage('Email inválido')
    }
    if (name.length === 0 || businessName.length === 0 || email.length === 0 || password.length === 0) {
      setError(true)
      setErrorMessage('Obrigátorio preencher todos os campos')
    }



    setWithError(errors)

    if(errors.length == 0)
      return true
    return false

}


  return (
      <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
      {isLoading?
      <BackgroundImageCheers><Loading/></BackgroundImageCheers>:
      <BackgroundImageCheers>

          <LogoCheers
            title={'Bem-vindo a Cheers'}
            subtitle={'Crie uma conta para continuar.'}
          />
          <HelperText type="error" visible={error}>
                {errorMessage}
          </HelperText>
          <Container>
              <Container.card>
                <Container.row>
                  <View style={{flex:1,paddingRight:10}}>
                    <PerTextInput
                    error={withError.includes('name')}
                    value={name} placeholder={'Seu nome'} onChangeText={(name) => {setName(name)}}/>
                  </View>
                  <View style={{flex:1}}>
                    <PerTextInput
                    error={withError.includes('businessName')}
                    value={businessName} placeholder={'Nome Negocio'} onChangeText={(business) => setBusinessName(business)}/>
                  </View>
                </Container.row>
              </Container.card>
              <Container.card>
                <PerTextInput
                error={withError.includes('email')}
                value={email} placeholder={'Seu e-mail'} onChangeText={(email) => setEmail(email)}/>
              </Container.card>
              <Container.card>
                <PerTextInput
                error={withError.includes('password')}
                value={password} secureTextEntry placeholder={'Digite sua senha'} onChangeText={(password)=> setPassword(password)}/>
              </Container.card>
              <Container.card>
                <PerTextInput
                error={withError.includes('password')}
                value={passwordConfirm} secureTextEntry placeholder={'Confirme sua senha'} onChangeText={(password)=> setPasswordConfirm(password)}/>
              </Container.card>

            <Button onPress={register} mode="contained" color="#FF0099" style={{padding:5}} labelStyle={{fontSize:15}}>
              Criar conta
            </Button>
          </Container>

      </BackgroundImageCheers>}
      </TouchableWithoutFeedback>

  )

}

export default Partner;
