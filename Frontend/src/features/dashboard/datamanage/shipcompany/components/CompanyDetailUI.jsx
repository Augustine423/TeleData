import { useSelector } from "react-redux";
import Pagination from "../../../../../components/Pagination";
import CompanyDetailTableUI from "./VesselDetailTableUI";

import { useParams } from "react-router-dom";

const CompanyDetailUI = () => {
  const { id } = useParams();

  const companies = useSelector((state) => state.companies?.companies || []); 

  const currentCompany = companies.find((company) => company.id == id);

  // Prevent rendering if currentCompany is undefined
  if (!currentCompany) {
    return (
      <p className="text-red-500">
        Company not found or data is still loading...
      </p>
    );
  }

  return (
    <>
      {/* Header */}

      {/* Company Details Card */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6">
      
        <h2 className="text-lg font-bold mb-6">Companies name</h2>

        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          {/* Company Logo */}
          <div className="col-span-1 flex items-center">
            <div className="w-[280px] h-[150px] bg-gray-100 rounded-md flex items-center justify-center">
              <img
                src={currentCompany.image}
                alt={currentCompany.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4 border-b border-gray-300">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-sm font-medium">Companies</span>
              <span className="text-sm text-gray-600">
                {currentCompany.companyName}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 pr-4">
              <span className="text-sm font-medium">Business No</span>
              <span className="text-sm text-gray-600">
                {currentCompany.business_no}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-sm font-medium">Country</span>
              <span className="text-sm text-gray-600">
                {currentCompany.country}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 pr-4">
              <span className="text-sm font-medium">Homepage</span>
              <span className="text-sm text-gray-600">
                {currentCompany.homepage}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-sm font-medium">Establishment Year</span>
              <span className="text-sm text-gray-600">
                {currentCompany.establishment_year}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 pr-4">
              <span className="text-sm font-medium">Employees</span>
              <span className="text-sm text-gray-600">
                {currentCompany.employees}
              </span>
            </div>

            <div className="col-span-2 flex justify-between  items-center  pb-2 border-b border-gray-300">
              <span className="text-sm font-medium">Address</span>
              <span className="text-sm text-gray-600 text-center w-full">
                {currentCompany.address}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2 ">
              <span className="text-sm font-medium">Phone No</span>
              <span className="text-sm text-gray-600">
                {currentCompany.companyPhone}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 pr-4">
              <span className="text-sm font-medium">FAX No</span>
              <span className="text-sm text-gray-600">
                {currentCompany.faxNo}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2 ">
              <span className="text-sm font-medium">Representative</span>
              <span className="text-sm text-gray-600">
                {currentCompany.representative}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 pr-4">
              <span className="text-sm font-medium">Phone No</span>
              <span className="text-sm text-gray-600">
                {currentCompany.ceoPhone}
              </span>
            </div>

            <div className=" flex justify-between  items-center  pb-2">
              <span className="text-sm font-medium">E-mail</span>
              <span className="text-sm text-gray-600">
                {currentCompany.email}
              </span>
            </div>
          </div>
        </div>
        {/* Vessels List */}
        <div className="pt-12">
          <h2 className="text-lg font-bold mb-4">Vessels List</h2>

          <CompanyDetailTableUI company={currentCompany} />

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailUI;
