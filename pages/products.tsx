import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import Download from './../components/download-banner/index';

const Products = () => (
  <Layout>
    <Breadcrumb />
    <section className="products-page" style={{marginTop: '100px'}}>
    <Download />
      <div className="container" style={{marginTop: '50px'}}>
        <ProductsFilter />
        <ProductsContent />
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default Products
  