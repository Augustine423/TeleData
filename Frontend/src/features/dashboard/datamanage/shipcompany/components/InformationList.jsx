
import { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "../../../../../stores/selectedItem";
import { FaDotCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const InformationList = ({ title, links }) => {
  const dispatch = useDispatch();

  const [expandedMenus, setExpandedMenus] = useState(false);

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSelectItem = (item) => {
    dispatch(setSelectedItem(item)); // Dispatch the action to update selectedItem
  };


  return (
    <div className="w-full">
      <button
        onClick={() => toggleMenu("info")}
        className="w-full flex items-center justify-between p-2 hover:bg-[#3B5BDC] rounded-md"
      >
        <div className="flex items-center gap-3">
          <Info size={20} />
          <span>{title}</span>
        </div>
        {expandedMenus.info ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>
      {expandedMenus.info && (
        <div className="mt-1 space-y-1 w-full">
            {/* eslint-disable-next-line react/prop-types*/}
            {links.map((link, index) => (
              <div key={index} className="py-2 px-2 pl-5 hover:bg-[#3B5BDC] rounded-md w-full mb-2">
                <Link
                  to={link.path}
                  className="flex justify-start items-center rounded-md text-base text-white w-full"
                  onClick={() => handleSelectItem(link.label)} // Corrected onClick
                >
                  <FaDotCircle className="mr-2 text-[6px] opacity-0.5" />{link.label}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default InformationList;