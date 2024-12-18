import Link from "next/link";
import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="fixed flex items-center w-screen h-12 px-4 bg-gray-800">
      <Link href={'/'} className="flex text-2xl font-bold text-gray-100">
        <span className="flex gap-1 text-amber-400">
          <FaMoneyBillTransfer className="w-[30px] h-[30px]" />
          BT
        </span>
        Tracker
        </Link>
    </div>
  );
};

export default Navbar;
