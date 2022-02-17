import './ImageItem.css';
import APIService from 'Services/APIServices';
import { Image } from '../../Types/Types';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const initialImage = {
  id: 0,
  name: '',
  image: '',
  description: '',
  userId: 0
}

function ImageItem () {

  const [image, setImage] = useState<Image>(initialImage);
  const { user } = useContext(UserContext);
  const params = useParams(); 
  const id = Number(params.id);

  useEffect(() => {
    (async () => {
      if (id) {
        const renderImage = await APIService.getOneImage(id);
        setImage(renderImage);
      }
    })();
  }, [id, image]);

  return (
    <div className='image-wrapper'>
      {user.email && (params.id != undefined) &&
      <div className='image-item-container'>
        <div className='image-item'>
          <div className='item-image-box'>
            <img className='item-image-picture' src={image.image} alt={image.name} />
          </div>
          <div className='item-image-description'>
            {image.description}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ImageItem;
