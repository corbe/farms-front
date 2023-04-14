import { IFarms, IFarmsList } from "./farms";

export interface IProducers {
    id: number;
    name: string;
    document: string;
    farms: IFarmsList[]
}

export interface IProducersList extends IProducers {}