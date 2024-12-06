
const ShopBackground = () => {

  return (
    <>
      <img
        className='w-full h-full absolute top-0 opacity-10 z-20'
        style={{
          backgroundColor: '#191A1D',
          backgroundImage: "url('/images/shop/background_pattern.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      <div
        className='w-full h-full absolute top-0 z-10'
        style={{
          backgroundColor: '#191A1D',
        }}
      >
      </div>
    </>
  );

}

export default ShopBackground;