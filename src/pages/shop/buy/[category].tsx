import { useRouter } from 'next/router'

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


const Header = () => {
  return (
    <header className="fixed w-full bg-black text-white shadow-md py-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center"> 
        </div>
        <div className="flex items-center">
          <button className="text-4xl px-3 py-6 ml-2 text-medievalSepia hover:text-darkSepia">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Shop;  