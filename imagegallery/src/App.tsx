import NavBar from 'Components/NavBar/NavBar';
import LoginForm from 'Components/LoginForm/LoginForm';
import Dashboard from 'Components/Dashboard/Dashboard';
import HomePage from 'Components/HomePage/HomePage';
import APIService from 'Services/APIServices';
import { User, Image, LoginData } from 'Types/Types';
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
  const [user, setUser] = useState<User>(initialUser);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const users = await APIService.getUsers();
      const images = await APIService.getImages();
      setUsers(users);
      setImages(images);
    })();
  }, []);

  const userLogin = async (loginData: LoginData) => {
    await users.map(user => {
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
          <NavBar setError={setError} />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginForm userLogin={userLogin} error={error} setError={setError} />} />
            <Route path='/homepage' element={<HomePage images={images} setImages={setImages} users={users} />} />
            <Route path='/images/:id' element={<HomePage images={images} setImages={setImages} users={users} />} />
          </Routes>
      </UserContext.Provider>  
    </div>
  );
}

export default App;
