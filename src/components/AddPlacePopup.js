import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const [buttonText, setButtonText] = useState('Создать');

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setButtonText('Создать')
  }, [isOpen]);

  const submit = (data) => {
    setButtonText('Загрузка...');

    onAddNewPlace(data);
    reset();
  };

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      submit={submit}
      isValid={isValid} >
      <input
        type="text"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="name"
        id="place-name-input"
        placeholder="Название:"
        {...register('name', {
          required: 'Поле не может быть пустым',
          minLength: {
            value: 3,
            message: 'Минимум 3 символа',
          },
          maxLength: {
            value: 200,
            message: 'Максимум 200 символов'
          }
        })}
      />
      <span className="form__input-error">
        {errors?.name && errors.name.message || ''}
      </span>
      <input
        type="url"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="link"
        id="link-input"
        placeholder="Ссылка на изображение:"
        {...register('link', {
          required: 'Поле не может быть пустым',
          minLength: {
            value: 3,
            message: 'Минимум 3 символа'
          }
        })}
      />
      <span className="form__input-error">
        {errors?.link && errors.link.message || ''}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;