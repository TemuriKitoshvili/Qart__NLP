import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss';
// configs
import { auth, provider } from './configs/firebase';
import noty from './configs/noty';
// state
import { actionTypes } from './state/actionTypes';
import { useStateValue } from './state/stateProvider';
// Material UI
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Header() {
  const [{ user, projects }, dispatch] = useStateValue();
  const [sidebar, setSidebar] = useState(false);
  const [userAvatar, setUserAvatar] = useLocalStorage('userAvatar', null);
  console.log(userAvatar);

  const signIn = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch({
            type: actionTypes.SET_USER,
            payload: {
              user: null,
            },
          });
          setUserAvatar(null);
        })
        .catch((err) => noty(`დაფიქსირდა შეცდომა`, 'error'));
    } else {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          dispatch({
            type: actionTypes.SET_USER,
            payload: {
              user: res.user.displayName,
            },
          });
          setUserAvatar(res.user.photoURL);
          noty(
            `${res.user.displayName} მოგესალმებით ქართული ენის ციფრულ სამყაროში`,
            'info'
          );
        })
        .catch((err) => noty(`ავტორიზაციისას დაფიქსირდა შეცდომა`, 'error'));
    }
  };

  useEffect(() => {
    const localStorageStateData = {
      user,
      projects,
    };

    localStorage.setItem('stateData', JSON.stringify(localStorageStateData));
  }, [user, projects]);

  return (
    <header className='header'>
      <div className='header__logo'>
        <img src='' alt='' />
      </div>

      <div className='header__nav__burger'>
        <MenuIcon onClick={() => setSidebar(true)} />
      </div>

      <div className={sidebar ? 'header__nav active' : 'header__nav'}>
        {sidebar && (
          <div onClick={() => setSidebar(false)} className='close__nav__div' />
        )}
        <nav>
          <ul>
            <Link to='/' onClick={() => setSidebar(false)}>
              <li>მთავარი</li>
            </Link>
            <Link to='/test' onClick={() => setSidebar(false)}>
              <li>დოკუმენტაცია</li>
            </Link>
            <Link to='/' onClick={() => setSidebar(false)}>
              <li>ჩვენს შესახებ</li>
            </Link>
            {user && (
              <Link to='/dashboard' onClick={() => setSidebar(false)}>
                <li>კონსოლი</li>
              </Link>
            )}
            <li onClick={() => setSidebar(false)}>
              <Tooltip title={user ? 'Sign out' : 'Sign In With Google'}>
                <IconButton onClick={signIn}>
                  <Avatar alt='' src={userAvatar} />
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
