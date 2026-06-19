import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NavbarProps = {
  rightSlot?: React.ReactNode;
};

const Navbar = ({ rightSlot }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white px-6 py-3 flex items-center justify-between select-none">
      
      {/* LEFT: LOGO */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/resumely.png"
          alt="logo"
          width={120}
          height={120}
        />
      </Link>

      {/* RIGHT: SLOT */}
      <div className="flex items-center gap-2">
        {rightSlot}
      </div>

    </div>
  );
};

export default Navbar;