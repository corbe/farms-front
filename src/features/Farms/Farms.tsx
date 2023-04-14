import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFarms, IFarmsList } from "../../models/farms";
import { RootState, useAppDispatch } from "../../store";
import {
  getFarms,
  addFarms,
  updateFarms,
  deleteFarms
} from "./farmsApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField, Typography, InputLabel } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Title from "../../Title";
import { IAreas, IAreasList } from "../../models/areas";
import { getAreas } from "../Areas/areasApi";
import { IAreaFarmList } from "../../models/areaFarm";
import { compose } from "redux";

const FarmsForm = (props: { areasList: IAreasList[], showValidation: any, handleInputNumberChange:any, handleInputChange: any, farms: IFarms, isSaving: any; save: any, isDeleting: any }) => {
  
  const areasFarmsNew: IAreaFarmList[] = [];

  const [areasFarms, setAreasFarms] = React.useState<IAreaFarmList[]>([]);

  useEffect(() => {
    props.areasList.map((element, index) => (
      areasFarmsNew.push({
        area: {
          id: element.id
        },
        value: 0
       })
    ))

    if (!areasFarms) setAreasFarms(areasFarmsNew)
    props.farms.areas = areasFarmsNew;

  }, [])

  const [areas, setAreas] = React.useState([]);
  const [area, setArea] = React.useState({});
 
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {

    const { name, value } = e.target;
    const index = Number(name.split('_')[1]);
    const id = Number(name.split('_')[2]);
   

    setArea({
      ...area,
      area: {
            id: id
      },
      value: value
    });

    props.farms.areas.map((element, i) => {
      props.farms.areas[i].value = element.area.id === id ? Number(value) : props.farms.areas[i].value
    })

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
          Farms
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="Name"
              name="name"
              label="name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={props.farms.name}
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "name is required." : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="City"
              name="city"
              label="city"
              fullWidth
              autoComplete="given-city"
              variant="standard"
              value={props.farms.city}
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "city is required." : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="Estado"
              name="state"
              label="state"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={props.farms.state}
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "state is required." : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="Name"
              name="totalArea"
              label="totalArea"
              fullWidth
              autoComplete="given-totalArea"
              variant="standard"
              value={props.farms.totalArea}
              onChange={props.handleInputNumberChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "totalArea is required." : ""
              }
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="totalVegetationArea"
              name="totalVegetationArea"
              label="totalVegetationArea"
              fullWidth
              autoComplete="given-totalVegetationArea"
              variant="standard"
              value={props.farms.totalVegetationArea}
              onChange={props.handleInputNumberChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "totalVegetationArea is required." : ""
              }
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={12}>            
            <InputLabel id="demo-simple-select-helper-label">Areas</InputLabel>
          </Grid>         
          {

            props.areasList.map((element, index) => (
              <Grid display='flex' item xs={12} sm={12} lg={12} key={index}>            
                
                <Grid item xs={6} sm={6} lg={6}>
                    <TextField disabled label="Area"  value={element.name} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6}>
                  <TextField 
                    label="Hectares" 
                    name={'areas_'+[index]+'_'+element.id}            
                    value={props?.farms?.areas[index]?.value || ''}  
                    onChange={handleChange}
                    />
                </Grid>
                
              </Grid>
              
            ))
          }

          <Grid item xs={12}>
          {!props.isSaving && (
               <Button
               variant="contained"
               sx={{ mt: 3, ml: 1 }}
               title="Salvar"
               onClick={() => props.save(areas)}              
               disabled={props.isSaving || props.isDeleting}
             >
              Salvar
              </Button>           
          )}

          {props.isSaving && (
              <LoadingButton
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              loading={props.isSaving}
              title="Salvar"
            >    
            Salvar
            </LoadingButton>
          )}
          </Grid>
          
      </Grid>
      <ToastContainer closeOnClick={true} />
    </React.Fragment>
  );
}


const FarmsList = (props: {farmsList: IFarmsList[]; isSaving:any, isDeleting: any, selectFarms: any, removeFarms:any }) => {
  return (
    <React.Fragment>
      <Title>Farms</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Total Area</TableCell>
            <TableCell>Total Area</TableCell>
            <TableCell>Total Vegetation Area</TableCell>
            <TableCell>Total Arable Area</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.farmsList?.map((row: IFarmsList, index: number) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.totalArea}</TableCell>
              <TableCell>{row.totalVegetationArea}</TableCell>
              <TableCell>{row.totalArableArea}</TableCell>
              <TableCell>
                <Button
                      variant="contained"
                      onClick={() => props.selectFarms(row)}
                      disabled={props.isSaving || props.isDeleting}
                    >
                      Editar
                </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      //loading={props.isDeleting}
                      onClick={() => props.removeFarms(row.id)}
                      disabled={props.isSaving || props.isDeleting}
                      >
                      Remover
                </Button>
              </TableCell>
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more farms
      </Link> */}
    </React.Fragment>
  );
}



export const Farms: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFarms());
    dispatch(getAreas());
  }, [dispatch]);

  const areasList = useSelector(
    (state: RootState) => state.areas.list.values
  );

  const farmsList = useSelector(
    (state: RootState) => state.farms.list.values
  );

  const isLoadingTable = useSelector(
    (state: RootState) => state.farms.list.isLoading
  );

  const isSaving = useSelector(
    (state: RootState) => state.farms.save.isSaving
  );

  const isDeleting = useSelector(
    (state: RootState) => state.farms.save.isDeleting
  );


  const [farms, setFarms] = useState<IFarms>({
    id: 0,
    name: "",
    city: "",
    state: "",
    totalArea: 0,
    totalVegetationArea: 0,
    areas: []
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, checked } = e.target;   

    setFarms((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : Number(value),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, checked } = e.target;   

    setFarms((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const selectFarms = (d: IFarms) => {

    let areasFarmsToSelect: IAreaFarmList[] = [];    

    areasList.map((element: IAreas, index) => {
      console.log(element)

      let value;
      const area = d.areas.find(area => area.area.id === element.id )
      if (area)
        value = area.value;
      else
        value = 0

        areasFarmsToSelect.push({
          area: {
            id: element.id
          },
          value: value
         })
    })

    setShowValidation(false);
    setFarms({
      id: d.id,
      name: d.name,
      city: d.city,
      state: d.state,
      totalArea: d.totalArea,
      totalVegetationArea: d.totalVegetationArea,
      areas: areasFarmsToSelect 
    });
  };

  const showToast = (success: boolean, msg:string) => {
    setTimeout(()=>{ 
        if(success){
          toast.success(msg);
        }else{
          toast.success(msg);
        }
    }, 400);
  }

  const removeFarms = (id: number) => {
    if (id)
      dispatch(deleteFarms(id))
        .unwrap()
        .then((response) => {
          showToast(true, "Removido com sucesso.");   // console.log(">>>>>")
          dispatch(getFarms());
        })
        .catch((error) => {
          showToast(false, "Erro ao remover.");
        });
  };
  

  const save = (e: any) => {

    let areasFarmsToSave: IAreaFarmList[] = [];    

        farms.areas.map((element, index) => {     
   
        if ( Number(element.value) > 0){
        
          areasFarmsToSave.push(element);
          
        }
    });

    
    const farmOutput = {...farms, areas: areasFarmsToSave}
   
    if (farms.name === "") {
      setShowValidation(true);
      return;
    }
    
    const action =
    farms.id === 0
        ? addFarms(farmOutput)
        : updateFarms(farmOutput);

    dispatch(action)
      .unwrap()
      .then((response) => {
        showToast(true, "Salvo com sucesso.");
        resetForm();
        dispatch(getFarms());
      })
      .catch((error) => {
        showToast(false, "Erro ao salvar.");
      });
  };


 // console.log('from father', farms)
  const resetForm = () => {
    setFarms({
      name: "",
      city: "",
      state: "",
      totalArea: 0,
      totalVegetationArea: 0,
      areas: []
    });
    setShowValidation(false);
  };

return (
    <>
      <FarmsList farmsList={farmsList}  
        isSaving={isSaving}
        isDeleting={isDeleting}
        selectFarms={selectFarms}
        removeFarms={removeFarms}
      />
      <FarmsForm
        isDeleting={isDeleting} 
        areasList={areasList}
        showValidation={showValidation} 
        isSaving={isSaving} 
        save={save} 
        farms={farms}
        handleInputChange={handleInputChange} 
        handleInputNumberChange={handleInputNumberChange}
        />
    </>
  );
};