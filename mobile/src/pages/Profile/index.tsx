import React, {useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';

import {ScrollView, Alert} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

// const handleUpdateAvatar = useCallback(() => {
//   ImagePicker.showImagePicker(
//     {
//       title: 'Seleciona um avatar',
//       cancelButtonTitle: 'Cancelar',
//       takePhotoButtonTitle: 'Usar câmera',
//       chooseFromLibraryButtonTitle: 'Escolher da galeria',
//     },
//     (response) => {
//       if (response.didCancel) {
//         return;
//       }

//       if (response.error) {
//         Alert.alert('Erro ao escolher seu avatar');

//         return;
//       }

//       const source = {uri: response.uri};

//       console.log(source);
//     },
//   );
// }, []);

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const {user, updateUser} = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (value) => {
              return !!value;
            },
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (value) => !!value.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'Confirmação de senha incorreta',
            ),
        });

        await schemaValidation.validate(data, {abortEarly: false});

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('profile', formData);

        await updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso.');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log('erro de validacao');
          const formatedErrors = getValidationErrors(error);

          formRef.current?.setErrors(formatedErrors);

          return;
        }

        Alert.alert(
          'Erro atualizar perfl',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <UserAvatarButton onPress={() => {}}>
            <UserAvatar source={{uri: user.avatar_url}} />
          </UserAvatarButton>

          <Title>Meu perfil</Title>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{name: user.name, email: user.email}}>
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
              name="old_password"
              secureTextEntry
              textContentType="newPassword"
              icon="lock"
              containerStyle={{marginTop: 16}}
              placeholder="Senha atual"
            />

            <Input
              name="password"
              secureTextEntry
              textContentType="newPassword"
              icon="lock"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              secureTextEntry
              textContentType="newPassword"
              icon="lock"
              placeholder="Confirmar senha"
            />
          </Form>
          <Button
            style={{marginTop: 16}}
            onPress={() => formRef.current?.submitForm()}>
            Confirmar mudanças
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

export default Profile;
