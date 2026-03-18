'use client';

import { forwardRef } from 'react';
import Button from './Button';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ className = "" }, ref) => {
  return (
    <nav
      ref={ref}
      className={` w-full z-50 ${className}`}
      style={{
        visibility : "hidden"
      }}
    >
      <div className="flex justify-between items-center px-5 lg:px-7.5 xl:px-10 py-5 ">
        <div className="font-bold tracking-wider whitespace-nowrap">|| Srikar ||</div>
        <div className="lg:flex hidden text-xs">
          <Button href='#about'>
            About
          </Button>
          <Button href='#work'>
            Work
          </Button>
          <Button href='#contact'>
            Contact
          </Button> 
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
