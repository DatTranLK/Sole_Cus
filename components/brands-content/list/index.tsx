import React, {useState, useEffect} from 'react';
import StoresLoading from './loading/index.js';
import BrandItem from './../../brand-item/index';
import { BrandTypeList } from 'types/index.js';

const BrandsContent = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr('/api/brands', fetcher);

  const [data, setData] = useState<BrandTypeList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://soleauthenticity.azurewebsites.net/api/brands/cus/pagination?page=1&pageSize=10');
      const resData = await res.json();

      setData(resData.data);
      setLoading(false);
    }

    fetchData();
  }, [])
  return (
    <>
      {loading && 
        <StoresLoading />
      }

      {data &&
        <section className="products-list">
          {data.map((item: BrandTypeList)  => (
            <BrandItem
              id={item.id} 
              name={item.name}
              key={item.id}
              avatar={item.avatar}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default BrandsContent