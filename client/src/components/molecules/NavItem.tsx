import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
}


export const NavItem: React.FC<NavItemProps> = ({to,icon,label}) => (
    <Link to = {to} className="hover:text-gray-300 flex items-center">
        <Icon name={icon} className="mr-2"/>
        <Text>{label}</Text>
    </Link>
);