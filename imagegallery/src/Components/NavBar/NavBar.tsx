import './NavBar.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/Context';
import { Link } from 'react-router-dom';

interface IProps {
  setError: (value: string) => void
}

function NavBar ({ setError }: IProps) {

  const { user, setUser } = useContext(UserContext);

  function logout () {
    setUser({
      id: 0,
      email: '', 
      password: '',
      image: ''
    });
    setError('');
  }

  return (
    <div className='navbar-container'>
      <div className="navbar-links">
        {user.email ?
        <div className='navbar-logout'>
          <img className='profile-image' src={user.image} alt='Profile picture' />
          <h3>
            <Link to="/" onClick={() => logout()}>Logout</Link>
          </h3>
        </div>
        :
        <h3>
          <Link to="/login">Login</Link>
        </h3>
        }
      </div>
    </div>
  );
}

export default NavBar;
