import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from './../utils/form';
import * as auth from './../utils/auth';

const Login = ({ handleLogin, setEmail }) => {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const [buttonText, setButtonText] = useState('Войти');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText('Загрузка...');

    const { email, password } = values;

    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          resetForm();
          handleLogin(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText('Войти');
        resetForm();
      });
  };

  return (
    <div className='login'>
      <h2 className='login__title'>Вход</h2>
      <form className='login__form' onSubmit={handleSubmit} >
        <div className='login__inputs-container'>
          <input
            name='email'
            type='email'
            className={`login__input ${errors?.email ? 'login__input_state_error' : ''}`}
            placeholder="Email"
            value={values?.email || ''}
            onChange={handleChange} 
            minLength={3}
            required />
          <span className="login__input-error">
            {errors?.email && errors.email}
          </span>
          <input
            name='password'
            type='password'
            className={`login__input ${errors?.password ? 'login__input_state_error' : ''}`}
            placeholder='Пароль'
            value={values?.password || ''}
            onChange={handleChange} 
            minLength={3}
            required />
          <span className="login__input-error">
            {errors?.password && errors.password}
          </span>
        </div>
        <button
          type='submit'
          className={`login__button ${!isValid ? 'login__button_disabled' : ''}`}
          disabled={!isValid} >
          {buttonText}
        </button>
      </form>
    </div>
  )
};

export default Login;