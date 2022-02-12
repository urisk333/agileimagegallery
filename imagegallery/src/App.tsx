import './App.css';
import NavBar from 'Components/NavBar/NavBar';
import LoginForm from 'Components/LoginForm/LoginForm';
import Dashboard from 'Components/Dashboard/Dashboard';
import APIService from 'Services/APIServices';
import { User, Image, Comment, LoginData } from 'Types/Types';
import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from 'Context/Context';

const initialUser = {
  id: 0,
  email: '',
  password: '',
  image: ''
};

function App () {

  const [users, setUsers] = useState<User[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User>(initialUser);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const users = await APIService.getUsers();
      const images = await APIService.getImages();
      const comments = await APIService.getComments();
      setUsers(users);
      setImages(images);
      setComments(comments);
    })();
  }, []);

  const userLogin = async (loginData: LoginData) => {
    await users?.map(user => {
      if (loginData.email === user.email && loginData.password === user.password) {
        setUser({...user});
        setError('');
        navigate('/homepage');
      } else {
        setError('Email or password is not correct!');
      }
    }); 
  }

  const providerUser = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <div className="app-container">
      <UserContext.Provider value={providerUser}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginForm userLogin={userLogin} error={error} />} />
          </Routes>
      </UserContext.Provider>  
    </div>
  );
}

export default App;
