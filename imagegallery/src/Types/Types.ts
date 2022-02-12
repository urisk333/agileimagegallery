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
  description: number,
  userId: number
}

export type Comment = {
  id: number,
  content: string,
  imageId: number
}
