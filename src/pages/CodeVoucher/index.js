import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, Linking } from 'react-native';
import { BackgroundImageCheers } from '../../global/style';
import PerTextInput from '../../components/TextInput';
import LogoCheers from '../../components/LogoCheers';

import { Container, ContentFooter, ButtonGoBack, Title1, Title2 } from './style'
import { Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';


const CodeVoucher = ({ route }) => {
    const navigation = useNavigation()
    const [codigo, setCodigo] = useState('');
    const [withError, setWithError] = useState([]);
    const [error, setError] = useState(false)
    const [codigoError, setCodigoError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [codigoErrorMessage, setCodigoErrorMessage] = useState('Codigo inválido');
    const [errorMessage, setErrorMessage] = useState('Obrigátorio preencher o campo')

    const cleanState = () => {
        setCodigo('')
    }

    const voucherCheerr = 'cheersBrasil2023'

    const register = async () => {
        if (codigo === voucherCheerr) {
            setIsLoading(true)
            cleanState()
            navigation.navigate('Cadastro')
            setIsLoading(false)
        } else {
            setCodigoError(true);
            setCodigoErrorMessage('Codigo invalido!');
        }
    }

    const checkData = () => {
        Keyboard.dismiss()
        const errors = []
        setError(false)


        if (codigo.length === 0) {
            errors.push('codigo')
            setError(true)
            setErrorMessage('Codigo inválido')
        }
        if (codigo.length === 0) {
            setError(true)
            setErrorMessage('Obrigátorio preencher o campos')
        }



        setWithError(errors)

        if (errors.length == 0)
            return true
        return false

    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            {isLoading ?
                <BackgroundImageCheers><Loading /></BackgroundImageCheers> :
                <BackgroundImageCheers>
                    <LogoCheers
                        title={'Bem-vindo a Cheers'}
                        subtitle={'Digite o voucher para prosseguir o seu cadastro.'}
                    />
                    <HelperText type="error" visible={error}>
                        {errorMessage}
                    </HelperText>
                    <Container>
                        <Container.card >
                            <PerTextInput
                                error={withError.includes('Codigo')}
                                value={codigo} placeholder={'Codigo'} onChangeText={(codigo) => setCodigo(codigo)} />
                        </Container.card>
                        <HelperText type="error" visible={codigoError}>
                            {codigoErrorMessage}
                        </HelperText>

                        <Button onPress={register} mode="contained" color="#FF0099" style={{ padding: 5, marginTop: 17 }} labelStyle={{ fontSize: 15 }}>
                            Verificar Voucher
                        </Button>

                        <ContentFooter>
                            <ButtonGoBack onPress={() => Linking.openURL('mailto:comercial@cheersclube.com.br')}
                                title="comercial@cheersclube.com.br">
                                <Title1>Solicite o seu Voucher?</Title1>
                                <Title2>Click aqui</Title2>
                            </ButtonGoBack>
                        </ContentFooter>
                    </Container>
                </BackgroundImageCheers>}
        </TouchableWithoutFeedback>

    )

}

export default CodeVoucher;
