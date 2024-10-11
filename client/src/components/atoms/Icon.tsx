import React from 'react';
import { IconType } from 'react-icons';
import { IoHomeOutline,IoCloseOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { FiUser,FiSettings } from "react-icons/fi";
import { CiSearch,CiBoxList } from "react-icons/ci";
import {FaChevronDown, FaRegSun } from 'react-icons/fa';
import { PiMoonStars } from "react-icons/pi";
import { LuBellDot } from "react-icons/lu";
import { IoAdd,IoEyeOutline } from "react-icons/io5";



interface IconProps {
  name: string;
  className?: string;
}

const icons: { [key: string]: IconType } = {
  'tachometer-alt': IoHomeOutline,
  'list': CiBoxList,
  'comments': BiMessageDetail,
  'chart-bar': CgNotes,
  'user': FiUser,
  'cog': FiSettings,
  'chevron-down': FaChevronDown,
  'moon': PiMoonStars,
  'bell': LuBellDot,
  'plus': IoAdd,
  'close': IoCloseOutline,
  'search': CiSearch,
  'eye': IoEyeOutline,
  'sun': FaRegSun
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={`w-6 h-6 ${className}`} />;
};