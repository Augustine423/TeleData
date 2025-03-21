// eslint-disable-next-line react/prop-types
const VesselDetailRowUI = ({ vessel }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-4 py-3">
        <div className="w-[120px] h-10 bg-gray-50 rounded flex items-center justify-center">
          <img
            // eslint-disable-next-line react/prop-types
            src={vessel.image}
            // eslint-disable-next-line react/prop-types
            alt={vessel.name}
            className="w-[69px] h-auto object-contain"
          />
        </div>
      </td>

      <td className="px-4 py-3 text-sm">{vessel.name}</td>
      <td className="px-4 py-3 text-sm">{vessel.flag}</td>
      <td className="px-4 py-3 text-sm">{vessel.imo}</td>
      <td className="px-4 py-3 text-sm">{vessel.mmsi}</td>
      <td className="px-4 py-3 text-sm">{vessel.call_sign}</td>
    </tr>
  );
};

export default VesselDetailRowUI;
