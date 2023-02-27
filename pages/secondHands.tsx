import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Storecrumb from '../components/storecrumb/index';
import Download from '../components/download-banner/index';
import SecondHandContent from './../components/secondHand-content/index';

const SecondHands = () => (
  <Layout>
    <Storecrumb />
    <section className="products-page" style={{marginTop: '100px'}}>
    <Download />
      <div className="container" style={{marginTop: '50px'}}>
        <SecondHandContent />
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default SecondHands
  