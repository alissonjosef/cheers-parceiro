import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HelperText, Divider } from 'react-native-paper';

import LogoCheers from '../../components/LogoCheers/';
import { BackgroundImageCheers } from '../../global/style';
import { Container, ContentForgotPassword, ContentButtonForgotPassword, ContentTitle } from './style';

import api from '../../services/api';
import Loading from '../../components/Loading';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const { registeredNow } = props.route.params ?? { registeredNow: false }
  const [errorMessage, setErrorMessage] = useState(
    'Não foi possivel se comunicar com o servidor!',
  );
  const [emailErrorMessage, setEmailErrorMessage] = useState('Email inválido');
  const [passwordErrorMessage, setPasswordErrorMessage] =
    useState('Senha Inválida!');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setColor] = useState({
    color: '#fff',
  });
  const navigation = useNavigation()

  const validation = () => {
    setError(false);
    setEmailError(false);
    setPasswordError(false);

    if (email == '' || password == '') {
      if (email == '') {
        setEmailError(true);
      }
      if (password == '') {
        setPasswordError(true);
      }
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
      return false;
    }

    return true;
  };

  const login = async () => {
    let isOkLogin = validation();
    if (isOkLogin) {
      setIsLoading(true);
      api
        .post('/signin', { email: email, password: password })
        .then(res => {
          AsyncStorage.setItem('userData', JSON.stringify(res.data));

          api.defaults.headers.common.Authorization = `bearer ${res.data.token}`;
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                  params: {
                    isLogin: true,
                    userData: res.data,
                  },
                },
              ],
            }),
          );
        })
        .catch(error => {
          setIsLoading(false);
          if (error.response) {
            if (error.response.status == 400) {
              setEmailError(true);
              setEmailErrorMessage('Usuário/Email não encontrado!');
            }
            if (error.response.status == 401) {
              setPasswordError(true);
              setPasswordErrorMessage('Senha Incorreta!');
            }
          }
          if (!error.response && error.toString().includes('Network Error')) {
            setError(true);
          }
        });
    }
  };

  const handlerRecoverPassword = () => {
    navigation.navigate('RecuperarSenha')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <BackgroundImageCheers>
        <LogoCheers
          title={
            registeredNow
              ? 'Cadastro realizado com sucesso!'
              : 'Bem-vindo de volta :)'
          }
          subtitle={'Acesse sua conta para continuar'}
        />
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
        {isLoading && <Loading />}
        {!isLoading && (
          <Container>
            <Container.card>
              <TextInput
                activeOutlineColor={'#FF0099'}
                autoCapitalize={'none'}
                outlineColor={'#FF0099'}
                mode={'outlined'}
                placeholder="Usuário ou e-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{ backgroundColor: 'rgba(34,36,40,0.1)', fontSize: 12 }}
                theme={{ colors: { placeholder: style.color, text: style.color } }}
                error={emailError}
              />
              <HelperText type="error" visible={emailError}>
                {emailErrorMessage}
              </HelperText>
            </Container.card>
            <Container.card>
              <TextInput
                activeOutlineColor={'#FF0099'}
                outlineColor={'#FF0099'}
                mode={'outlined'}
                placeholder="Sua senha"
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
                style={{ backgroundColor: 'rgba(34,36,40,0.1)', fontSize: 12 }}
                theme={{ colors: { placeholder: style.color, text: style.color } }}
                error={passwordError}
              />
              <HelperText type="error" visible={passwordError}>
                {passwordErrorMessage}
              </HelperText>
            </Container.card>

            <ContentForgotPassword>
              <ContentButtonForgotPassword onPress={() => {
                    props.navigation.navigate('RecuperarSenha');
                  }}>
                <ContentTitle>Recuperar senha</ContentTitle>
              </ContentButtonForgotPassword>
            </ContentForgotPassword>

            <View style={{ flex: 1, marginBottom: hp('5%') }}>
              <View style={{ height: hp('9%') }}>
                <Button
                  mode="contained"
                  color="#FF0099"
                  style={{ padding: hp('1%') }}
                  labelStyle={{ fontSize: 15 }}
                  onPress={login}>
                  Entrar
                </Button>
              </View>
              <Divider style={{ backgroundColor: '#40E0D0' }} />

              <View style={{ height: hp('9%') }}>
                <Button
                  mode="contained"
                  color="#40E0D0"
                  style={{ padding: hp('1%') }}
                  labelStyle={{ fontSize: 15 }}
                  onPress={() => {
                    props.navigation.navigate('Voucher');
                  }}>
                  Criar conta
                </Button>
              </View>
            </View>
          </Container>
        )}
      </BackgroundImageCheers>
    </TouchableWithoutFeedback>
  );
};

export default Login;
