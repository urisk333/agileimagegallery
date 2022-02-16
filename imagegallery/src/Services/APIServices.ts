import { User, Image, Comment } from '../Types/Types';

const BASE_URL = 'http://localhost:3001';

function fetchRequest<T> (path: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASE_URL}${path}`, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.log('Error: ', err));
}

function getUsers (): Promise<User[]> {
  return fetchRequest('/users');
}

function addImage (image: Image): Promise<Image> {
  return fetchRequest('/images', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...image})
  });
}

function getImages (): Promise<Image[]> {
  return fetchRequest('/images');
}

function getOneImage (id: number): Promise<Image> {
  return fetchRequest(`/images/${id}`)
}

function addComment (comment: Comment): Promise<Comment> {
  return fetchRequest('/comments', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...comment})
  });
}

function getComments (): Promise<Comment[]> {
  return fetchRequest('/comments');
}

function updateComment (id: number, update: Comment): Promise<Comment> {
  return fetchRequest(`/comments/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
}

function deleteComment (id: number): Promise<void> {
  return fetchRequest(`/comments/${id}`, {
    method: 'DELETE'
  });
}

const APIService = {
  getUsers,
  addImage,
  getImages,
  getOneImage,
  addComment,
  getComments,
  updateComment,
  deleteComment
}

export default APIService;
