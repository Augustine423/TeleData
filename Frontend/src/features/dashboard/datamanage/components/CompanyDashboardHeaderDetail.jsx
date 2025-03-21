import { Edit } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { HiOutlineTrash } from "react-icons/hi2";

import CompanyDetailUI from "../shipcompany/components/CompanyDetailUI";

import {
  deleteCompany,
  fetchCompanies,
} from "../../../../stores/informationData/companySlice.js";

const CompanyDashboardHeaderDetail = () => {
  const { id } = useParams();

  const selectedItem = useSelector((state) => state.selectedItem); //global state

  const [activeButton, setActiveButton] = useState("overview");
  const [activeButton2, setActiveButton2] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleGridClick = (button) => {
    setActiveButton2(button);
  };
  const handleDeleteBtn = async () => {
    if (!id) return; // Ensure ID exists before proceeding

    try {
      setIsDeleting(true); // Optionally show a loading state
      await dispatch(deleteCompany(id)).unwrap(); // Dispatch delete action
      dispatch(fetchCompanies()); // Refresh the list of companies
      navigate("/dashboard/company-overview"); // Redirect after deletion
    } catch (error) {
      console.error("Error while deleting company:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-8 pt-6 px-8 border-b border-gray-200 pb-4">
        <Link
          to={`/dashboard/company-overview`}
          onClick={() => handleClick("overview")}
          className={`pb-3 text-lg font-medium transition-all ${
            activeButton === "overview"
              ? "text-primary border-b-4 border-primary font-semibold"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Overview
        </Link>
        <Link
          Link
          to="/dashboard/company-register"
          onClick={() => handleClick("register")}
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

      <header className="flex items-center justify-between py-4 lg:gap-4 pl-10">
        <h1 className="text-2xl font-semibold text-black">
          {selectedItem.selectedItem}{" "}
          {activeButton === "register" ? "Register" : "Detail Info"}
        </h1>
        {activeButton !== "register" && (
          <div className="flex items-center space-x-4">
            {/* View Toggle (Grid vs Table) */}
            <div className="flex items-center space-x-2 pr-10">
              <button
                onClick={handleDeleteBtn}
                className={`p-2 ${
                  activeButton2 === "transh" ? "text-primary" : ""
                }`}
              >
                <HiOutlineTrash className="w-5 h-5" />
              </button>
              <Link
                to={`/dashboard/company-edit/${id}`}
                onClick={() => handleGridClick("edit")}
                className={`p-2 ${
                  activeButton2 === "edit" ? "text-primary" : ""
                }`}
              >
                <Edit className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="p-6 ">
        <CompanyDetailUI />
      </main>
    </>
  );
};

export default CompanyDashboardHeaderDetail;
