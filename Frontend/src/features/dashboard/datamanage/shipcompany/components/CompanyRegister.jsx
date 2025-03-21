
import { useForm } from "react-hook-form";
import { Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  fetchCompanies,
} from "../../../../../stores/informationData/companySlice";

const CompanyRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const companies = useSelector((state) => state.companies.companies); // Getting the current company list

  const onSubmit = async (data) => {
    try {
      await dispatch(addCompany(data)).unwrap(); // Dispatching the action to add the company
      dispatch(fetchCompanies());
      navigate("/dashboard/company-overview"); // Optionally, you can refetch the company list after successfully adding a new one
      reset();
    } catch (error) {
      console.error("Error while saving company:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md px-6 mx-6 md:p-8 h-[800px] xl:mb-10 ">
        <form onSubmit={handleSubmit(onSubmit)} className="h-[518px] pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Upload */}
            <div className="col-span-1 h-36 mt-10 md:mt-20">
              <div className="w-64 relative">
                <div className="bg-gray-300 rounded-md h-36 flex flex-col items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-500" />
                  <div className="text-center mt-2 text-gray-600">
                    <div>Upload Logo Image</div>
                    <div className="text-xs">(jpeg, bmp, png)</div>
                  </div>
                  <input
                    type="file"
                    {...register("logo")}
                    className="absolute opacity-0 w-full h-[150px] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {/* Companies Name */}
                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    Companies Name
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("companyName", {
                        required: "Company Name is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Business No */}
                <div className="flex items-start">
                  <label className="w-40 text-sm font-medium mt-2">
                    Business No
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("business_no", {
                        required: "number is required",
                      })}
                      placeholder="Please Enter"
                      className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.business_no&& (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.business_no.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="ml-2 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    File
                  </button>
                </div>

                {/* Country */}
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Country</label>
               
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("country", {
                        required: "Country  is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
               
                </div>

                {/* Homepage */}
                <div className="flex items-center col-span-1 w-full">
                  <label className="w-24 text-sm font-medium mb-2">
                    Homepage
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("homepage", {
                        required: "Home Link is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.homepage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.homepage.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Establishment Year */}

                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    Establishment Year
                  </label>
                  <div className="flex-1">
                    {/* ! api name */}
                    <input
                      type="date"
                      {...register("establishment_year", {
                        required: "EstablishmentYear is required",
                      })}
                      placeholder="establishment_yearPlease Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.establishment_year && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.establishment_year.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Employees */}
                <div className="flex items-center col-span-1 w-full">
                  <label className="w-24 text-sm font-medium mt-2">
                    Employees
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("employees", {
                        required: "Employees is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.employees && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.employees.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center col-span-2 w-full">
                  <label className="w-32 text-sm font-medium">Address</label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>

                {/*Company  Phone No */}

                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    Phone No
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("companyPhone", {
                        required: "Company Phone is required",
                        pattern: {
                          value: /^\+\d{1,3}-\d{3}-\d{3}-\d{3}$/, // Regex for +<countryCode>-XXX-XXXX-XXXX
                          message:
                            "Phone number must follow the format: +<countryCode>-XXX-XXXX-XXXX",
                        },
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.companyPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* FAX No */}

                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    FAX No
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("faxNo", {
                        required: "FAX number is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.faxNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.faxNo.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Representative */}
                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    Representative
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("representative", {
                        required: "Representative is required",
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.representative && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.representative.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Second Phone No */}

                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    CEO Phone No
                  </label>
                 
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("ceoPhone", {
                        required: "Company Phone is required",
                        pattern: {
                          value: /^\+\d{1,3}-\d{3}-\d{3}-\d{3}$/, // Regex for +<countryCode>-XXX-XXXX-XXXX
                          message:
                            "Phone number must follow the format: +<countryCode>-XXX-XXXX-XXXX",
                        },
                      })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.ceoPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ceoPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start">
                  <label className="w-32 text-sm font-medium mt-2">
                    E-mail
                  </label>
                  <div className="flex-1">
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder="Please Enter"
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-24">
            <button
              onClick={() => navigate("/dashboard/company-overview")}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-300 rounded-md text-primary hover:bg-primary hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyRegister;
