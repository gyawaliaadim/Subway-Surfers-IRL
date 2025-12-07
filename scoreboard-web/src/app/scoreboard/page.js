"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const [usersList, setUsersList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "", score: "" });
  const router = useRouter();
  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/userData");
      setUsersList(res.data);
      console.log(res)
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Start editing
  const startEdit = (user) => {
    setEditingId(user.id);
    setEditData({ name: user.name, age: user.age, score: user.score });
  };

  // Save changes
  const saveEdit = async (id) => {
    try {
      await axios.put("/api/userData", { id, ...editData });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete("/api/userData", { data: { id } });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col items-center gap-6 min-h-screen ">
      <div className="w-full max-w-5xl rounded-3xl shadow-lg overflow-x-auto bg-yellow-50">
        <div className="flex justify-between px-4 w-full mt-2">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 text-shadow-2xs">Score Board</h1>

             {/* <button className="flex items-center gap-3 p-2 rounded-xl border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition"> */}
      <div 
      onClick={()=>router.push("/")}
      className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center cursor-pointer hover:bg-yellow-200">
        <span className="text-yellow-600 font-bold text-lg">+</span>
      </div>
    {/* </button> */}
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-yellow-400 text-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-bold uppercase">Picture</th>
              <th className="px-6 py-3 text-left text-lg font-bold uppercase">Name</th>
              <th className="px-6 py-3 text-left text-lg font-bold uppercase">Age</th>
              <th className="px-6 py-3 text-left text-lg font-bold uppercase">Score</th>
              <th className="px-6 py-3 text-center text-lg font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-yellow-100 divide-y divide-gray-200">
            {usersList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              usersList.map((user, index) => (
                <tr key={user.id} className="hover:bg-yellow-200 transition">
                  {editingId === user.id ? (
                    <>
                      <td>
                        <></>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="border px-2 py-1 rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editData.age}
                          onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                          className="border px-2 py-1 rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editData.score}
                          onChange={(e) => setEditData({ ...editData, score: e.target.value })}
                          className="border px-2 py-1 rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => saveEdit(user.id)}
                          className="cursor-pointer bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <><td className="px-6 py-4 flex w-full h-full justify-center items-center">
  {index === 0 ? <p className="text-4xl">🥇</p> : index === 1 ? <p className="text-4xl">🥈</p> : index === 2 ?  <p className="text-4xl">🥉</p> : <p className="text-xl">{index + 1}</p>}
</td>

                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.age} yrs</td>
                      <td className="px-6 py-4">{user.score}</td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
