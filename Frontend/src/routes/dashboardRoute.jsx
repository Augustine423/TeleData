import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import RealTimeInfo from "../features/dashboard/control/components/RealTimeInfo";
import companyRoute from "./companyRoute";
import helpCenterRoute from "./helpCenterRoute";
import realTimeInfoRoute from "./RealTimeInfoRoute";
import vesselsRoute from "./vesselRoute";

const dashboardRoute = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // Redirect to RealTimeInfo after login
        element: <RealTimeInfo />,
      },
      ...realTimeInfoRoute,
      ...companyRoute,
      ...vesselsRoute,
      ...helpCenterRoute
    ],
  },
];

export default dashboardRoute;
