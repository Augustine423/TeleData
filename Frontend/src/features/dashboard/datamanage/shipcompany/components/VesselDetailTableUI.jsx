import NotFound from "../../../../../components/NotFound";
import CompanyDetailRowUI from "./VesselDetailRowUI";

const  VesselDetailTableUI= ({ company }) => {
  if (!company || !company.vessels?.length) {
    return <NotFound message="No vessels found." />;
  }

  return (
    <div className="p-6  ">
      <div className="overflow-x-auto ">
        <table className="w-full min-w-max ">
          {/* Table Header */}
          <thead className="bg-gray-200 ">
            <tr className="text-left text-sm font-medium text-gray-600 ">
              <th className="px-4 py-3 rounded-tl-lg">Image</th>
              <th className="px-4 py-3">Vessels</th>
              <th className="px-4 py-3">Flag</th>
              <th className="px-4 py-3">IMO</th>
              <th className="px-4 py-3">MMSI</th>
              <th className="px-4 py-3 rounded-tr-lg">Call Sign</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 border-y-2">
            {company.vessels.map((vessel) => (
              <CompanyDetailRowUI key={vessel.id} vessel={vessel} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VesselDetailTableUI;
