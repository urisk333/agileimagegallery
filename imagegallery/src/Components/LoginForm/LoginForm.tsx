import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LoginData } from '../../Types/Types';

interface IProps {
  userLogin(loginData: LoginData): void,
  error: string
}

function LoginForm ({ userLogin, error }: IProps) {

  const [loginData, setLoginData] = useState<LoginData>({email: '', password: ''});
  const navigate = useNavigate();

  function handleSubmit (e: React.SyntheticEvent) {
    e.preventDefault(); 
    
    if ((loginData.email && loginData.password) == '') {
      return alert('Please fill in all fields.');
    } else if (!((loginData.email && loginData.password) == '')) {
      userLogin(loginData);
      setLoginData({email: '', password: ''});
    }
  }

  function handleCancel () {
    navigate("/");
  }

  function valid (item: string, validIcon: string, invalidIcon: string) {
    const text = document.querySelector(`#${item}`) as HTMLElement;
    text.style.opacity = "1";

    const v_icon = document.querySelector(`#${item} .${validIcon}`) as HTMLElement;
    v_icon.style.opacity = "1";

    const inv_icon = document.querySelector(`#${item} .${invalidIcon}`) as HTMLElement;
    inv_icon.style.opacity = "0";
  }

  function invalid (item: string, validIcon: string, invalidIcon: string) {
    const text = document.querySelector(`#${item}`) as HTMLElement;
    text.style.opacity = "0.5";

    const v_icon = document.querySelector(`#${item} .${validIcon}`) as HTMLElement;
    v_icon.style.opacity = "0";

    const inv_icon = document.querySelector(`#${item} .${invalidIcon}`) as HTMLElement;
    inv_icon.style.opacity = "1";
  }

  function handlePasswordChange (e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;

    if (password.match(/[A-Z]/) != null) {
      valid("capital", "fa-check", "fa-times");
    } else {
      invalid("capital", "fa-check", "fa-times");
    }

    if (password.match(/[0-9]/) != null) {
      valid("number", "fa-check", "fa-times");
    } else {
      invalid("number", "fa-check", "fa-times");
    }

    if (password.match(/[!@#$%&^?*]/) != null) {
      valid("special", "fa-check", "fa-times");
    } else {
      invalid("special", "fa-check", "fa-times");
    }

    if (password.length > 8) {
      valid("eight", "fa-check", "fa-times");
    } else {
      invalid("eight", "fa-check", "fa-times");
    }

    setLoginData({...loginData, password: e.target.value})
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-form-title">Log in</h2> 
        <div className="login-form-input">
          <label className="login-label">Email:</label>
          <input 
            className="login-input" 
            type="email" 
            placeholder="Enter email..."
            value={loginData.email}
            onChange={e => setLoginData({...loginData, email: e.target.value})}>
          </input>     
          <label className="login-label">Password:</label>
          <input 
            className="login-input" 
            type="password" 
            placeholder="Enter password..." 
            onChange={handlePasswordChange}>
          </input>
          {(error != "") ? <div className="error">{error}</div> : ""}
        </div> 
        <p id="capital">
          <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
          <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
          <span>Capital letter</span>
        </p>
        <p id="number">
          <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
          <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
          <span>Number</span>
        </p>
        <p id="special">
          <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
          <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
          <span>Special character</span>
        </p>
        <p id="eight">
          <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
          <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
          <span>8+ Characters</span>
        </p>
        <div className="login-form-button">
          <button className="login-button" type="submit" onClick={handleSubmit}>Log in</button>
          <button className="login-button" type="submit" onClick={() => handleCancel()}>Cancel</button>
        </div> 
      </form>
    </div>
  );
}

export default LoginForm;
