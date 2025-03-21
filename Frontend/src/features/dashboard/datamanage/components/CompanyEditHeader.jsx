import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const CompanyEditHeader = () => {
  const { id } = useParams();

  const [activeButton] = useState("companyedit");

  return (
    <>
      {/* Navigation Tabs */}
      <div className="flex gap-8 pt-6 px-8 border-b border-gray-200 pb-4">
        <Link
          to={`/dashboard/company-detail/${id}`}
          className={`pb-3 text-lg font-medium transition-all ${
            activeButton === "overview"
              ? "text-primary border-b-4 border-primary font-semibold"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Overview
        </Link>
        <button
          className={`pb-3 text-lg font-medium transition-all ${
            activeButton === "companyedit"
              ? "text-primary border-b-4 border-primary font-semibold"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Company Edit
        </button>
      </div>

      {/* Header */}

      <header className="flex flex-col lg:flex-row items-center justify-between py-6 lg:gap-4 pl-10">
        <h1 className="text-2xl font-semibold text-black">
          {activeButton === "company-edit" ? "overview" : "Company Edit"}
        </h1>
      </header>
    </>
  );
};

export default CompanyEditHeader;
