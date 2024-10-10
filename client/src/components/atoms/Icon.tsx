import React from 'react';
import { IconType } from 'react-icons';
import { IoHomeOutline,IoCloseOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaHome, FaList, FaComments, FaChartBar, FaUser, FaCog, FaChevronDown, FaMoon, FaBell,FaPlus } from 'react-icons/fa';

interface IconProps {
  name: string;
  className?: string;
}

const icons: { [key: string]: IconType } = {
  'tachometer-alt': IoHomeOutline,
  'list': BiMessageDetail,
  'comments': FaComments,
  'chart-bar': FaChartBar,
  'user': FiUser,
  'cog': FaCog,
  'chevron-down': FaChevronDown,
  'moon': FaMoon,
  'bell': FaBell,
  'plus': FaPlus,
  'close': IoCloseOutline,
  'search': CiSearch,
  'eye': MdOutlineRemoveRedEye
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={`w-6 h-6 ${className}`} />;
};