import { IAreas } from "./areas";
import { IFarms } from "./farms";

export interface IAreaFarm{
    area: IAreas;
    farm?: IFarms;
    value?: number;
}

export interface IAreaFarmList extends IAreaFarm {
}