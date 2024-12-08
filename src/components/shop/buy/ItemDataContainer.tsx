
// Gold and Min Level data containers

interface ItemDataContainerProps {
  value: number|undefined,
  min_lvl: number|undefined,
  hasEnoughMoney: boolean,
}

interface ItemDataLabelProps {  
  image: string,
  data: number,
  title: string,
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

const ItemDataLabel: React.FC<ItemDataLabelProps> = ({ image, data, title, hasEnoughMoney }) => {

  if (!data) return null;

  const fontSize = data.toString().length >= 5 ? 'text-2xl' : 'text-3xl';

  const backgroundColor = 
    hasEnoughMoney === undefined 
    ? 'bg-black/45'
    : hasEnoughMoney === true 
    ? 'bg-green-950/45'
    : 'bg-red-950/45'

  return (

    <div
      className={`w-5/6 border rounded border-medievalSepia p-2 ${backgroundColor} gap-2 flex`}
      title={title}
    >
      {image && (
        <img
          className="rounded-full w-6 flex-shrink-0"
          src={image}
          alt="Item"
          draggable={false}
        />
      )}
      <p className={`flex-grow ${fontSize} leading-4 text-center text-white/90 select-none`}>
        {data}
      </p>
    </div>
  );
};

export default ItemDataContainer;