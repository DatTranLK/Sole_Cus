import Link from 'next/link';
import { some } from 'lodash';
import { useSelector } from 'react-redux';
// import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import { ProductTypeList } from 'types';

const ProductItem = ({imgPath, id, name, price }: ProductTypeList) => {
  // const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, productId => productId === id);

  // const toggleFav = () => {
  //   dispatch(toggleFavProduct(
  //     { 
  //       id,
  //     }
  //   ))
  // }

  return (
    <div className="product-item">
      <div className="product__image" style={{borderRadius: '30px'}}>
        <button type="button" /*onClick={toggleFav}*/ className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/${id}`}>
          <a>
            <img style={{ borderRadius:'30px'}} src={imgPath} alt="product" />
            {/* {discount && 
              <span className="product__discount">{discount}%</span>
            } */}
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
        <div className='product__price product__price--discount' >
          <h4>${ price }</h4>

            <span style={{textDecoration: 'line-through'}}>${ price }</span>
        </div>
      </div>
    </div>
  )
};


export default ProductItem