import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import loginLogo from "../../../assets/Logo.png";
import { IoMdCheckmark } from "react-icons/io";
import { BiSolidDownArrow } from "react-icons/bi";
import UserRegister from "./UserRegister";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../../stores/language/languageSlice';
import { useTranslations } from '../../../components/Language';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [languageSelectBoxVisible, setLanguageSelectBoxVisible] = useState(false);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslations();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleRememberMe = () => {
    setRememberMe(prev => !prev);
  };

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    setLanguageSelectBoxVisible(false);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  console.log(t)

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col font-pretendard">
      {registerFormVisible && 
        <UserRegister registerFormVisible={registerFormVisible} setRegisterFormVisible={setRegisterFormVisible} />}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col justify-center items-center bg-primary p-16 rounded-xl text-[14px]"
      >
        <img src={loginLogo} alt="logo" />
        <div className="w-full bg-transparent flex flex-col justify-center items-center text-white gap-3 mt-10">
          <h1 className="text-6xl font-bold">{t.welcome}</h1>
          <span>{t.signIn}</span>
        </div>

        <div className="w-full bg-transparent flex justify-end items-center text-white gap-3 mt-5">
          <div>
            <div className="relative cursor-pointer" onClick={() => setLanguageSelectBoxVisible(!languageSelectBoxVisible)}>
              <div className="flex justify-center items-center gap-1">
                <span>{t.lang}</span>
                <BiSolidDownArrow size="15px" />
              </div>
              
              {languageSelectBoxVisible && (
                <div className="absolute top-8 right-0 bg-transparent backdrop-blur-sm text-white border-0.5 rounded-md min-w-20">
                  <ul className="bg-transparent">
                    <li onClick={() => handleLanguageChange("ENG")} className="p-2 flex justify-center items-center border-b-0.5">English</li>
                    <li onClick={() => handleLanguageChange("KOR")} className="p-2 flex justify-center items-center">한국어</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full bg-transparent flex flex-col text-white gap-1 mt-5">
          <label>{t.usernameOrEmail}</label>
          <input 
            type="text" 
            placeholder={t.usernameOrEmailPlaceholder}
            className="p-2 rounded-md border-0.5 bg-primary"
            {...register("email", { required: t.emailRequired })}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div className="w-full bg-transparent flex flex-col text-white gap-1 mt-5 relative">
          <label>{t.password}</label>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder={t.passwordPlaceholder}
            className="p-2 rounded-md border-0.5 bg-transparent"
            {...register("password", { required: t.passwordRequired })}
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          {showPassword ? (
            <IoMdEyeOff className="absolute right-2 top-[36px] cursor-pointer" size="20px" onClick={handleShowPassword} />
          ) : (
            <IoMdEye className="absolute right-2 top-[36px] cursor-pointer" size="20px" onClick={handleShowPassword} />
          )}
        </div>
        <div className="w-full bg-transparent flex justify-between items-center text-white gap-1 mt-5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border-0.5 flex items-center justify-center cursor-pointer" onClick={handleRememberMe}>
              {rememberMe && <IoMdCheckmark size="20px" />}
            </div>
            <label>{t.rememberMe}</label>
          </div>
          <div className="cursor-pointer">{t.forgotPassword}</div>
        </div>
        <div className="w-full bg-transparent flex justify-between text-primary gap-1 mt-8">
          <button 
            type="submit"
            className="w-full flex justify-center items-center p-3 rounded-md border bg-white font-semibold tracking-wide"
            onClick={navigateToDashboard}>
            {t.login}
          </button>
        </div>
        <hr className="bg-white w-full mt-10" />
        <div className="w-full bg-transparent flex justify-center text-white gap-3 mt-5" onClick={() => setRegisterFormVisible(true)}>
          <span className="text-sm">{t.newMember}</span>
          <span className="text-sm font-bold cursor-pointer">{t.register}</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;