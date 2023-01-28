import logo from './../images/logo.svg';
import { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

function Header({ email, handleLogin, setEmail }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  function signOut() {
    localStorage.removeItem('token');
    handleLogin(false);
    navigate('/signin', { replace: true });
    setEmail('');
  }

  return (
    <header className={`header ${menuOpen ? 'active' : ''}`}>
      <nav className='header__nav'>
        <Routes>
          <Route path='/signin' element={
            <>
              <a href="#" className="logo">
                <img src={logo} alt="Логотип" className="logo__image" />
              </a>
              <Link to='/signup' className='header__link'>Регистрация</Link>
            </>
          } />
          <Route path='/signup' element={
            <>
              <a href="#" className="logo">
                <img src={logo} alt="Логотип" className="logo__image" />
              </a>
              <Link to='/signin' className='header__link'>Войти</Link>
            </>
          } />
          <Route path='/' element={
            <div className='header__menu'>
              <div className='header__burger-wrapper'>
                <a href="#" className="logo">
                  <img src={logo} alt="Логотип" className="logo__image" />
                </a>
                <div className='burger' onClick={toggleMenu}>
                  <div className="burger__bar1"></div>
                  <div className="burger__bar2"></div>
                  <div className="burger__bar3"></div>
                </div>
              </div>
              <div className='header__link-wrapper'>
                <p className='header__email'>{email}</p>
                <button className='header__button' onClick={signOut}>Выйти</button>
              </div>
            </div>
          } />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;