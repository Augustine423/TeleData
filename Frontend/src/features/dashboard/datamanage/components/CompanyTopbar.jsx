import { useSelector } from "react-redux"; // Import useSelector hook
import CompanyDashboardList from "./CompanyDashboardList";

// import CompanyDetailPage from "../shipcompany/pages/CompanyDetailPage";


const CompanyTopbar = () => {
    const selectedItem = useSelector((state) => state.selectedItem); // Access the selected item from Redux store
  return (
    <div className="flex-1 flex flex-col m-4 w-full">
        {/* Navbar */}
       
        <header className="bg-secondary-gradient py-2 flex  items-center rounded-md opacity-80 px-4 w-full">
          <ul className="list-disc list-inside text-white">
            <li className="text-white text-lg font-semibold ">
            {/* this is navheader name changes */}
            {selectedItem.selectedItem} 
            </li>
         </ul>
        </header>
     <CompanyDashboardList/>
     
        </div> 
  )
}

export default CompanyTopbar;