import { useRouter } from 'next/router'
import Header from '../../../components/Header'

const Shop = () => {

  const router = useRouter()
  console.log(router.query.category);
  
  return (
    <>
      <Header />
      <ShopHeader />
      <ShopContent />
      <Background />
    </>
  );
};

const ShopHeader = () => {
  return (
    <div className='w-full h-full bg-orange-800 relative py-4 z-30 pt-32'>
      <h1>Return</h1>
      
    </div>
  );
}

const ShopContent = () => {
  return (
    <main className='w-full h-full bg-red-300 relative z-30'>    

      <h1>SHOePe</h1>

    </main>
  );
}

const Background = () => {
  
  return (
    <>
    <img 
        className='w-full h-full absolute top-0 opacity-20 z-20'
        style={{
          backgroundColor: '#191A1D',
          backgroundImage: "url('/images/shop/background_pattern.png')",
          backgroundRepeat: "repeat", // or "repeat", etc.
          backgroundPosition: "center", // or other positions
          WebkitBackgroundSize: '8%',
        }}
        />

      <div
        className='w-full h-full absolute top-0 z-10'
        style={{
          backgroundColor: '#191A1D',
        }}
        >
      </div>
    </>
  );

}


export default Shop;  