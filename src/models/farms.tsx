import { IAreaFarmList } from "./areaFarm";
import { IAreasList } from "./areas";

export interface IFarms {
    id?: number;
    name?: string;
    city?: string;
    state?: string;
    totalArea?: number;
    totalVegetationArea?: number;
    totalArableArea?: string | undefined;
    areas: IAreaFarmList[]
    
}

export interface IFarmsList extends IFarms {}