import React, { useState, useEffect } from 'react';
import './register.css';
import '../../reset.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Input from '../../components/Input'
import { Link } from 'react-router-dom';
import { history } from '../../history';
import 'firebase/firestore';

const Register = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [radioLocal, setRadioLocal] = useState('salao');
  const [errorType, setErrorType] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    console.log(radioLocal)
  }, [radioLocal])

  const registerFirebase = () => {

    setLoading(1)
    setErrorType(null)
    if (password !== confirmPassword) {
      setLoading(0)
      setErrorType('error')
      setErrorMessage('As senhas nos campos "Senha" e "Confirmar Senha" são diferentes!')

    }else if(name === undefined || email === undefined){

      setLoading(0)
      setErrorType('error')
      setErrorMessage('Insira um nome, email e senha para se cadastrar!')

    }else{
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(0)
          firebase
            .auth()
            .currentUser
            .updateProfile({ displayName: name })

          firebase
            .firestore()
            .collection('users')
            .get()
            .then((querySnapshot) => {
              const emailArray = [];
              querySnapshot.forEach((doc) => {
                emailArray.push(doc.data().email);
              })

              const booleanEmail = [];
              for (let value of emailArray) {
                booleanEmail.push(value === email);
              }

              const status = booleanEmail.indexOf(true);
              if (status === -1) {
                firebase.firestore().collection('users').doc().set({
                  uid: firebase.auth().currentUser.uid,
                  email: email,
                  name: name,
                  local: radioLocal
                })

                if (radioLocal === 'salao') {
                  history.push('/salon')
                } else if (radioLocal === 'cozinha') {
                  history.push('/kitchen')
                }

              }
            })
        }).catch(error => {
          setLoading(0)
          setErrorType('error')
          switch (error.message) {
            case 'Password should be at least 6 characters':
              setErrorMessage('A senha deve ter pelo menos 6 caracteres!');
              break;
            case 'The email address is already in use by another account.':
              setErrorMessage('Este email já está sendo utilizado por outro usuário!');
              break;
            case 'The email address is badly formatted.':
              setErrorMessage('Esse email é inválido!');
              break;
            default:
              setErrorMessage('Não foi possível cadastrar. Tente novamente mais tarde!');
              break;
          }
        })
    }
  }

  return (
    <div className='register-content d-flex flex-column'>
      <div className='form-register'>
        <form className='mx-auto text-center'>
          <h1 className='edit-text-color' id='register-title'>Cadastro</h1>
          <div className='for-border'>

            <Input onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome' />

            <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />

            <Input onChange={(e) => setPassword(e.target.value)} type='password' id='registration-password' placeholder='Senha' />

            <Input onChange={(e) => setConfirmPassword(e.target.value)} type='password' id='confirm-registration-password' placeholder='Confirmar Senha' />

            <p className='edit-text-color'>Selecione o setor de trabalho:</p>

            <label for='salao' className='edit-text-color'>
              <input onChange={(e) => setRadioLocal(e.target.value)} type='radio' id='radio-hall' className='mx-2' name='local' value='salao' defaultChecked />
                        &#127828; Salão </label>

            <label for='cozinha' className='edit-text-color'>
              <input onChange={(e) => setRadioLocal(e.target.value)} type='radio' id='radio-kitchen' className='mx-2' name='local' value='cozinha' />
                        &#128293; Cozinha</label>

            <br />
          </div>

          {errorType === 'error' && <div className='error-msg-register'><strong>Atenção!</strong> {errorMessage}</div>}

          {
            loading ? <div class="spinner-border text-warning spinner-register" role="status"><span class="sr-only">Loading...</span></div>
              : <button onClick={registerFirebase} className='btn btn-register-page edit-text-color' type='button'>Cadastrar</button>
          }

          <Link to='login'>
            <button className='btn btn-register-page edit-text-color' type='button'>Cancelar</button>
          </Link>

        </form>
      </div>
    </div>
  )
}
export default Register;