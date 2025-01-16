import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
  	<div id="mainlayout">
		<Navbar />
		<div id="page">
			<div id="leftrail">[left]</div>
			<div id="content">
				<Outlet />
				[endright]
			</div>
		</div>
		{/* <ToastContainer /> */}
	</div>
	)
}

export default MainLayout