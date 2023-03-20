import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Button} from 'react-native-paper';
import {BackgroundImageCheers, ContainerForm} from '../../global/style';
import LogoCheers from '../../components/LogoCheers/';
import PerTextInput from '../../components/TextInput/';
import {success} from '../../Util/Commons';
import {ActivityIndicator, Colors} from 'react-native-paper';

import * as contact from '../../services/contact/';

function ContactUs(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearState = () => {
    setName('');
    setEmail('');
    setMensagem('');
  };

  const validationContact = () => {
    if (email == '' || email == '' || mensagem == '') {
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }

    return true;
  };

  const sendContact = () => {
    try {
      const validation = validationContact();
      setDisableButton(true);
      setLoading(true);

      if (validation) {
        let data = {
          name: name.toLowerCase().trim(),
          email: email.toLowerCase(),
          mensagem: mensagem.toLowerCase().trim(),
        };

        let response = contact.sendMensagem(data);

        response.then(res => {
          if (res.status == 200) {
            clearState();
            success('Reclamação cadastrada');
            setDisableButton(false);
            setLoading(false);
            return;
          }
        });
      }
      setLoading(false);
      setDisableButton(false);
    } catch (e) {
      setLoading(false);
      setDisableButton(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <BackgroundImageCheers>
        <LogoCheers title={'Obrigado por querer \n falar com a Cheers.'} />
        <ContainerForm>
          <ContainerForm.form>
            <PerTextInput
              value={name}
              placeholder={'Nome'}
              onChangeText={text => setName(text)}
            />

            <PerTextInput
              value={email}
              placeholder={'E-mail'}
              onChangeText={text => setEmail(text)}
            />

            <PerTextInput
              value={mensagem}
              placeholder={'Mensagem'}
              onChangeText={text => setMensagem(text)}
              multi={true}
            />

            <View style={{marginTop: 10, marginBottom: 500}}>
              <Button
                loading={loading}
                disabled={disableButton}
                onPress={sendContact}
                mode="contained"
                color="#FF0099"
                style={{padding: 5}}
                labelStyle={{fontSize: 15}}>
                Enviar mensagem
              </Button>
            </View>
          </ContainerForm.form>
        </ContainerForm>
      </BackgroundImageCheers>
    </TouchableWithoutFeedback>
  );
}

export default ContactUs;
