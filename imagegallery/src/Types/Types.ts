export type User = {
  id: number,
  email: string,
  password: string,
  image: string
}

export type Image = {
  id: number,
  name: string,
  image: string,
  description: string,
  userId: number
}

export type Comment = {
  id: number,
  content: string,
  imageId: number
}

export type UserContextState = {
  user: User;
  setUser: (user: User) => void;
};

export type LoginData = {
  email: string,
  password: string,
}
