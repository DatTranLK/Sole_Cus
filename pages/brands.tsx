import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Storecrumb from '../components/storecrumb/index';
import BrandsContent from './../components/brands-content/index';
import Download from './../components/download-banner/index';

const Stores = () => (
  <Layout>
    <Storecrumb />
    <section className="products-page" style={{marginTop: '100px'}}>
    <Download />
      <div className="container" style={{marginTop: '50px'}}>
        <BrandsContent />
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default Stores
  