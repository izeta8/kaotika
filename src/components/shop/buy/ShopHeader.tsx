import { ShopCategories } from "@/pages/shop/buy/[shopType]";
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
  const commonStyles = "text-3xl mx-6 font-medium hover:cursor-pointer transition-all duration-200";
  const selectedTabStyle = `${commonStyles} underline text-medievalSepia`;
  const unselectedTabStyle = `${commonStyles} hover:underline text-white hover:text-medievalSepia`;

  return (
    <span onClick={() => setCurrentCategory(category)} className={isSelected ? selectedTabStyle : unselectedTabStyle}>{label}</span>
  )
}  

export default ShopHeader;