import React, { Suspense } from 'react'
import Header from './Header'
import PageLoading from '../../../components/PageLoading'
import Footer from '../../../components/Footer'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <main className=" flex flex-col min-h-screen">
      <Header/>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </main>
  )
}

export default PublicLayout