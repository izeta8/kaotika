import { ReactNode, useState, useEffect } from 'react';
import GoldDisplay from './GoldDisplay';

interface promps {
  gold: number | undefined;
  level: number | undefined;
}

const ShopPlayerInfo: React.FC<promps> = ({ gold, level }) => {
  const [displayGold, setDisplayGold] = useState<number>(gold || 0);

  useEffect(() => {
    if (gold !== undefined) {
      setDisplayGold(gold);
    }
  }, [gold]);

  return (
    <InfoContainer>
      {(gold !== undefined && gold !== null) && (
        <GoldDisplay gold={displayGold} />
      )}
      {(level !== undefined && level !== null) && (
        <Info imagePath={"/images/icons/level.png"} label={level} />
      )}
    </InfoContainer>
  );
};

const InfoContainer: React.FC<{children: ReactNode}> = ({children}) => {

  return (
    <div
      className="fixed w-56 h-44 bottom-5 right-5 z-40 flex flex-col gap-4 justify-center items-center"
      style={{
        backgroundImage: "url('/images/shop/shop_player_info_background.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: '100%'
      }}
    >
      {children}
    </div>
  );

}

export const Info: React.FC<{imagePath: string, label: number}> = ({imagePath, label}) => {

  return (
    <div className="w-3/5 border border-medievalSepia rounded-md px-2 py-1 flex flex-row gap-3 justify-center align-middle bg-black/30">

      <img
        className="w-11 rounded-full flex-shrink-0"
        src={imagePath}
      />

      <p
        className="text-4xl pb-2  flex-grow text-center"
      >
        {label}
      </p>

    </div>
  )

}

export default ShopPlayerInfo;