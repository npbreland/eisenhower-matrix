export function createTaskId(userId, timeCreated) {
  return `${userId}#${timeCreated}`;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
