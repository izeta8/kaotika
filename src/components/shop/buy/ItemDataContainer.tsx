
// Gold and Min Level data containers

interface ItemDataContainerProps {
  value: number|undefined,
  min_lvl: number|undefined
}

interface ItemDataLabelProps {  
  image: string,
  data: number,
  title: string 
}


const ItemDataContainer: React.FC<ItemDataContainerProps> = ({value, min_lvl}) => {
  
  const goldLevelGridStyle =  (!value || !min_lvl) ? 
                              `w-1/2 grid-cols-1` :
                              `w-full grid-cols-2`;


  return (

    <div className={`grid gap-3 place-items-center ${goldLevelGridStyle}`}>

      {value && (
        <ItemDataLabel data={value} image={"/images/icons/gold.png"} title='Value' />
      )}

      {min_lvl && (
        <ItemDataLabel data={min_lvl} image={"/images/icons/level.png"} title='Min. lvl' />
      )}

    </div>
  );
}

const ItemDataLabel: React.FC<ItemDataLabelProps> = ({ image, data, title }) => {

  if (!data) return null;

  const fontSize = data.toString().length >= 5 ? 'text-2xl' : 'text-3xl';

  return (

    <div
      className="w-5/6 border rounded border-medievalSepia p-2 bg-black/45 gap-2 flex"
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