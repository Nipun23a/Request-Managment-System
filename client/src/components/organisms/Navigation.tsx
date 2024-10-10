import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../atoms/Icon';

const NavItem: React.FC<{ to: string; icon: string; label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="hover:text-gray-300 flex items-center">
    <Icon name={icon} className="mr-2" />
    <span>{label}</span>
  </Link>
);

export const Navigation: React.FC = () => (
  <nav className="flex flex-wrap justify-center sm:justify-end items-center space-x-6 gap-2 navigation">
    <NavItem to="/dashboard" icon="tachometer-alt" label="Dashboard" />
    <NavItem to="/requests" icon="list" label="Requests" />
    <NavItem to="/feedbacks" icon="comments" label="Feedbacks" />
    <NavItem to="/reports" icon="chart-bar" label="Reports" />
    <NavItem to="/patient" icon="user" label="Patient" />
    <div className="relative group">
      <button className="hover:text-gray-300 flex items-center">
        <Icon name="cog" className="mr-2" />
        <span>Settings</span>
        <Icon name="chevron-down" className="ml-1" />
      </button>
      {/* Dropdown menu can be added here */}
    </div>
  </nav>
);

