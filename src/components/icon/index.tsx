import React from "react";
import { svg } from "@/assests";

type IconName = keyof typeof svg;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const IconName = svg[name];

  if (!IconName) {
    console.error(`Ícone "${name}" não encontrado.`);
    return null;
  }

  return <IconName size={size} className={className} />;
};
