import './HomePage.css';
import APIServices from '../../Services/APIServices';
import ImageItem from 'Components/ImageItem/ImageItem';
import ReviewPage from 'Components/ReviewPage/ReviewPage';
import { Image } from '../../Types/Types';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faMessage, faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  images: Image[],
  setImages: (images: Image[]) => void
}

const initialImage = {
  id: 0,
  name: '',
  image: '',
  description: '',
  userId: 0
}

function HomePage ({ images, setImages }: IProps) {

  const [imageName, setImageName] = useState('');
  const [searchImages, setSearchImages] = useState<Image[]>([]);
  const [isAddImageChecked, setIsAddImageChecked] = useState(false);
  const [isReviewChecked, setIsReviewChecked] = useState(false);
  const [isReviewBoxChecked, setIsReviewBoxChecked] = useState(false);
  const [name, setName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [description, setDescription] = useState('');
  const [clickedImage, setClickedImage] = useState<Image>(initialImage);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setImages(images)
  }, [images, isReviewChecked]);
  
  const searchImage = async (input: string, array: Image[]) => {
    const filteredImages = await array.filter((image) => image.name.toLowerCase().includes(input.toLowerCase()));
    setSearchImages(filteredImages);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
    searchImage(imageName, images);
  };

  const handleAddImage = () => {
    setIsAddImageChecked(!isAddImageChecked);
  };

  async function addImage (): Promise<Image> {
    const imageURL = `https://source.unsplash.com/${imageLink}`;
    const newImageObject = {
      id: 0,
      name: name,
      image: imageURL,
      description: description,
      userId: user.id
    };
    const addedImage = await APIServices.addImage(newImageObject);
    setImages([...images, {...addedImage}]);
    return addedImage;
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    addImage();
    setName('');
    setImageLink('');
    setDescription('');
  }

  function openSidebar () {
    const element = document.getElementById("image-list-visible");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  return (
    <div className='homepage-container'>
      <button className='menu-button' onClick={() => openSidebar()}>
        <FontAwesomeIcon className="fa-solid fa-bars" icon={faBars} />
      </button>
      <div className='image-list' id='image-list-visible'>
        <h2>Image gallery</h2>
        <div className="search-input-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name..."
            value={imageName}
            onChange={(event) => {
              inputHandler(event)
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
                maxLength={30}
                value={imageLink}
                onChange={e => setImageLink(e.target.value)}>
              </input>
              <label className="add-image-label">Name:</label>
              <input
                className="add-image-input align"
                type="text"
                placeholder="Enter image name... (max. 12 characters)"
                maxLength={12}
                value={name}
                onChange={e => setName(e.target.value)}>
              </input>
              <label className="add-image-label">Description:</label>
              <textarea
                className="add-image-input textarea-align"
                placeholder="Enter image description... (max. 50 characters)"
                maxLength={50}
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
                setClickedImage(image);
                <ImageItem isReviewChecked={isReviewChecked} />
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
                setClickedImage(image);
                <ImageItem isReviewChecked={isReviewChecked} />
              }}>Review</button>
            </div>
          )))}
      </div>
      {user.email && <div className='review-item-container'>
        {clickedImage && <ImageItem isReviewChecked={isReviewChecked} />}
        <div className='review-button-box'>
          {!isReviewBoxChecked ? 
          <button className='review-button' onClick={() => setIsReviewBoxChecked(!isReviewBoxChecked)}>
            <FontAwesomeIcon className="fa-solid fa-message icon" icon={faMessage} />
          </button>
          :
          <button className='review-button' onClick={() => setIsReviewBoxChecked(!isReviewBoxChecked)}>
            <FontAwesomeIcon className="fa-solid fa-times icon" icon={faTimes} />
          </button>}
        </div>
        <div className='review-box-align'>
        {isReviewBoxChecked && <ReviewPage images={images} />}
        </div>
      </div>}
    </div>
  );
}

export default HomePage;
