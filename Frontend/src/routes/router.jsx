import { createBrowserRouter } from "react-router-dom";
// import PublicLayout from "../features/public/components/PublicLayout";
// import NotFound from "../components/NotFound";
import publicRoute from "./publicRoute";
import authRoute from "./authRoute";
import dashboardRoute from "./dashboardRoute";

const router=createBrowserRouter([
  {
    path:"/",
    children:[ ...publicRoute],
  },
  ...authRoute,
  ...dashboardRoute,
  

]);
export default router;