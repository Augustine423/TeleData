
import VesselDashboardListPage from "../features/dashboard/datamanage/shipVessels/pages/VesselDashboardListPage";
import VesselEditPage from "../features/dashboard/datamanage/shipVessels/pages/VesselEditPage";
import VesselRegisterPage from "../features/dashboard/datamanage/shipVessels/pages/VesselRegisterPage";



const vesselsRoute=[
   
       
          {
            path: "vessel-register",
            element: <VesselRegisterPage/>
          },
          {
            path: "vessel-overview",
            element: <VesselDashboardListPage/>,
          },
         
         
          {
            path: "vessel-detail/:id",
            element: <VesselEditPage />,
          }
        ]
 


export default vesselsRoute;