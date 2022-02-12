import { createContext } from 'react';
import { UserContextState, User } from 'Types/Types';

const context: UserContextState = {
    user: {
      id: 0,
      email: '',
      password: '',
      image: ''
    },
    setUser: (user: User) => [{}],
};

const UserContext = createContext(context);

export { UserContext };
