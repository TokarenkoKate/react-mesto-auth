import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as auth from '../utils/auth';

const Register = ({ handleInfoTooltipOpen, setRegisterSuccess }) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit
  } = useForm({ 
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [buttonText, setButtonText] = useState('Зарегистрироваться');

  const navigate = useNavigate();

  const submit = (data) => {        
    setButtonText('Загрузка...');

    const { email, password } = data;

    auth.register(email, password)
      .then((res) => {
        if (res) {
          navigate('/signin', { replace: true })
          setRegisterSuccess(true);
          handleInfoTooltipOpen(true);
        } else {
          setRegisterSuccess(false);
          handleInfoTooltipOpen(true);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setButtonText('Зарегистрироваться'));
  };

  return (
    <div className='register'>
      <h2 className='register__title'>Регистрация</h2>
      <form className='register__form' onSubmit={handleSubmit(submit)}>
        <div className='register__inputs-container'>
          <input
            name='email'
            type='email' 
            className={`register__input ${!isValid && isDirty ? 'register__input_state_error' : ''}`}
            placeholder="Email"
            {...register('email', {
              required: 'Поле не может быть пустым',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Пожалуйста, укажите email'
              }})
            }/>
          <span className="register__input-error">
            {errors?.email ? errors.email.message : ''}
          </span>
          <input
            name='password'
            type='password'
            className={`register__input ${!isValid && isDirty ? 'register__input_state_error' : ''}`}
            placeholder='Пароль'
            {...register('password', {
              required: 'Поле не может быть пустым',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа'
              }
            })}/>
          <span className="register__input-error">
            {errors?.password ? errors.password.message : ''}
          </span>
        </div>
        <button 
          type='submit' 
          className={`register__button ${!isValid && isDirty ? 'register__button_disabled' : ''}`}
          disabled={!isValid && isDirty} >
          {buttonText}
        </button>
      </form>
      <div className='register__signin'>
        <p>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__login-link'>Войти</Link>
      </div>
    </div>
  )
};

export default Register;