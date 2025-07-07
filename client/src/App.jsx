import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const results = response.data;
      setUsers(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Nama Tidak Boleh Kosong");
      return;
    } else if (email === "") {
      toast.error("Email Tidak Boleh Kosong");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Email Tidak Valid");
      return;
    } else if (age === "") {
      toast.error("Umur Tidak Boleh Kosong");
      return;
    } else if (isNaN(age)) {
      toast.error("Umur Harus Berupa Angka");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name: name,
        email: email,
        age: age,
      });
      // const results = response.data;
      // console.log(results);
      toast.success("Data Berhasil Ditambahkan");
      setAge("");
      setEmail("");
      setName("");
      getUsers();
    } catch (error) {
      console.log(error);
      toast.error("Data Gagal Ditambahkan");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-red-500 font-bold">hello world</h1>

      {/* forms */}
      <form className="flex flex-col gap-2 p-2">
        <label>Nama</label>
        <input
          type="text"
          className="border"
          placeholder="Masukkan Nama"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label>Email</label>
        <input
          type="text"
          className="border"
          placeholder="Masukkan Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label>Umur</label>
        <input
          type="text"
          className="border"
          placeholder="Masukkan Umur"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white"
        >
          Submit
        </button>
      </form>

      {/* Table list user */}
      {users.length === 0 ? (
        <div className="text-center mt-20">
          <p>Tidak Ada Data</p>
        </div>
      ) : (
        <table className="table-auto border border-collapse w-full ">
          <thead>
            <tr className="bg-gray-300">
              <th className="border ">id</th>
              <th className="border ">Nama</th>
              <th className="border ">Email</th>
              <th className="border ">Umur</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.age} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
}
