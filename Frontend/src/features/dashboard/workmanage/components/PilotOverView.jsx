import { useState } from "react"
import { Search } from "lucide-react"


const pilots = [
    {
      name: "User_1",
      pilotNo: "91-137507",
      country: "Korea",
      passportNo: "M31222353",
      personalNo: "1029424",
      photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KNz4zpdjH0fMpRXrhylEWeiHSYtyG2.png",
    },
    // Repeated data for demonstration
    ...Array(8).fill({
      name: "User_1",
      pilotNo: "91-137507",
      country: "Korea",
      passportNo: "M31222353",
      personalNo: "1029424",
      photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KNz4zpdjH0fMpRXrhylEWeiHSYtyG2.png",
    }),
  ]
const PilotOverView = () => {

    const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const filteredPilots = pilots.filter((pilot) => pilot.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="w-full p-7 space-y-22">
    <div className="flex border-b">
      <button
        className={`px-4 py-2 ${
          activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("overview")}
      >
        Overview
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "register" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("register")}
      >
        Register
      </button>
    </div>

    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Quick Search in Pilot Name"
        className="w-full pl-10 pr-4 py-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="border rounded-4g overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pilot No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Passport No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Personal No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPilots.map((pilot, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.pilotNo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.passportNo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.personalNo}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                  <img src="/placeholder.svg" alt="Pilot photo" className="h-full w-full object-cover" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default PilotOverView