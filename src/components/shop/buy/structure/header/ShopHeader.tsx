import { ShopCategories } from "@/pages/shop/buy/[shopType]";
import HeaderLink from "./HeaderLink";
import Link from "next/link"; 
 
interface ShopHeaderProps { 
  currentCategory: ShopCategories | undefined,
  setCurrentCategory: Function,
  isMagicalStuffShop: boolean,
}

// Shops item categories
const equipmentCategories = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories = ["ingredients", "containers"];

const ShopHeader: React.FC<ShopHeaderProps> = ({ currentCategory, setCurrentCategory, isMagicalStuffShop }) => {

  if (!currentCategory) {return}

  return (
    <header className='w-full h-full relative py-4 z-30 flex-col flex justify-center items-center'>
      <div className="container mx-auto flex items-center justify-between">

        {/* Return Button Section */}
        <div className="flex items-center min-w-52">
          <Link href={'/shop'}>
            <span className='text-4xl mx-6 hover:underline hover:cursor-pointer text-medievalSepia'> &lt; Return</span>
          </Link>
        </div>

        {/* Category Buttons Section */}
        <nav className="text-center">
          {
            !isMagicalStuffShop  
              ?
              equipmentCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
              :
              magicalStuffCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
          }
        </nav>

        {/* Need a div to have equally divided */}
        <div className="min-w-52"></div> 

      </div>

      <img className="w-full px-12" src="/images/shop/buy/header_separator.png" />

    </header>
  );
}


export default ShopHeader;