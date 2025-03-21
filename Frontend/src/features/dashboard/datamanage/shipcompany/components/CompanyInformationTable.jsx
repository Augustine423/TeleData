import Pagination from "../../../../../components/Pagination";
import PageLoading from "../../../../../components/PageLoading";
import NotFound from "../../../../../components/NotFound";
import CompanyInformationRow from "./CompanyInformationRow";
import { useSelector } from "react-redux";

const CompanyInformationTable = () => {


  const { companies, loading, error } = useSelector(
    (state) => state.companies || {}
  );

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className=" shadow-xl rounded-md w-full">
        <div className="overflow-x-auto bg-white border rounded-md">
          <table className="w-full">
            <thead className="bg-gray-50 m-4">
              <tr className=" bg-gray-200 p-6 mx-4">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Companies
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Business No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Counry
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Representative
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Phone No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className=" ">
              {loading ? (
                <PageLoading />
              ) : companies?.length === 0 ? (
                <NotFound />
              ) : (
                companies.map((company) => (
                  <CompanyInformationRow company={company} key={company.id} />
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>
    </>
  );
};

export default CompanyInformationTable;
