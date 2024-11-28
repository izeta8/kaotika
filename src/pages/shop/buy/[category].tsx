import Layout from "@/components/Layout";
import Link from 'next/link';
import { useRouter } from 'next/router'

const Shop = () => {

  const router = useRouter()
  console.log(router.query.category);

  return (
    <Layout>  
      <ShopHeader />
      <ShopContent />
      <Background />
    </Layout>
  );
};


const ShopHeader = () => {

  return (
    <header className='w-full h-full relative py-4 z-30 flex-col flex justify-center items-center'>
      <div className="container mx-auto flex items-center justify-between">

          <div className="flex items-center"> 
          <Link href={'/shop/shopHome'}>
            <span className='text-4xl mx-6 hover:underline hover:cursor-pointer text-amber-200'> &lt; Return</span>
          </Link>
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
          <span className='text-4xl mx-6 hover:underline hover:cursor-pointer'> Cart</span>
        </div>
        
      </div>
      <img className="w-full px-12" src="/images/shop/buy/header_separator.png" />

    </header>
  );
}

const HeaderLink: React.FC<{page: string}> = ({page}) => {
  
  const router = useRouter();
  const link = `/shop/buy/${page}`;
  const label = page.toUpperCase(); 

  const commonStyles = "text-3xl mx-6 font-medium text-white hover:cursor-pointer";
  const selectedTabStyle = `${commonStyles} underline text-amber-200`;
  const unselectedTabStyle = `${commonStyles} hover:underline hover:text-amber-200`;

  return (
    <Link href={link}>
      <span className={router.query.category == page ? selectedTabStyle : unselectedTabStyle}>{label}</span>
    </Link>
  )
}

const ShopContent = () => {
  return (
    <section className='w-full h-full relative z-30'>    

      <h1>SHOePe</h1>

    </section>
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

