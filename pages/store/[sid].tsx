import Layout from '../../layouts/Main';
import Footer from '../../components/footer';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFilter from '../../components/products-filter';
import ProductsContent from '../../components/produtcs-stores-content';
import { useState, useEffect } from 'react';
import { ProductTypeList } from 'types';
import { useRouter } from 'next/router';

const Products = () => {
    const router = useRouter();
    const {sid} = router.query;
    const [data, setData] = useState<ProductTypeList[]>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://soleauthenticity.azurewebsites.net/api/products/store/${sid}?page=1&pageSize=10`);
            const resData = await res.json();

            setData(resData.data);
            // console.log("Store data: ", resData.data);
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
  