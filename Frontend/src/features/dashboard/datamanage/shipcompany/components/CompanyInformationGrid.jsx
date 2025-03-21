import { MoreHorizontal } from "lucide-react";
import Pagination from "../../../../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCompanies } from "../../../../../stores/informationData/companySlice";
import { Link } from "react-router-dom";

const CompanyInformationGrid = () => {
  const dispatch = useDispatch();

  const { companies, loading, error } = useSelector(
    (state) => state.companies || {}
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // console.log(companies);

  return (
    <>
      {/* Grid Content */}
      <div className="px-8 md:px-14 py-8 shadow-md rounded-lg bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {companies.map((company, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden w-full border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header Section */}
              <div className="p-4 flex items-center justify-between ">
                <h3 className="text-lg font-semibold text-gray-800">
                  {company.companyName}
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Image Section */}
              <div className="aspect-[3/2] w-full h-[166px] p-4 flex items-center ">
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full  object-contain bg-[#EEEEEE] rounded-lg"
                />
              </div>

              {/* Details Section */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Business No:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {company.business_no}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Country:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {company.country}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Representative:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {company.representative}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Phone No:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {company.companyPhone}
                  </span>
                </div>
              </div>

              {/* Footer Section */}
              <div className="p-4 pt-0">
                <Link
                  to={`/dashboard/company-detail/${company.id}`}
                  className="block w-full py-2 text-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-8">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationGrid;
