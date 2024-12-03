import { Player } from "@/_common/interfaces/Player";
import { GRID_NUMBER } from "@/constants/constants";
import { log } from "node:console";

interface Props {
    playerData?: Player;
  }

const PlayerInventorySellShop: React.FC<Props> = ({playerData}) => {
       
        return (
        <div className="w-10/12 p-4">
          <div className="w-full h-full bg-black/70">
            <div className="grid grid-cols-11 grid-rows-5 flex-grow">
              {
                playerData?.inventory.helmets.map(helmet => {
                  return (
                    <div key={helmet._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={helmet.image} alt={helmet.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.weapons.map(weapon => {
                  return (
                    <div key={weapon._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={weapon.image} alt={weapon.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.armors.map(armor => {
                  return (
                    <div key={armor._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={armor.image} alt={armor.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.shields.map(shield => {
                  return (
                    <div key={shield._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={shield.image} alt={shield.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.artifacts.map(artifact => {
                  return (
                    <div key={artifact._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={artifact.image} alt={artifact.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.boots.map(boot => {
                  return (
                    <div key={boot._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={boot.image} alt={boot.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.rings.map(ring => {
                  return (
                    <div key={ring._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={ring.image} alt={ring.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.healing_potions.map(healing => {
                  return (
                    <div key={healing._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={healing.image} alt={healing.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.antidote_potions.map(antidote => {
                  return (
                    <div key={antidote._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={antidote.image} alt={antidote.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                playerData?.inventory.enhancer_potions.map(enhancer => {
                  return (
                    <div key={enhancer._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={enhancer.image} alt={enhancer.name} className="w-full h-auto" />
                    </div>
                  )
                })
              }
              {
                Array.from({
                  length:
                    GRID_NUMBER
                    - playerData?.inventory.helmets.length!!
                    - playerData?.inventory.weapons.length!!
                    - playerData?.inventory.armors.length!!
                    - playerData?.inventory.shields.length!!
                    - playerData?.inventory.artifacts.length!!
                    - playerData?.inventory.boots.length!!
                    - playerData?.inventory.rings.length!!
                    - playerData?.inventory.healing_potions.length!!
                    - playerData?.inventory.antidote_potions.length!!
                    - playerData?.inventory.enhancer_potions.length!!
                }).map((element, index) => <div key={index} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}></div>)
              }


            </div>
          </div>
        </div>
    );
}


export default  PlayerInventorySellShop;