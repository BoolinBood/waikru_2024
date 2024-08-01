export function truncateString(
  str: string,
  maxLength: number,
  truncationMarker: string = "..."
): string {
  if (str.length > maxLength) {
    const truncateLength = maxLength - truncationMarker.length;
    return str.slice(0, truncateLength) + truncationMarker;
  }
  return str;
}
