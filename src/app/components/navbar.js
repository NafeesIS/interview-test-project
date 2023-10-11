"use client";
import { AuthContext } from "@/provider/AuthProvider";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user.photoURL);
  const pathname = usePathname();
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "All Posts",
      href: "/allpost",
    },
    {
      title: "Category",
      href: "/category",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // Show a success notification
      toast.success("logout successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        {navItems.map((link, index) => (
          <Link key={index} href={link.href} className={pathname === link.href ? "text-blue-500 font-bold" : ""}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center">
            <Image src={user.photoURL} alt="Profile" width={32} height={32} className="rounded-full mr-2" />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
