import { CartItem } from '@/_common/interfaces/CartItem';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

// ---- ITEM ROW ---- //

interface ItemRowProps {
  item: CartItem,
  isItemIngredient: boolean,
  decreaseItem: Function,
  increaseItem: Function,
  removeItem: Function
}

const ItemRow: React.FC<ItemRowProps> = ({item, isItemIngredient, decreaseItem, increaseItem, removeItem}) => {
  
  const {image, name, _id, value, qty} = item;

   if (value === undefined || value === null) { return null; }

  return (
    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={`https://kaotika.vercel.app${image}`}
          alt={item.name}
          draggable={false}
          className="w-16 h-16 object-cover rounded"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
          }}
        />

        <span className="text-3xl">{name}</span>
      </div>
      <div className="flex items-center space-x-10">
        <div className="flex items-center gap-6">
          {isItemIngredient ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => decreaseItem(_id)}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <span className="text-2xl">{qty}</span>
              <button
                onClick={() => increaseItem(_id)}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <span className="text-2xl"></span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{value * qty}</span>
          <img
            src="/images/icons/gold.png"
            draggable={false}
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => removeItem(_id)}
            className="text-yellow-600 hover:text-yellow-700"
            aria-label={`RemoveItem`} 
          >
            <FaTimes size={28} />
          </button>
        </div>
      </div>
    </div>
  )

}

export default ItemRow;