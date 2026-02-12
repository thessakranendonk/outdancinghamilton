// "use client"

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
//       password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
//     ) {
//       sessionStorage.setItem("isAdmin", "true");
//       router.push("/admin/dashboard");
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <main className="p-8 max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full rounded"
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // Call an API route to set an HTTP-only cookie
      const res = await fetch("/api/admin/login", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Login failed");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="p-8 mt-20 max-w-md mx-auto">
      <h1 className="text-2xl md:text-4xl text-center text-brand-pink font-bold font-bungee mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded font-quicksand">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded text-md md:text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded text-md md:text-lg"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="flex-0 bg-brand-pop px-8 md:px-10 py-2 text-sm font-medium md:text-lg text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg md:rounded-l-lg border-2 border-pink-400"
        >
          Login
        </button>
        
      </form>
    </main>
  );
}

