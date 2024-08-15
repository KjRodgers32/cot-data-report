import { useState } from 'react';
import Hamburger from 'hamburger-react';

const NavBar = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className='flex flex-row justify-between w-full bg-main-white items-center px-3'>
      <h1 className='text-main-purple font-bold text-[24px]'>Trade Warden</h1>
      <Hamburger toggled={opened} toggle={setOpened} size={18} />
    </div>
  )
}

export default NavBar;
