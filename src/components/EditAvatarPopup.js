import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = useState('Сохранить');

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setButtonText('Сохранить');
  }, [isOpen]);

  const submit = (data) => {
    setButtonText('Загрузка...');
    onUpdateAvatar(data);
    reset();
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      submit={submit}
      isValid={isValid} >
      <input
        type="url"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="avatar"
        id="avatar-input"
        placeholder="Введите ссылку на новый аватар:"
        {...register('avatar', {
          required: 'Поле не может быть пустым'
        })} />
      <span className="form__input-error">
        {errors?.avatar && errors.avatar.message || ''}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;