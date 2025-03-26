function FormatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().split('-').join(' ');
}

export { FormatName }