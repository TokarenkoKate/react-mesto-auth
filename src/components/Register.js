import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import { useFormWithValidation } from './../utils/form';

const Register = ({ handleInfoTooltipOpen, setRegisterSuccess }) => {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const [buttonText, setButtonText] = useState('Зарегистрироваться');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText('Загрузка...');

    const { email, password } = values;

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
      .finally(() => {
        setButtonText('Зарегистрироваться');
        resetForm();
      });
  };

  return (
    <div className='register'>
      <h2 className='register__title'>Регистрация</h2>
      <form className='register__form' onSubmit={handleSubmit}>
        <div className='register__inputs-container'>
          <input
            name='email'
            type='email'
            className={`register__input ${errors?.email ? 'register__input_state_error' : ''}`}
            placeholder="Email"
            value={values?.email || ''}
            onChange={handleChange}
            required
          />
          <span className="register__input-error">
            { errors?.email && errors.email }
          </span>
          <input
            name='password'
            type='password'
            className={`register__input ${errors?.email ? 'register__input_state_error' : ''}`}
            placeholder='Пароль'
            value={values?.password || ''}
            onChange={handleChange} 
            minLength={3}
            required />
          <span className="register__input-error">
            { errors?.password && errors.password }
          </span>
        </div>
        <button
          type='submit'
          className={`register__button ${!isValid ? 'register__button_disabled' : ''}`}
          disabled={!isValid} >
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