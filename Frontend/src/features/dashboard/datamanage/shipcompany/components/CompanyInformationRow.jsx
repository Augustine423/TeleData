/* eslint-disable react/prop-types */

import { Ellipsis } from "lucide-react"
import { Link } from "react-router-dom"



const CompanyInformationRow = ({company}) => {

  return (
    
    <><tr  className="hover:bg-gray-100">
    <td className="px-4 py-3">
    <div className=" h-10 bg-gray-50 rounded flex items-center justify-center">
  <img src={company.image} alt="" className="w-[69px] h-auto object-contain" />
</div>

    </td>
  <td className="px-4 py-3 text-sm">{company.companyName}</td>
    <td className="px-4 py-3 text-sm">{company.business_no}</td>
    <td className="px-4 py-3 text-sm">{company.country}</td>
    <td className="px-4 py-3 text-sm">{company.representative}</td>
    <td className="px-4 py-3 text-sm">{company.companyPhone}</td>
    
    <td className="px-4 py-3 text-sm">
      <Link  to={`/dashboard/company-detail/${company.id}`}   className="text-gray-400 hover:text-gray-600"><Ellipsis/></Link>
    </td>
  </tr></>
  )
}

export default CompanyInformationRow