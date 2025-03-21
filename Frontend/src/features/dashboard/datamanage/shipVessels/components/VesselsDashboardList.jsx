import { useSelector } from "react-redux";
import VesselGridListPage from "../pages/VesselGridListPage";
import VesselRegisterPage from "../pages/VesselRegisterPage";
import VesselTableListPage from "../pages/VesselTableListPage";
import { useState } from "react";
import Container from "../../../../../components/Container";
import { Link } from "react-router-dom";
import { LayoutGrid, Menu, Search } from "lucide-react";

const VesselsDashboardList = () => {
    const selectedItem = useSelector((state) => state.selectedItem);//global state

    const [activeButton] = useState("overview");
    const [activeButton2, setActiveButton2] = useState("grid");
  
    
  
    const handleGridClick = (button) => {
      setActiveButton2(button);
    };
  return (
    <>
       <div className="w-full">
      <div className="flex gap-3 pt-4 ">
      <Link to="/dashboard/vessel-register"
        className={`button ${
          activeButton === "overview"
            ? "text-black border-b-2 border-primary"
            : "text-gray-500"
        }`}
      >
        Overview
      </Link>
      <Link to="/dashboard/vessel-register"
        className={`button ${
          activeButton === "register"
            ? "text-black border-b-2 border-primary"
            : "text-gray-500"
        }`}
      >
        Register
      </Link>
    </div>
    {/* Header */}
    <Container>
      <header className="flex items-center justify-between py-4 lg:gap-4 ">
        <h1 className="text-2xl font-semibold text-black">{selectedItem.selectedItem} {activeButton === "register" ? "Register" : "List"}</h1>
        {activeButton !== "register" && (
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Quick Search in......"
                className="w-64 px-4 py-2 text-sm text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* View Toggle (Grid vs Table) */}
            <div className="flex items-center space-x-2">
              <Link
                to="#"
                onClick={() => handleGridClick("table")}
                className={`p-2 ${activeButton2 === "table" ? "text-primary" : ""}`}
              >
                <Menu className="w-5 h-5" />
              </Link>
              <Link
                to="#"
                onClick={() => handleGridClick("grid")}
                className={`p-2 ${activeButton2 === "grid" ? "text-primary" : ""}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </Container>

    {/* Content */}
    <main className="p-6">
    {selectedItem.selectedItem === "Vessels" ? (
        activeButton === "register" ? (
          <VesselRegisterPage/>
        ) : activeButton2 === "grid"  ? (
          <VesselGridListPage/>
        ) : (
          <VesselTableListPage/>
        )
      ) :  (
        <div>Please choose a valid item</div>
      )}
    </main>
  </div>
    
    </>
  )
}

export default VesselsDashboardList