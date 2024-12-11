
interface ItemDataLabelProps {  
  image: string,
  data: number,
  title: string,
  hasEnoughMoney?: boolean,
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
          className="select-none rounded-full w-6 flex-shrink-0"
          src={image}
          alt="Item"
          draggable={false}
        />
      )}
      <p className={`select-text flex-grow ${fontSize} leading-4 text-center text-white/90 select-none`}>
        {data}
      </p>
    </div>
  );
};

export default ItemDataLabel;
