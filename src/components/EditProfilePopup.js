import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';
import PopupWithForm from "./PopupWithForm";

const formConfig = {
  required: 'Поле не может быть пустым',
  minLength: {
    value: 3,
    message: 'Минимум 3 символа'
  },
  maxLength: {
    value: 200,
    message: 'Максимум 200 символов'
  }
};

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState('Сохранить');

  useEffect(() => {
    setButtonText('Сохранить');
  }, [isOpen]);

  const { 
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit} = useForm({ 
      mode: 'onChange',
      defaultValues: {
        name: currentUser.name,
        about: currentUser.about
      }
    });

  const submit = (data) => {
    setButtonText('Загрузка...');
    onUpdateUser(data);
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      submit={submit}
      isValid={isValid}
      isDirty={isDirty}>
      <input
        type="text"
        className={`form__input ${!isValid && isDirty ? 'form__input_state_error' : ''}`}
        name="name"
        id="name-input"
        placeholder="Введите имя:"
        defaultValue={currentUser.name}
        {...register('name', formConfig)}/>
      <span className='form__input-error'>
        {errors?.name?.message && errors?.name.message || ''}
      </span>
      <input
        type="text"
        className={`form__input ${!isValid && isDirty ? 'form__input_state_error' : ''}`}
        name="about"
        id="job-input"
        placeholder="Введите информацию о себе:"
        defaultValue={currentUser.about}
        {...register('about', formConfig)} />
      <span className="form__input-error">
        {errors?.about?.message && errors?.about.message || ''}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;