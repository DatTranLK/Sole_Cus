import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import Layout from '../../layouts/Main';
import Footer from '../../components/footer';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFilter from '../../components/products-filter';
import ProductsContent from '../../components/products-brands-content';
import { ProductTypeList } from 'types';

const Products = () => {
    const router = useRouter();
    const {bid} = router.query;
    const [data, setData] = useState<ProductTypeList[]>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://soleauthenticity.azurewebsites.net/api/products/brand/${bid}?page=1&pageSize=10`);
            const resData = await res.json();

            setData(resData.data);
            console.log("Brand data: ", resData.data);
        }

        fetchData();
    }, [])
    return(
    <Layout>
        <Breadcrumb />
        <section className="products-page">
        <div className="container">
            <ProductsFilter />
            <ProductsContent data={data} />
        </div>
        </section>
        <Footer />
    </Layout>
    );
}
    
export default Products