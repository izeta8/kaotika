import { ShopCategories } from "@/pages/shop/buy/[shopType]";
import Link from "next/link"; 
 
interface ShopHeaderProps { 
  onCartClick: React.MouseEventHandler<HTMLButtonElement>,
  currentCategory: ShopCategories | undefined,
  setCurrentCategory: Function,
  cartItemCount: number,
  isMagicalStuffShop: boolean 
}

// Shops item categories
const equipmentCategories = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories = ["ingredients", "containers"];

const ShopHeader: React.FC<ShopHeaderProps> = ({ onCartClick, currentCategory, setCurrentCategory, cartItemCount, isMagicalStuffShop  }) => {

  if (!currentCategory) {return}

  return (
    <header className='w-full h-full relative py-4 z-30 flex-col flex justify-center items-center'>
      <div className="container mx-auto flex items-center justify-between">

        {/* Return Button Section */}
        <div className="flex items-center">
          <Link href={'/shop/shopHome'}>
            <span className='text-4xl mx-6 hover:underline hover:cursor-pointer text-medievalSepia'> &lt; Return</span>
          </Link>
        </div>

        {/* Category Buttons Section */}
        <nav className="flex-1 text-center">
          {
            !isMagicalStuffShop  
              ?
              equipmentCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
              :
              magicalStuffCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
          }
        </nav>

        {/* Cart Button Section */}
        <div className="flex items-center">
          <button
            onClick={onCartClick}
            className="relative px-8 py-6 rounded-full transition transform hover:scale-105 focus:outline-none"
          >
            <img
              src="/images/shop/buy/Cart.png" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " 
              draggable={false} 
            />
             {/* Badge */}
             {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-0 inline-flex items-center justify-center w-7 h-7 text-4xl leading-none text-medievalSepia  transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

      </div>

      <img className="w-full px-12" src="/images/shop/buy/header_separator.png" />

    </header>
  );
}

// -----  LINKS (CATEGORIES)  ----- //

interface HeaderLinkProps {
  category: string,
  currentCategory: string,
  setCurrentCategory: Function, 
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ category, currentCategory, setCurrentCategory }) => {

  const label = category.toUpperCase();

  // Check if the tab is the current category.
  const isSelected = currentCategory === category;

  // Set the styles tabs.
  const commonStyles = "text-3xl mx-6 font-medium text-white hover:cursor-pointer transition-all duration-200";
  const selectedTabStyle = `${commonStyles} underline text-medievalSepia`;
  const unselectedTabStyle = `${commonStyles} hover:underline hover:text-medievalSepia`;

  return (
    <span onClick={() => setCurrentCategory(category)} className={isSelected ? selectedTabStyle : unselectedTabStyle}>{label}</span>
  )
}  

export default ShopHeader;