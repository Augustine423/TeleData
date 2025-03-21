import CompanyDetailPage from "../features/dashboard/datamanage/shipcompany/pages/CompanyDetailPage";
import CompanyRegisterPage from "../features/dashboard/datamanage/shipcompany/pages/CompanyRegisterPage";
import CompanyDashboardListPage from "../features/dashboard/datamanage/shipcompany/pages/CompanyDashboardListPage";
import CompanyEditPage from "../features/dashboard/datamanage/shipcompany/pages/CompanyEditPage";


const companyRoute = [
  {
    path: "company-overview",
    element: <CompanyDashboardListPage />,
  },

  {
    path: "company-register",
    element: <CompanyRegisterPage />,
  },
  {
    path: "company-detail/:id",
    element: <CompanyDetailPage />,
  },
  {
    path: "company-edit/:id",
    element: <CompanyEditPage />,
  },


];

export default companyRoute;
