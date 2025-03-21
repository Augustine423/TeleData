import { useDispatch, useSelector } from "react-redux";
import { fetchVessels } from "../../../../../stores/informationData/vesselSlice";
import { useEffect } from "react";
import Pagination from "../../../../../components/Pagination";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
// import image from "../../../../../assets/vesselPhoto/shipimage.jpg"


const VesselsGridView = () => {
  const dispatch = useDispatch();

  const { vessels, loading, error } = useSelector(
    (state) => state.vessels|| {}
  );
  

  useEffect(() => {
    dispatch(fetchVessels());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(vessels);

  return (
    <>
    
    <div className="">
      {/* Grid Content */}
      <div className="p-6  shadow-xl rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vessels.map((vessel, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden w-full max-w-sm bg-[#FFFFFF]"
            >
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-[#111111] text-lg">{vessel.name}</h3>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[3/2] w-full h-[166px] p-4 flex items-center ">
                <img
                  src={vessel.image}
                  alt={vessel.name}
                  className="w-full h-full  object-contain bg-[#EEEEEE] rounded-lg"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Flag:</span>
                  <span className="text-black">
                    {vessel.flag}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">IMO:</span>
                  <span className="text-black">{vessel.IMO}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">MMSI:</span>
                  <span className="text-black">{vessel.MMSI
                  }</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Call Sign:</span>
                  <span className="text-black">{vessel.callSign}</span>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  // eslint-disable-next-line no-undef
                  to={`/dashboard/vessel-detail/${vessel.id}`}
                  className="block w-full py-2 text-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Pagination />
      </div>
    
    </div>
    </>
  )
}

export default VesselsGridView