import './HomePage.css';
import APIServices from '../../Services/APIServices';
import ImageItem from 'Components/ImageItem/ImageItem';
import ReviewPage from 'Components/ReviewPage/ReviewPage';
import { Image, Comment } from '../../Types/Types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMessage, faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  images: Image[],
  comments: Comment[],
  setImages: (images: Image[]) => void
}

const initialImage = {
  id: 0,
  name: '',
  image: '',
  description: '',
  userId: 0
}

function HomePage ({ images, setImages, comments }: IProps) {

  const [imageName, setImageName] = useState('');
  const [searchImages, setSearchImages] = useState<Image[]>([]);
  const [isAddImageChecked, setIsAddImageChecked] = useState(false);
  const [isReviewChecked, setIsReviewChecked] = useState(false);
  const [isReviewBoxChecked, setIsReviewBoxChecked] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [newImage, setNewImage] = useState<Image>(initialImage);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
  };

  const searchImage = async () => {
    const filteredImages = await images.filter((image) => image.name.toLowerCase().includes(imageName.toLowerCase()));
    setSearchImages(filteredImages);
  };

  const handleAddImage = () => {
    setIsAddImageChecked(!isAddImageChecked);
  };

  async function addImage (newImage: Image): Promise<Image> {

    const imageURL = `https://source.unsplash.com/${image}`;
    setNewImage({
      id: 0,
      name: name,
      image: imageURL,
      description: description,
      userId: user.id
    });
    const addedImage = await APIServices.addImage(newImage);
    return addedImage;
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    await addImage(newImage);
    setName('');
    setImage('');
    setDescription('');
  }

  return (
    <div className='homepage-container'>
      <div className='image-list'>
        <h2>Image gallery</h2>
        <div className="search-input-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name..."
            value={imageName}
            onChange={(event) => {
              inputHandler(event)
              searchImage()
            }}
          />
          <FontAwesomeIcon className="fa-solid fa-magnifying-glass icon" icon={faMagnifyingGlass} />
        </div>
        {!isAddImageChecked ?
        <button className='add-image-button' onClick={handleAddImage}>Add image</button>
        :
        <div className='add-image-container'>
          <form className="image-add-form" onSubmit={handleSubmit}>
            <div className="add-image">
              <label className="add-image-label">Image:</label>
              <input
                className="add-image-input align"
                type="text"
                placeholder="Enter image file..."
                value={image}
                onChange={e => setImage(e.target.value)}>
              </input>
              <label className="add-image-label">Name:</label>
              <input
                className="add-image-input align"
                type="text"
                placeholder="Enter image name..."
                value={name}
                onChange={e => setName(e.target.value)}>
              </input>
              <label className="add-image-label">Description:</label>
              <textarea
                className="add-image-input textarea-align"
                placeholder="Enter image description..."
                value={description}
                onChange={e => setDescription(e.target.value)}>
              </textarea>
            </div>
            <div className="add-submit-button">
              {user.email && <button className="submit-button button-align" type="submit">Submit</button>}
              <button className="cancel-button button-align" type="submit" onClick={() => setIsAddImageChecked(false)}>Cancel</button>
            </div>
          </form>
        </div>}
        {user.email && imageName == '' ?
          (images.map(image => (
            <div className='image-list-item' key={image.id}>
              <div className='image-item-align'>
                <div className='image-picture-box'>
                  <img className='image-picture' src={image.image} alt={image.name} />
                </div>
                <p>{image.name}</p>
              </div>
              <button className='gallery-button' onClick={() => {
                navigate(`/images/${image.id}`);
                setIsReviewChecked(!isReviewChecked);
                <ImageItem />
              }}>Review</button>
            </div>
          )))
          :
          (searchImages.map(image => (
            <div className='image-list-item' key={image.id}>
              <div className='image-item-align'>
                <div className='image-picture-box'>
                  <img className='image-picture' src={image.image} alt={image.name} />
                </div>
                <p>{image.name}</p>
              </div>
              <button className='gallery-button' onClick={() => {
                navigate(`/images/${image.id}`);
                setIsReviewChecked(!isReviewChecked);
                <ImageItem />
              }}>Review</button>
            </div>
          )))}
      </div>
      <div className='review-item-container'>
        {!isReviewChecked && <ImageItem />}
        <div className='review-button-box'>
          {isReviewBoxChecked ? 
          <button className='review-button' onClick={() => setIsReviewBoxChecked(!isReviewBoxChecked)}>
            <FontAwesomeIcon className="fa-solid fa-message icon" icon={faMessage} />
          </button>
          :
          <button className='review-button' onClick={() => setIsReviewBoxChecked(!isReviewBoxChecked)}>
            <FontAwesomeIcon className="fa-solid fa-times icon" icon={faTimes} />
          </button>}
        </div>
        <div className='review-box-align'>
        {!isReviewBoxChecked && <ReviewPage images={images} />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
