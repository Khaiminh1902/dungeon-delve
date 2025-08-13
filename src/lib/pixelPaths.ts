export function classIconPath(c: string): string {
  switch (c) {
    case "Knight":
      return "/pixel/weapons/sword.svg";
    case "Mage":
      return "/pixel/weapons/staff.svg";
    case "Archer":
      return "/pixel/weapons/bow.svg";
    case "Rogue":
      return "/pixel/weapons/daggers.svg";
    default:
      return "/pixel/weapons/sword.svg";
  }
}

export function raceIconPath(r: string): string {
  switch (r) {
    case "Human":
      return "/pixel/races/human.svg";
    case "Elf":
      return "/pixel/races/elf.svg";
    case "Dwarf":
      return "/pixel/races/dwarf.svg";
    case "Orc":
      return "/pixel/races/orc.svg";
    case "Goblin":
      return "/pixel/races/orc.svg";
    default:
      return "/pixel/races/human.svg";
  }
}

