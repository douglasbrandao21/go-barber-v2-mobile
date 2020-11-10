import React, {useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {Container, Title, BackToSignIn, BackToSignInText} from './styles';

import logo from '../../assets/logo.png';
import {Image, ScrollView, Alert} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string()
            .required()
            .min(6, 'Sua senha deve conter ao menos 6 digitos'),
        });

        await schemaValidation.validate(data, {abortEarly: false});

        await api.post('users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer login no GoBarber',
        );

        navigation.navigate('SignIn');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formatedErrors = getValidationErrors(error);

          formRef.current?.setErrors(formatedErrors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer seu cadastro, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
          <Image source={logo} />
          <Title>Crie sua conta</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              autoCapitalize="words"
              icon="user"
              placeholder="Nome"
            />
            <Input
              name="email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              icon="mail"
              placeholder="E-mail"
            />

            <Input
              name="password"
              secureTextEntry
              textContentType="newPassword"
              icon="lock"
              placeholder="Senha"
            />
          </Form>
          <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
        </Container>

        <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="#FFF" />
          <BackToSignInText>Criar uma conta</BackToSignInText>
        </BackToSignIn>
      </ScrollView>
    </>
  );
};

export default SignIn;
