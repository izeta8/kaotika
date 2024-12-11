
interface HeaderLinkProps {
  category: string,
  currentCategory: string,
  setCurrentCategory: Function, 
}

// Categories

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

export default HeaderLink;