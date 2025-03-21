import { Edit } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";

const CompanyRegisterHeader = () => {
  const { id } = useParams();

  const { companies } = useSelector((state) => state.companies || {});

  const currentCompany = companies?.find((company) => company.id == id);

  const selectedItem = useSelector((state) => state.selectedItem); // Global state
  const [activeButton] = useState("register");
  const [activeButton2, setActiveButton2] = useState(""); // Fixed state

 

  const navigate = useNavigate();

  

  const handleGridClick = (button) => {
    setActiveButton2(button);
  };


  // console.log("Found Company:", currentCompany);
  return (
    <>
      {/* Navigation Tabs */}
      <div className="flex gap-8 pt-6 px-8 border-b border-gray-200 pb-4">
        <Link
          to="/dashboard/company-overview"
          className={`pb-3 text-lg font-medium transition-all ${
            activeButton === "overview"
              ? "text-primary border-b-4 border-primary font-semibold"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Overview
        </Link>
        <Link
          to="/dashboard/company-register"
          className={`pb-3 text-lg font-medium transition-all ${
            activeButton === "register"
              ? "text-primary border-b-4 border-primary font-semibold"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Register
        </Link>
      </div>

      {/* Header */}

      <header className="flex flex-col lg:flex-row items-center justify-between py-6 lg:gap-4 pl-10">
        <h1 className="text-2xl font-semibold text-black">
          {selectedItem.selectedItem}{" "}
          {activeButton === "register" ? "Register" : "Detail Info"}
        </h1>

        {/* Action Buttons: Trash & Edit */}
        {activeButton !== "register" && (
          <div className="flex items-center space-x-6">
            <button
              onClick={ ()=>handleGridClick("transh")}
              className={`p-2 rounded-lg transition ${
                activeButton2 === "trash"
                  ? "text-primary bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HiOutlineTrash className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                console.log("Navigating to:", `/dashboard/company-edit/${id}`);
                navigate(`/dashboard/company-edit/${currentCompany.id}`);
              }}
              className={`p-2 rounded-lg transition ${
                activeButton2 === "edit"
                  ? "text-primary bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Edit className="w-6 h-6" />
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default CompanyRegisterHeader;
