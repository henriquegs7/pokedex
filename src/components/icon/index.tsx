import React from "react";
import Image from "next/image"
import { Icons } from "@/icons";

type IconName = keyof typeof Icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const IconName = Icons[name];

  if (!IconName) {
    console.error(`Ícone "${name}" não encontrado.`);
    return null;
  }

  return name.includes("SVG") ?
    <IconName width={size} height={size} className={className} /> :
    <Image src={IconName} alt={name} width={size} height={size} className={className} />;
};
