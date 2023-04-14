import { Route, Routes } from 'react-router-dom';
import { Areas } from "./features/Areas/Areas";
import { Dashboard } from "./features/Dashboard/Dashboard";
import { Farms } from './features/Farms/Farms';
import { Producers } from './features/Producers/Producers';


const AppRoutes = () => {
   return(
    <Routes>
        <Route path={"/"} index element={<Dashboard />} />
        <Route path={"/areas"} element={<Areas />} />
        <Route path={"/farms"} element={<Farms />} />
        <Route path={"/producers"} element={<Producers />} />
    </Routes>
   )
}

export default AppRoutes;