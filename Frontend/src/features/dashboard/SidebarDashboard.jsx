import { useState } from "react"
import {
    User,
    Info,
    Settings,
    FileText,
    FileSpreadsheet,
    Monitor,
    Headphones,
    ChevronDown,
    ChevronUp,
   
  } from "lucide-react"
  import sidebarlogo from "../../assets/aioceaneye_logo.png"
  import versionlogo from "../../assets/version_icon.png"
import { Link } from "react-router-dom"
const SidebarDashboard = () => {

  

  const [expandedMenus, setExpandedMenus] = useState({                                  
    info: false,
    settings: true,
    logs: false,
  })

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }
  return (
   <>
    <div className="h-screen flex  bg-[#f8f9fe]">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-primary text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-b border-[#3B5BDC]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white">
              <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        <img src={sidebarlogo} alt="logo"  className="w-full h-full"/>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 sticky top-0">
        <div className="space-y-1">
          {/* User Info */}
          <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
            <div className="flex items-center gap-3">
              <User size={20} />
              <span>Real-time Information</span>
            </div>
          </button>

          {/* Info Section */}
          <div>
            <button
              onClick={() => toggleMenu("info")}
              className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md"
            >
              <div className="flex items-center gap-3">
                <Info size={20} />
                <span>Information Statistics</span>
              </div>
              {expandedMenus.info ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Settings Section */}
          <div>
            <button
              onClick={() => toggleMenu("settings")}
              className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md"
            >
              <div className="flex items-center gap-3">
                <Settings size={20} />
                <span>Work Statistics</span>
              </div>
              {expandedMenus.settings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedMenus.settings && (
              <div className="ml-9 mt-1 space-y-1">
                <Link to="" className="block p-2 hover:bg-[#3B5BDC] rounded-md">
                Flight record
                </Link>
                <a href="#" className="block p-2 text-[#8BA2FB] hover:bg-[#3B5BDC] rounded-md">
                Work Assignment
                </a>
                <a href="#" className="block p-2 hover:bg-[#3B5BDC] rounded-md">
                Pilot Work Schedule
                </a>
                <a href="#" className="block p-2 hover:bg-[#3B5BDC] rounded-md">
                Report
                </a>
              </div>
            )}
          </div>

          {/* Documents */}
          <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span>Document</span>
            </div>
          </button>

          {/* Dashboard */}
          <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
            <div className="flex items-center gap-3">
              <Monitor size={20} />
              <span>Admin Dashboard</span>
            </div>
          </button>

          {/* Logs Section */}
          <div>
            <button
              onClick={() => toggleMenu("logs")}
              className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet size={20} />
                <span>Flight log</span>
              </div>
              {expandedMenus.logs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Help Center */}
          <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
            <div className="flex items-center gap-3">
              <Headphones size={20} />
              <span>Help Center</span>
            </div>
            
          </button>
        </div>
      </nav>

      {/* Version */}
      <div className="flex  items-center gap-3 px-4 pb-5" >
      <img src={versionlogo} alt="logo" className="w-6 h-6" />
     <span> ver. 0.9.0</span>
       </div>
    </div>
    </div>
    
   </>
  )
}

export default SidebarDashboard