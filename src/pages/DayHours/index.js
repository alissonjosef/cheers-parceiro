import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, RefreshControl, View } from 'react-native';
import { HelperText, Divider, Switch } from 'react-native-paper';
import { BackgroundImage, emptyList } from '../../global/style';
import Option from '../../components/DrinkOption';

import { Container, AddDrink } from './style';

import api from '../../services/api';

import { useIsFocused } from '@react-navigation/native';
import { getUserInfo } from '../../services/loginServices';
import Loading from '../../components/Loading';
import PerTextInput from '../../components/TextInput';
import { useForm, Controller, appendErrors } from "react-hook-form";
import ButtonContainer from '../../components/Button';

const DayHours = props => {

    const { handleSubmit, control, reset, setValue } = useForm();

    const [drinkData, setDrinkData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dayBar, setDayBar] = useState([]);
    const [resDaysBar, setResDayBar] = useState([]);


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [withError, setWithError] = useState([]);

    const isFocused = useIsFocused();

    const updatePartern = async (data) => {
        const DaysBar = JSON.stringify((data))

        setError(false);
        const errors = [];
        setWithError(errors);
        setIsLoading(true)
        try {

            await api.post('/daysBar', data)
                .then(res => {
                    setSuccess(true)
                    setIsLoading(false)
                })
                .catch(err => {


                    setIsLoading(false)
                })

        } catch (e) {
            errors.push(e.response.data.message);
            setWithError(errors);
            setError(true)
            setErrorMessage('ERRO ao se comunicar com o servidor.')
            setWithError(['server'])

        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        api.get('/getdaysBar')
            .then(res => {
                setResDayBar(res.data)
            })

    }, [])

    useEffect(() => {
        updatePartern()
    }, [props, isFocused]);

    return (
        <BackgroundImage>
            <Divider style={{ backgroundColor: '#fff' }} />
            <AddDrink>
                <AddDrink.title>Adicione os Horários</AddDrink.title>
            </AddDrink>
            {isLoading ? (
                <Loading />
            ) : (
                <Container>
                    <View style={{ marginBottom: 20 }}>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Controller
                                    control={control}
                                    name="sunday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 10 }}>Domingo</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='sunday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='sunday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Controller
                                    control={control}
                                    name="monday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 10 }}>Segunda</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='monday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='monday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Controller
                                    control={control}
                                    name="tuesday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 30 }}>Terça</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='tuesday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='tuesday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>

                                <Controller
                                    control={control}
                                    name="wednesday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 23 }}>Quarta</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='wednesday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='wednesday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>

                                <Controller
                                    control={control}
                                    name="thursday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 25 }}>Quinta</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='thursday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='thursday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Controller
                                    control={control}
                                    name="friday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 30 }}>Sexta</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='friday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='friday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Controller
                                    control={control}
                                    name="saturday_active"
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', marginRight: 20 }}>Sábado</Text>
                                            <Switch value={value} onValueChange={onChange} />
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                                    <Controller
                                        name='saturday_from'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Início'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: 100 }}>
                                    <Controller
                                        name='saturday_to'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <PerTextInput
                                                maxLength={2}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={'Hora Final'}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        {error ? (
                            <HelperText type="error" visible={error}>
                                {withError.includes('save')
                                    ? 'Erro ao salvar Drink'
                                    : 'Necessário preencher todos os campos!'}
                            </HelperText>
                        ) : success ? (
                            <HelperText
                                type="error"
                                style={{ color: 'green' }}
                                visible={success}>
                                Horários inserido com sucesso!
                            </HelperText>
                        ) : (
                            <></>
                        )}
                    </View>
                    <Container.button >
                        <ButtonContainer press={handleSubmit(updatePartern)} fullSize={'100%'} title={'Salvar'} />
                    </Container.button >
                </Container>
            )}
        </BackgroundImage>
    );
};

export default DayHours;
