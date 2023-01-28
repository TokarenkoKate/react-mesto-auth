import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as auth from './../utils/auth';

const Login = ({ handleLogin, setEmail }) => {
  const [buttonText, setButtonText] = useState('Войти');

  const navigate = useNavigate();

  const {
    register,
    formState: {
      errors, isValid, isDirty
    },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submit = (data) => {
    setButtonText('Загрузка...');

    const { email, password } = data;

    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          reset();
          handleLogin(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setButtonText('Войти'));
  };

  return (
    <div className='login'>
      <h2 className='login__title'>Вход</h2>
      <form className='login__form' onSubmit={handleSubmit(submit)} >
        <div className='login__inputs-container'>
          <input
            name='email'
            type='email'
            className={`login__input ${!isValid && isDirty ? 'login__input_state_error' : ''}`}
            placeholder="Email"
            {...register('email', {
              required: 'Поле не может быть пустым',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Пожалуйста, укажите email'
              }
            })}
            />
          <span className="login__input-error">
            {errors?.email && errors.email.message || ''}
          </span>
          <input
            name='password'
            type='password'
            className={`login__input ${!isValid && isDirty ? 'login__input_state_error' : ''}`}
            placeholder='Пароль'
            {...register('password', {
              required: 'Поле не может быть пустым',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа'
              }
            })}
          />
          <span className="login__input-error">
            {errors?.password && errors.password.message || ''}
          </span>
        </div>
        <button 
          type='submit' 
          className={`login__button ${!isValid && isDirty ? 'login__button_disabled' : ''}`}
          disabled={!isValid && isDirty} >
          {buttonText}
        </button>
      </form>
    </div>
  )
};

export default Login;