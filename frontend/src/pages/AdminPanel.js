import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/SendData";
import ShowProducts from "../childComponent/AdminPanel/ShowProducts";
import ShowUsers from "../childComponent/AdminPanel/ShowUsers";
const AdminPanel = () => {
	const {
		userData,
		setShowUserPanel,
		showUserPanel,
		showProductPanel,
		setShowProductPanel
	} = useContext(UserDataContext);
	useEffect(() => {}, [userData]);
	return (
		<div className="flex-grow w-full relative">
			<div className="relative h-full w-full flex">
				{/* Left Sidebar */}
				<div className="relative h-full w-[20%] min-w-[max-content] shadow-md z-30 rounded">
					{/* Admin Details section */}
					<div className="h-[25%] min-h-[175px] w-full relative">
						<div className="flex justify-center items-center mt-4">
							{userData.profilePic ? (
								<img
									src={userData.profilePic}
									alt="Profile"
									className="h-16 w-16 rounded-full cursor-pointer"
								/>
							) : (
								<img
									src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
									alt="profile"
									className="h-16 w-16 rounded-full cursor-pointer"
								/>
							)}
						</div>
						<div className="justify-center items-center  mt-4 text-center">
							<p className="text-2xl">{userData.firstname}</p>
							<p>{userData.email}</p>
						</div>
					</div>

					{/* Menu section */}
					<div className="flex-col w-full">
						<div
							className="pl-6 cursor-pointer hover:bg-slate-400 rounded"
							onClick={() => {
								setShowUserPanel(true);
								setShowProductPanel(false);
							}}>
							<p>All Users</p>
						</div>
						<div
							className="showProductList pl-6 cursor-pointer hover:bg-slate-400 rounded"
							onClick={() => {
								setShowUserPanel(false);
								setShowProductPanel(true);
							}}>
							<p>Products</p>
						</div>
					</div>
				</div>
				{/* Table Section */}
				{showUserPanel ? (
					<ShowUsers />
				) : (
					showProductPanel && <ShowProducts />
				)}
			</div>
		</div>
	);
};

export default AdminPanel;
