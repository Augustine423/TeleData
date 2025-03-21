import {  Suspense } from "react";
import PageLoading from "../components/PageLoading";
import LoginPage from "../features/auth/pages/LoginPage";
import Test from "../test";



const authRoute = [
  {
    path: "/login",// Ensure login is at the root level
    element: (
      <Suspense fallback={<PageLoading />}>
        <LoginPage />
        {/* <Test/> */}
      </Suspense>
    ),
  },

];

export default authRoute;