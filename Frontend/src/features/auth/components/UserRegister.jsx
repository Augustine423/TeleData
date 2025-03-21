import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useTranslations } from '../../../components/Language';

// eslint-disable-next-line react/prop-types
const UserRegister = ({ registerFormVisible, setRegisterFormVisible }) => {
  const { register, handleSubmit, setValue } = useForm();
  const t = useTranslations();
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  // Auto move to next input after 4 digits
  const handlePhoneInput = (e, nextRef) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4); // Only numbers, max 4 digits
    setValue(e.target.name, value);
    
    if (value.length === 4 && nextRef) {
      nextRef.current.focus();
    }
  };

  if (!registerFormVisible) return null;

  return (
    <div 
      className="w-screen h-screen bg-opacity-60 bg-slate-500 absolute z-49 flex justify-center items-center font-pretendard"
      onClick={() => setRegisterFormVisible(false)}
    >
      <div 
        className="xl:w-2/5 xs:w-full bg-white flex flex-col justify-center items-center rounded-md shadow-sm z-50 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-lg font-semibold text-start border-b-2 pb-4">{t.membershipRegister}</div>

        {/* Register Form */}
        <form 
          className="w-full flex flex-col justify-center items-center gap-6 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div className="w-full flex justify-start items-center">
            <label className="w-1/4 font-semibold">{t.name}</label>
            <input
              type="text"
              placeholder={t.namePlaceholder}
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div className="w-full flex justify-start items-center overflow-hidden relative">
            <label className="w-1/4 font-semibold">{t.email}</label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md"
              {...register("email")}
            />
            <div className="w-1/4 flex items-center justify-start">
              <button type="button" className="w-40 text-center outline-none rounded-md bg-blue-100 border-0.5 pt-3 pb-3 pr-8 pl-8 ml-2 text-primary font-semibold text-sm">
                {t.reCertified}
              </button>
            </div>
            <div className="p-1 flex justify-center items-center absolute right-48 text-sm">05:00</div>
          </div>

          {/* Email Check */}
          <div className="w-full flex justify-start items-center">
            <label className="w-1/4 font-semibold"></label>
            <input
              type="email"
              placeholder={t.emailCheckPlaceholder}
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md"
              {...register("emailCheck")}
            />
            <div className="w-1/4 flex items-center justify-start">
              <button type="button" className="w-40 text-center outline-none rounded-md bg-gray-100 border-0.5 pt-3 pb-3 pr-8 pl-8 ml-2 text-gray-600 font-semibold text-sm">
                {t.check}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="w-full flex justify-start items-center">
            <label className="w-1/4 font-semibold">{t.password}</label>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md"
              {...register("password")}
            />
          </div>

          {/* Password Check */}
          <div className="w-full flex justify-start items-center">
            <label className="w-1/4 font-semibold">{t.passwordCheck}</label>
            <input
              type="password"
              placeholder={t.confirmPassword}
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md"
              {...register("passwordCheck")}
            />
          </div>

          {/* User Rating */}
          <div className="w-full flex justify-start items-center">
            <label className="w-1/4 font-semibold">{t.userRating}</label>
            <select
              className="w-2/4 p-2 border-2 border-gray-300 rounded-md text-gray-400 cursor-pointer"
              {...register("userRating")}
            >
              <option value="Company">{t.company}</option>
              <option value="Captain">{t.captain}</option>
              <option value="Pilot">{t.pilot}</option>
              <option value="Mechanic">{t.mechanic}</option>
            </select>
          </div>

          {/* Divider */}
          <div className="w-full">
            <hr />
          </div>

          {/* Phone Number */}
          <div className="w-full flex justify-start items-center mb-10">
            <label className="w-1/4 font-semibold">{t.phoneNo}</label>
            <div className="w-3/4 flex justify-start items-center gap-2">
              <input
                type="text"
                className="w-24 p-2 border-2 border-gray-300 rounded-md text-center"
                maxLength="4"
                {...register("phone1")}
                ref={phone1Ref}
                onChange={(e) => handlePhoneInput(e, phone2Ref)}
              />
              <b>-</b>
              <input
                type="text"
                className="w-24 p-2 border-2 border-gray-300 rounded-md text-center"
                maxLength="4"
                {...register("phone2")}
                ref={phone2Ref}
                onChange={(e) => handlePhoneInput(e, phone3Ref)}
              />
              <b>-</b>
              <input
                type="text"
                className="w-24 p-2 border-2 border-gray-300 rounded-md text-center"
                maxLength="4"
                {...register("phone3")}
                ref={phone3Ref}
                onChange={(e) => handlePhoneInput(e, null)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center items-center gap-2">
            <button
              type="button"
              className="outline-none rounded-md bg-transparent border-0.5 pt-2 pb-2 pl-12 pr-12 text-gray-600 font-semibold text-sm"
              onClick={() => setRegisterFormVisible(false)}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="outline-none rounded-md bg-blue-100 border-0.5 pt-2 pb-2 pl-12 pr-12 text-primary font-semibold text-sm"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;