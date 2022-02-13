import './ReviewPage.css';
import { Image, Comment } from '../../Types/Types';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  images: Image[]
}

const initialComment = {
  id: 0,
  content: '',
  imageId: 0
}

function ReviewPage ({ images }: IProps) {

  const [newComment, setNewComment] = useState<string>('');
  const { user } = useContext(UserContext);

  return (
    <div className='review-page-container'>
      <form className="comment-container">
        <input
          className="comment-input"
          type="text"
          placeholder="Leave comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        < button className="comment-button">
          <FontAwesomeIcon className="fa-solid fa-location-arrow" icon={faLocationArrow} />
        </button>
      </form>
    </div>
  )
}

export default ReviewPage;
