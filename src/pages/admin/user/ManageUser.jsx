import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../redux/features/auth/authApi";
import { MdModeEdit } from "react-icons/md";
import UpdateUserModal from "./UpdateUserModal";

export default function ManageUser() {
  const { data: user = [], isLoading, isError, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      alert("User deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error in deleting user", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setisModalOpen(true);
  }

  const handleCloseModal = ()=>{
      setisModalOpen(false);
      setSelectedUser(null);
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or Manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {user.users &&
                    user?.users?.map((user, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user?.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span className={`rounded-full py-[2px] px-3 ${user?.role==='admin'? "bg-indigo-500 text-white":"bg-amber-300"}`}>
                            {user?.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button 
                            onClick={()=>handleEdit(user)}
                            className="hover:text-blue-700 flex items-center gap-1 ">
                                <MdModeEdit />
                                Edit
                            {/* <span className="flex items-center gap-1 ">
                              
                            </span> */}
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleDelete(user?._id)}
                            className="bg-red-600 text-white px-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {
        isModalOpen && <UpdateUserModal user={selectedUser} onRoleUpdate={refetch} onClose={handleCloseModal} />     
      }
    </>
  );
}
