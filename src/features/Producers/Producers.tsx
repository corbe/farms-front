import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProducers, IProducersList } from "../../models/producers";
import { RootState, useAppDispatch } from "../../store";
import {
  getProducers,
  addProducers,
  updateProducers,
  deleteProducers,
} from "./producersApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField, Typography, Alert, FormHelperText, InputLabel, MenuItem, Select, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent, NativeSelect, FormControlLabel, FormGroup } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Title from "../../Title";
import { getFarms } from "../Farms/farmsApi";
import { IFarms, IFarmsList } from "../../models/farms";

const ProducersForm = (props: {setProducers: any, farmsList: IFarmsList[], showValidation: any, handleInputChange: any, producers: IProducers, isSaving: any; save: any, isDeleting: any | undefined; }): JSX.Element => {
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8; 
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [farms, setFarms] = React.useState<IFarmsList[]>(props.producers.farms);
  
  const handleChangeFarm = (event: any, farm: IFarms) => {
   
    const checked = event.target.checked  

    const index =  props.producers.farms.findIndex(item => item.id === farm.id)
    
    let newFarm:IFarmsList[] = [...props.producers.farms]

    if (checked)
      newFarm.push(farm)
    else
      newFarm.splice(index,1)


    props.setProducers({
      ...props.producers,
      farms: newFarm
    })   
  }
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
          Producers
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
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
              value={props.producers.name}         
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "name is required." : ""
              }
            />
          </Grid>
        
        <Grid item xs={12} sm={12}>
            <TextField
              error={
                props.showValidation ? true : false
              }
              required
              id="Document"
              name="document"
              label="document"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={props.producers.document}
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "document is required." : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          {props.farmsList.map((farm, index) => (
              <FormGroup key={farm.id}>
                <FormControlLabel name="farmsCheck[]" onChange={(e) => (handleChangeFarm(e, farm))} 
                control={
                  <Checkbox checked={props.producers.farms.findIndex((item) => item.id === farm.id) >= 0} />
                } label={farm.name} />
              </FormGroup>          
            ))}
          </Grid>
          <Grid item xs={12}>
          {!props.isSaving && (
               <Button
               variant="contained"
               sx={{ mt: 3, ml: 1 }}
               title="Salvar"
               onClick={props.save}              
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



const ProducersList = (props: { producersList: IProducersList[]; isSaving:any, isDeleting: any, selectProducers: any, removeProducers:any }) => {
  return (
    <React.Fragment>
      <Title>Producers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.producersList?.map((row: IProducersList, index: number) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Button
                      variant="contained"
                      onClick={() => props.selectProducers(row)}
                      disabled={props.isSaving || props.isDeleting}
                    >
                      Editar
                </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      onClick={() => props.removeProducers(row.id)}
                      disabled={props.isSaving || props.isDeleting}
                      >
                      Remover
                </Button>
              </TableCell>           
            </TableRow>
          ))}
        </TableBody>
      </Table>  
    </React.Fragment>
  );
}


export const Producers: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducers());
    dispatch(getFarms());  
  }, [dispatch]);

  const farmsList = useSelector(
    (state: RootState) => state.farms.list.values
  );

  const producersList = useSelector(
    (state: RootState) => state.producers.list.values
  );

  const isLoadingTable = useSelector(
    (state: RootState) => state.producers.list.isLoading
  );

  const isSaving = useSelector(
    (state: RootState) => state.producers.save.isSaving
  );

  const isDeleting = useSelector(
    (state: RootState) => state.producers.save.isDeleting
  );

  const [producers, setProducers] = useState<IProducers>({
    id: 0,
    name: "",
    document: "",
    farms: []
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setProducers((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const selectProducers = (d: IProducers) => {
    setShowValidation(false);
    setProducers({
      id: d.id,
      name: d.name,
      document: d.document,
      farms: d.farms
    });
  };

  const showToast = (success: boolean, msg:string) => {
    setTimeout(()=>{ 
        if(success){
          toast.success(msg);
        }else{
          toast.error(msg);
        }
    }, 400);
  }

  const removeProducers = (id: number) => {

    if (id)
      dispatch(deleteProducers(id))
        .unwrap()
        .then((response) => {
          showToast(true, "Removido com sucesso.");
          dispatch(getProducers());
        })
        .catch((error) => {
          showToast(false, "Erro ao remover.");
        });
  };

  const save = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (producers.name === "") {
      setShowValidation(true);
      return;
    }

    const action =
    producers.id === 0
        ? addProducers(producers)
        : updateProducers(producers);

    dispatch(action)
      .unwrap()
      .then((response) => {
        showToast(true, "Salvo com sucesso.");
        resetForm();
        dispatch(getProducers());
      },
      (error) => {
        showToast(false, error.message);

      })
      .catch((error) => {
        showToast(false, "Erro ao salvar.");
      });
  };

  const resetForm = () => {
    setProducers({
      id: 0,
      name: "",
      document: "",
      farms: []
    });
    setShowValidation(false);
  };

return (
    <>
      <ProducersList producersList={producersList} 
        isSaving={isSaving}
        isDeleting={isDeleting}
        selectProducers={selectProducers}
        removeProducers={removeProducers}
      />
      <ProducersForm 
        isDeleting={isDeleting} 
        showValidation={showValidation} 
        isSaving={isSaving}
        setProducers={setProducers}
        farmsList={farmsList}
        save={save}
        producers={producers} 
        handleInputChange={handleInputChange} 
        />
    </>
  );
};