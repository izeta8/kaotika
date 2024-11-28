import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Link from 'next/link';
import React, { useEffect } from 'react';

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
    <header className='w-full h-full bg-orange-800 relative py-4 z-30 pt-32'>
      <div className="container mx-auto flex items-center justify-between">

        <div className="flex items-center"> 
          <span className='text-4xl mx-6 hover:underline hover:cursor-pointer'> &lt; Return</span>
        </div>

        <nav className="flex-1 text-center">  
          <HeaderLink page="helmets" />   
          <HeaderLink page="weapons" />   
          <HeaderLink page="armors" />   
          <HeaderLink page="shields" />   
          <HeaderLink page="boots" />   
          <HeaderLink page="rings" />   
        </nav>

        <div className="flex items-center">
          <h2>Cart</h2>
        </div>
        
      </div>
      
      <img src="url('/images/shop/buy/header_separator.png')" />

    </header>
  );
}

const HeaderLink: React.FC<{page: string}> = ({page}) => {
  
  const router = useRouter();
  const link = `/shop/buy/${page}`;
  const label = page.toUpperCase(); 

  const commonStyles = "text-3xl mx-6 font-medium text-white hover:cursor-pointer";
  const selectedTabStyle = `${commonStyles} underline`;
  const unselectedTabStyle = `${commonStyles} hover:underline`;

  return (
    <Link href={link}>
      <span className={router.query.category == page ? selectedTabStyle : unselectedTabStyle}>{label}</span>
    </Link>
  )
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
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
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
