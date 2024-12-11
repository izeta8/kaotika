import ItemDataLabel from "./ItemDataLabel"

// Gold and Min Level data containers

interface ItemDataContainerProps {
  value: number|undefined,
  min_lvl: number|undefined,
  hasEnoughMoney?: boolean,
}

const ItemDataContainer: React.FC<ItemDataContainerProps> = ({value, min_lvl, hasEnoughMoney}) => {
  
  const goldLevelGridStyle =  (!value || !min_lvl) ? 
                              `w-1/2 grid-cols-1` :
                              `w-full grid-cols-2`;

  return (

    <div className={`grid gap-3 place-items-center ${goldLevelGridStyle}`}>

      {value && (
        <ItemDataLabel data={value} image={"/images/icons/gold.png"} title='Value' hasEnoughMoney={hasEnoughMoney} />
      )}

      {min_lvl && (
        <ItemDataLabel data={min_lvl} image={"/images/icons/level.png"} title='Min. lvl' />
      )}

    </div>
  );
}

export default ItemDataContainer;