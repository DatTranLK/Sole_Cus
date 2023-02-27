import React, {useState, useEffect} from 'react';
import StoresLoading from './loading/index.js';
import StoreItem from './../../store-item/index';
import { StoreTypeList } from 'types/index.js';


const StoresContent = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr('/api/stores', fetcher);

  const [data, setData] = useState<StoreTypeList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://soleauthenticity.azurewebsites.net/api/stores?page=1&pageSize=10');
      const resData = await res.json();

      setData(resData.data);
      setLoading(false);
    }

    fetchData();
  }, [])

  // if (error) return <div>Failed to load users</div>;
  return (
    <>
      {loading && 
        <StoresLoading />
      }

      {data &&
        <section className="products-list">
          {data.map((item)  => (
            <StoreItem 
              id={item.id} 
              name={item.name}
              address={item.address}
              key={item.id}
              avatar={item.avatar}
              // link={item.link}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default StoresContent