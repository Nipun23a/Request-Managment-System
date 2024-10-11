import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ease-in-out
        ${isActive
          ? 'bg-white text-[#830823]'
          : 'hover:bg-white/10 text-white'
        }`}
    >
      <Icon
        name={icon}
        className={`mr-2 transition-colors duration-300 ease-in-out
          ${isActive ? 'text-[#830823]' : 'text-white'}`}
      />
      <Text className={`transition-colors duration-300 ease-in-out
        ${isActive ? 'text-[#830823]' : 'text-white'}`}>
        {label}
      </Text>
    </Link>
  );
};

export const Navigation: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSignOut = () => {
    // Implement your sign out logic here
    console.log('Signing out...');
    // For example, you might clear local storage and redirect to login page
    // localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 gap-2 navigation">
      <NavItem to="/dashboard" icon="tachometer-alt" label="Dashboard" />
      <NavItem to="/requests" icon="list" label="Requests" />
      <NavItem to="/feedbacks" icon="comments" label="Feedbacks" />
      <NavItem to="/reports" icon="chart-bar" label="Reports" />
      <NavItem to="/patient" icon="user" label="Patient" />
      <div className="relative group">
        <button 
          onClick={toggleSettings}
          className="flex items-center px-3 py-2 rounded-md hover:bg-white/10 text-white transition-all duration-300 ease-in-out"
        >
          <Icon name="cog" className="mr-2 text-white" />
          <span>Settings</span>
          <Icon name="chevron-down" className={`ml-1 text-white transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`} />
        </button>
        {isSettingsOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <Icon name="sign-out-alt" className="mr-2 inline" />
                Sign Out
              </button>
              {/* Add more menu items here if needed */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};