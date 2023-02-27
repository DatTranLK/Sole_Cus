import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import { CheckTypeList } from 'types';

const CheckItem = ({ status, images, id, name}: CheckTypeList) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, productId => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id,
      }
    ))
  }

  return (
    <div className="product-item">
      <div className="product__image" style={{borderRadius: '30px'}}>
        <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/check/${id}`}>
          <a>
            <img style={{ borderRadius:'30px'}} src={images ? images[0] : ''} alt="product" />
            {status && 
              <span style={{ backgroundColor: status === 'Authentic' ?  'limeGreen' : status === "Replica" ? 'red' : status === 'Unable To Verify' ? 'gray' : ''}} className="product__discount">{status}</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
      </div>
    </div>
  )
};


export default CheckItem