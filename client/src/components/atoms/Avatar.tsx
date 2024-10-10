import React from "react";

interface AvatarProps{
    src : string;
    alt : string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
    <img src={src} alt={alt} className="w-8 h-8 rounded-full" />
  );