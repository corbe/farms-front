import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAreas, IAreasList } from "../../models/areas";
import { RootState, useAppDispatch } from "../../store";
import {
  getAreas,
  addAreas,
  updateAreas,
  deleteAreas,
} from "./areasApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField, Typography, Alert } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Title from "../../Title";


const AreasForm = (props: { showValidation: any, handleInputChange: any, areas: IAreas, isSaving: any; save: any, isDeleting: any | undefined; }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
          Arable Areas
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
              value={props.areas.name}
              onChange={props.handleInputChange}
              className={
                props.showValidation ? "" : ""
              }
              helperText={
                props.showValidation ? "name is required." : ""
              }
            />
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



const AreasList = (props: { areasList: IAreasList[]; isSaving:any, isDeleting: any, selectAreas: any, removeAreas:any }) => {
  return (
    <React.Fragment>
      <Title>Arable Areas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.areasList?.map((row: IAreasList, index: number) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Button
                      variant="contained"
                      onClick={() => props.selectAreas(row)}
                      disabled={props.isSaving || props.isDeleting}
                    >
                      Editar
                </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      //loading={props.isDeleting}
                      onClick={() => props.removeAreas(row.id)}
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
        See more areas
      </Link> */}
    </React.Fragment>
  );
}


export const Areas: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  const areasList = useSelector(
    (state: RootState) => state.areas.list.values
  );

  const isLoadingTable = useSelector(
    (state: RootState) => state.areas.list.isLoading
  );

  const isSaving = useSelector(
    (state: RootState) => state.areas.save.isSaving
  );

  const isDeleting = useSelector(
    (state: RootState) => state.areas.save.isDeleting
  );

  const [areas, setAreas] = useState<IAreas>({
    id: 0,
    name: ""
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setAreas((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };


  const selectAreas = (d: IAreas) => {
    setShowValidation(false);
    setAreas({
      id: d.id,
      name: d.name
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

  const removeAreas = (id: number) => {

    if (id)
      dispatch(deleteAreas(id))
        .unwrap()
        .then((response) => {
          showToast(true, "Removido com sucesso.");
          dispatch(getAreas());
        })
        .catch((error) => {
          showToast(false, "Erro ao remover.");
        });
  };

  const save = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (areas.name === "") {
      setShowValidation(true);
      return;
    }

    const action =
    areas.id === 0
        ? addAreas(areas)
        : updateAreas(areas);

    dispatch(action)
      .unwrap()
      .then((response) => {
        showToast(true, "Salvo com sucesso.");
        resetForm();
        dispatch(getAreas());
      })
      .catch((error) => {
        showToast(false, "Erro ao salvar.");
      });
  };

  const resetForm = () => {
    setAreas({
      id: 0,
      name: ""
    });
    setShowValidation(false);
  };

return (
    <>
      <AreasList 
        areasList={areasList}
        isSaving={isSaving}
        isDeleting={isDeleting}
        selectAreas={selectAreas}
        removeAreas={removeAreas}
      />
      <AreasForm 
        isDeleting={isDeleting}
        showValidation={showValidation}
        isSaving={isSaving}
        save={save}
        areas={areas}
        handleInputChange={handleInputChange}
        />
    </>
  );
};