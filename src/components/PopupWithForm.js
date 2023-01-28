import { useEffect, useCallback } from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, handleSubmit, submit, isValid, isDirty = true }) {
  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={handleSubmit ? handleSubmit(submit) : submit} className={`form form_type_${name}`} name={name}>
          {children}
          <button
            className={`form__submit-button ${!isValid && isDirty ? 'form__submit-button_disabled' : ''}`}
            type="submit"
            disabled={!isValid}>
            {buttonText}
          </button>
        </form>
        <button className="popup__close-button page__link-opacity" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;