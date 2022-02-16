import './ReviewPage.css';
import APIService from 'Services/APIServices';
import { Image, Comment } from '../../Types/Types';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faLocationArrow, faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

interface IProps {
  images: Image[],
}

const initialComment = {
  id: 0,
  content: '',
  imageId: 0,
  userId: 0
}

function ReviewPage ({ images }: IProps) {

  const [newComment, setNewComment] = useState<string>(''); // Comment input
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentID, setCommentID] = useState<number>(0); // ID of a clicked comment
  const [updatedContent, setUpdatedContent] = useState<string>(''); // Updated comment input
  const [isCheckedOpen, setIsCheckedOpen] = useState<boolean>(false); // Handle open/close update input
  const [clickedComment, setClickedComment] = useState<Comment>(initialComment);
  const [imageID, setImageID] = useState<Image>(); // To get image ID
  const messagesEndRef = useRef(null); // Scroll to the bottom
  const params = useParams();
  const id = Number(params.id);
  const { user } = useContext(UserContext);
  const userID = user.id;
  
  useEffect(() => {
    (async () => {
      const comments = await APIService.getComments();
      setComments(comments);
    })();
  }, [clickedComment]);

  useEffect(() => {
    (async () => {
      if (images) {
          const imageForID = images?.find(item => item.id === id);
          setImageID(imageForID);
        }  
    })();
  }, []);

  async function addComment (): Promise<Comment> {
    const COMMENT = {
      id: 0,
      content: newComment,
      imageId: id,
      userId: userID
    };
    const newAddedComment = await APIService.addComment(COMMENT);
    setComments(prev => [...prev, {...newAddedComment}]);
    setNewComment('');
    scrollToBottom();
    return newAddedComment;
  }

  function handleComment (e: React.SyntheticEvent) {
    e.preventDefault();
    addComment();
  }

  async function deleteComment (id: number): Promise<void> {
    APIService.deleteComment(id);
    const filteredComments = comments.filter((comment) => comment.id !== id);
    setComments(filteredComments);
  }

  function handleDelete (id: number) {
    return deleteComment(id);
  }

  async function updateComment (): Promise<Comment> {
    const UPDATE = {
      id: commentID,
      content: updatedContent,
      imageId: imageID.id,
      userId: userID
    };
    const newUpdatedComment = await APIService.updateComment(commentID, UPDATE);
    setClickedComment({...newUpdatedComment});
    setNewComment('');
    return newUpdatedComment;
  }

  function handleUpdate () {
    updateComment();
    setIsCheckedOpen(!isCheckedOpen);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className='review-page-container'>
      {user.email && <div className='comment-main-box'>
      {images.map((image) => {
        if (id === image.id) {
          return (
            <div className='image-review-box' key={image.id}>
              <div className='image-review-name'>
                {image.name}
              </div>
              <div className='image-review-picture'>
                <img className='image-review-picture' src={image.image} alt={image.name} />
              </div>
            </div>
          )
        }
      })}
      {comments.map(comment => {
        return (
          <div className="comment-align" key={comment.id}>
            {id === comment.imageId && 
            <div className="comment">
              <div className={user.id === comment.userId ? "comment-box me" : "comment-box you"}>
                <div className='other-user-box'>
                  <img className='other-user-image' src={user.id != comment.userId ? user.image : null} alt={user.email} />
                </div>
                <div className='comment-item my-comment'>
                {comment.content}
                </div>
              </div>
              {!isCheckedOpen && comment.id === commentID ?
              <div className='update-box'>
                <input
                  className="update-input"
                  type="text"
                  placeholder="Update your comment..."
                  defaultValue={comment.content || ''}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  >
                </input>
                  <div className="update-box-button">
                    <button className="update-button" type="submit">
                      <FontAwesomeIcon className="fa-solid fa-check-double" icon={faCheckDouble} onClick={() => {
                        handleUpdate();
                      }} />
                    </button>
                  </div>
              </div> : null}
              <div className={user.id === comment.userId ? "comment-button-box mine" : "comment-button-box your"}>
                <div className='comment-button-align'>
                  <button className="comment-button-hover">
                    <FontAwesomeIcon className="fa-pen-to-square" icon={faPenToSquare} onClick={() => {
                      setCommentID(comment.id);
                      setIsCheckedOpen(!isCheckedOpen);
                    }} />
                  </button>
                  <button className="comment-button-hover">
                    <FontAwesomeIcon className="fa-times" icon={faTimes} onClick={() => {
                      handleDelete(comment.id);
                    }}/>
                  </button>
                </div>
              </div>
            </div>}
          </div>
        )
      })}
      <div ref={messagesEndRef} />
      </div>}
      <form className="comment-container">
        <input
          className="comment-input"
          type="text"
          placeholder="Leave comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-button" onClick={handleComment}>
          <FontAwesomeIcon className="fa-location-arrow" icon={faLocationArrow} />
        </button>
      </form>
    </div>
  )
}

export default ReviewPage;
