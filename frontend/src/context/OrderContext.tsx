import { createContext } from "react";
import { Order } from "../interfaces/compositionElementsInterfaces";

export const OrdersToPrepareContext = createContext<Order[]>([])

export const SetOrdersToPrepareContext = createContext<React.Dispatch<React.SetStateAction<Order[]>> | undefined>(undefined)