import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, deletedCard }) {
  const [buttonText, setButtonText] = useState('Да');

  useEffect(() => setButtonText('Да'));

  function submit(e) {
    e.preventDefault();
    setButtonText('Удаление...')
    onDeleteCard(deletedCard);
  }

  return (
    <PopupWithForm
      name='delete-card'
      title='Вы уверены?'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      submit={submit}
      isValid
    />
  )
}

export default DeleteCardPopup;