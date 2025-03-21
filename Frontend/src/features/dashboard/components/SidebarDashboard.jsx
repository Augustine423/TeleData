import { useState } from "react";
import {
  User,
  Settings,
  FileText,
  FileSpreadsheet,
  Monitor,
  Headphones,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import sidebarlogo from "../../../assets/aioceaneye_logo.png";
import versionlogo from "../../../assets/version_icon.png";
import InformationList from "../datamanage/shipcompany/components/InformationList";
import { Link, useLocation } from "react-router-dom";
import { setSelectedItem } from "../../../stores/selectedItem/selectedItemSlice";
import { useDispatch } from "react-redux";
import { useTranslations } from '../../../components/Language';
import { FaDotCircle } from "react-icons/fa";
// import RealTimeInfo from "../control/components/RealTimeInfo";


const SidebarDashboard = () => {

  const t = useTranslations();
  const dispatch = useDispatch();
  const loc = useLocation();

    const handleSelectItem = (item) => {
      dispatch(setSelectedItem(item)); // Dispatch the action to update selectedItem
    };

    const [expandedMenus, setExpandedMenus] = useState({
      info: false,
      settings: false,
      logs: false,
    });

    const toggleMenu = (menu) => {
      setExpandedMenus((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    };

    
  return (
    <>
      {/* Sidebar */}
      <div className={`w-1/6 ${loc.pathname == "/dashboard" ? "h-screen" : "min-h-full"} bg-primary text-white flex flex-col overflow-scroll`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-[#3B5BDC] flex mt-auto sticky top-0 z-50 bg-primary">
          <img src={sidebarlogo} alt="sidebarlogo" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 sticky">
          <div className="space-y-1">
            {/* User Info */}
            <Link to="/dashboard" className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md" onClick={() => handleSelectItem("Flight Map")}>
            <div className="flex items-center gap-3">
              <User size={20} />
              <span>{t.flightMap}</span>
            </div>
          </Link>

            {/* Info Section */}

            <InformationList
              title= {t.information}
              links={[
                {
                  label: t.companies,
                  path: "/dashboard/company-overview",
                },
                { label: t.vessels, path: "/dashboard/vessel-overview" },
                { label: t.pilot, path: "#pilot" },
                { label: t.drone, path: "#drone" },
                { label: t.mechanic, path: "#mechanic" },
                { label: t.material, path: "#material" },
              ]}
            />

            {/* Settings Section */}
            <div>
              <button
                onClick={() => toggleMenu("settings")}
                className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} />
                  <span>{t.work}</span>
                </div>
                {expandedMenus.settings ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {expandedMenus.settings && (
                <div className=" mt-1 space-y-1">
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center "
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.flightRecord}
                  </a>
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center"
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.workAssignment}
                  </a>
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center"
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.pilotWorkSchedule}
                  </a>
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center"
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.report}
                  </a>
                </div>
              )}
            </div>

            {/* Documents */}
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
              <div className="flex items-center gap-3">
                <FileText size={20} />
                <span>{t.document}</span>
              </div>
            </button>

            {/* Dashboard */}
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
              <div className="flex items-center gap-3">
                <Monitor size={20} />
                <span>{t.dashboard}</span>
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
                  <span>{t.flightLog}</span>
                </div>
                {expandedMenus.logs ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {expandedMenus.logs && (
                <div className="mt-1 space-y-1">
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center"
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.flightLog}
                  </a>
                  <a
                    href="#"
                    className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2 flex justify-start items-center"
                  >
                    <FaDotCircle className="mr-2 text-[6px] opacity-0.5"/>{t.videoGallery}
                  </a>
                </div>
              )}
            </div>

            {/* Help Center */}
            <Link to="/dashboard/helpcenter" className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md">
              <div className="flex items-center gap-3" onClick={() => handleSelectItem(t.helpCenter)}>
                <Headphones size={20} />
                <span>{t.helpCenter}</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Version */}
        <div className="flex items-center gap-3 px-4 pb-5">
          <img src={versionlogo} alt="logo" className="w-6 h-6" />
          <span> ver. 0.9.0</span>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
