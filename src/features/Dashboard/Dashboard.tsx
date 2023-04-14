import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IDashboard } from "../../models/dashboard";
import { RootState, useAppDispatch } from "../../store";
import { getDashboard } from "./dashboardApi";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Paper, Typography } from "@mui/material";
import Title from "../../Title";
import Chart from "react-google-charts";


const ComponentsDashboard = (props:{ dashboard: IDashboard}) => {

  const datafarmsByState:any = [['Estado', 'Quantidade']];
  const datafarmsByPlantingType:any = [['Cultura', 'Quantidade']];
  const datafarmsByAreaType:any = [['Tipo Área', 'Quantidade']];

  props?.dashboard?.farmsByState?.map((e) => {
    datafarmsByState.push([e.state, parseInt(e.totalArea) ])
  })

  datafarmsByAreaType.push(["Plantavel", parseInt(props?.dashboard?.farmsByAreaType?.totalArableArea)])
  datafarmsByAreaType.push(['Vegetação', parseInt(props?.dashboard?.farmsByAreaType?.totalVegetationArea)])

  props?.dashboard?.farmsByPlantingType?.map((e) => {
    datafarmsByPlantingType.push([e.area, parseInt(e.totalArea)])    
  })

  return ( 
    <React.Fragment>
    <Title>Dashboard</Title>

    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={6} lg={6}>
        <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            }}
        >  

          <h1>Total fazenda em hectares</h1>
            
          <Typography sx={{textAlign: 'center'}} variant="h3" component="h2">
           {props.dashboard?.farms?.totalArea} ha
          </Typography>;
    
        </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
        <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            }}
        >
          <h1>Total de fazendas</h1>
         
          <Typography  sx={{textAlign: 'center'}} variant="h3" component="h2">
            {props.dashboard?.farms?.totalFarms} 
          </Typography>;

        </Paper>
        </Grid>

        <Grid item xs={4}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Chart
            chartType="PieChart"
            data={datafarmsByState}
            options={{
              title: "Fazendas por estado",
              is3D: true,
            }}
            width={"100%"}
            height={"400px"}
          />
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Chart
            chartType="PieChart"
            data={datafarmsByPlantingType}
            options={{
              title: "Fazendas por tipo de cultura",
              is3D: true,
            }}
            width={"100%"}
            height={"400px"}
          />
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Chart
            chartType="PieChart"
            data={datafarmsByAreaType}
            options={{
              title: "Fazendas por tipo de área",
              is3D: true,
            }}
            width={"100%"}
            height={"400px"}
          />
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const [dashboardData, setDashboardData] = useState<any>()

  useEffect(() => {
    dispatch(getDashboard()).then(()=>{
      setDashboardData(dashboard)
    })
  }, [dispatch, dashboardData]);
  
  const dashboard = useSelector(
    (state: RootState) => state.dashboard.list.values
  );

  const isLoadingTable = useSelector(
    (state: RootState) => state.dashboard.list.isLoading
  );

return (
    <>
    <ComponentsDashboard dashboard={dashboardData} />      
    </>
  );
};