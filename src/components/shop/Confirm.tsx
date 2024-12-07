import React from 'react';

const Confirm = ({ isOpen, onCancel, onConfirm, product }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
            <div
                className="absolute top-1/4 flex flex-col text-medievalSepia bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{
                    backgroundImage: 'url(/images/shop/seller_dialogue_box.png)',
                    width: '525px',
                    height: '280px',
                }}
            >
                <h2 className="p-6 text-center text-4xl">
                    {product ? `Are you sure you want to sell ${product.name}?` : '¿Are you sure you want to sell this item?'}
                </h2>

                {(product.type === "ingredient") ?
                    <img
                        src={product.image}
                        alt={product.name}
                        draggable={false}
                        className="w-20 h-20 object-cover rounded-full mx-auto my-1"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
                        }}
                    />
                    :
                    <img
                        src={product.image}
                        alt={product.name}
                        draggable={false}
                        className="w-20 h-20 object-cover rounded mx-auto my-1"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
                        }}
                    />
                }


                <div className="mt-2 flex justify-center gap-6">
                    <button
                        onClick={onCancel}
                        className="bg-darkSepia text-black px-4 py-2 rounded  hover:bg-medievalSepia transition text-xl"
                    >
                        NO
                    </button>
                    <button
                        onClick={() => onConfirm(product)}
                        className="bg-darkSepia text-black px-4 py-2 rounded hover:bg-medievalSepia transition text-xl"
                    >
                        YES
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
