import React, { useEffect, useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { NavBar } from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  role: string;
}

export const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.role;
    if (role !== null && role == "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setUsers(response.data);
    } else {
      toast.info("Forbidden Resource");
    }
  };
  useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);
  return (
    <div>
      <NavBar />
      <h1 className="text-2xl text-center p-4 text-white uppercase">
        manage users
      </h1>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ">
                    {users.map((user) => {
                      return (
                        <tr key={user.id} className="bg-gray-800 text-white ">
                          <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap ">
                            {user.firstName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap ">
                            {user.lastName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap ">
                            {user.email}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            <button
                              hidden={user.role == "ADMIN"}
                              onClick={async () => {
                                const response = await custom_axios.delete(
                                  ApiConstants.USER.DELETE(user.id),
                                  {
                                    headers: {
                                      Authorization:
                                        "Bearer " +
                                        localStorage.getItem("token"),
                                    },
                                  }
                                );
                                await getAllUsers();
                                toast.success("User Deleted Successfully!!");
                              }}
                              className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl "
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
