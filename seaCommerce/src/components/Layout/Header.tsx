import React from 'react';
import { useAppSelector } from "@/store"; 
import { useNavigate } from 'react-router-dom'; 
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { PiSignOutLight } from "react-icons/pi";
import useAuth from '@/utils/hooks/useAuth';
import { Badge } from '@material-tailwind/react';
import { IoHomeSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { toast } from 'react-toastify';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const {signOut} = useAuth();
  const {avatar, userName, email} = useAppSelector((state) => state.auth);
  const {cartItems} = useAppSelector((state) => state.product);

  const handleSignOut = async() => {
    await signOut();
    toast.success('You have signed out successfully. Welcome back anytime!'); 
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="flex flex-col md:flex-row justify-between items-center p-3 mx-4 md:mx-32">
        <div className="flex items-center justify-between w-full">
          <IoHomeSharp 
            onClick={() => navigate('/')} 
            className="text-3xl cursor-pointer text-blue-800" 
          />
          <nav className="flex items-center gap-4 md:gap-5">
            <Menu>
              <MenuHandler>
                <div>
                  <Badge content={cartItems?.length}>
                    <Button 
                      className="flex items-center gap-2 md:gap-3" 
                      onClick={() => navigate('/cart')}
                    >
                      <FaCartPlus className="text-lg" /> 
                      <span className="hidden md:inline">Cart</span> {/* Hide text on small screens */}
                    </Button>
                  </Badge>
                </div>
              </MenuHandler>
              <MenuHandler>
                <div className="flex items-center gap-2 md:gap-3">
                  <Avatar 
                    size="sm" 
                    className="cursor-pointer" 
                    src={avatar || 'https://docs.material-tailwind.com/img/face-2.jpg'} 
                    alt="avatar" 
                  />
                  <span className="hidden md:inline">{userName}</span> {/* Hide name on small screens */}
                </div>
              </MenuHandler>
              <MenuList className="w-10 md:w-60 lg:w-80 max-w-full p-0">
                <MenuItem>
                  <div className="flex gap-2 items-center">
                    <Avatar 
                      size="sm" 
                      className="cursor-pointer" 
                      src={avatar || 'https://docs.material-tailwind.com/img/face-2.jpg'} 
                      alt="avatar" 
                    />
                    <div>
                      <div>
                        <span>{userName}</span>
                      </div>
                      <div className='hidden md:inline'>
                        <span className="text-gray-500">{email}</span>
                      </div>
                    </div>
                  </div>
                </MenuItem>
                <hr />
                <MenuItem>
                  <div className="flex gap-2 items-center">
                    <PiSignOutLight />
                    <span onClick={handleSignOut} className="cursor-pointer">
                      Sign Out
                    </span>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
