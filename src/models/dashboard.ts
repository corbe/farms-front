export interface IDashboardFarms{
    totalFarms: string
    totalArea: string
}

export interface IDashboardFarmsByAreaType
{
    totalArableArea: string
    totalVegetationArea: string
}

export interface IDashboardFarmsPlantingType{
    farms: string
    totalArea: string;
    area: string;
}

export interface IDashboardFarmsByState{
    farms: string
    totalArea: string;
    state: string;
}

export interface IDashboard {
    farms: IDashboardFarms;
    farmsByState: IDashboardFarmsByState[];
    farmsByPlantingType: IDashboardFarmsPlantingType[];
    farmsByAreaType : IDashboardFarmsByAreaType;
}

export interface IDashboardList extends IDashboard {
    // dateCreated: any
}
