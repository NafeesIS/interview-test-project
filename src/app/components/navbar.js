"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
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
  return (
    <div className="flex gap-5">
      {navItems.map((link, index) => (
        <Link key={index} href={link.href} className={pathname === `${link.href}` ? "text-blue-500 font-bold" : ""}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
