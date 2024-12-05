import { ItemData } from "./ItemData";

export interface CartItem extends ItemData {
    quantity: number;
  }