
export function validAge(birthdate: Date) {
  const birth = new Date(birthdate)
  const date = new Date();
  date?.setFullYear(date.getFullYear() - 18);
  const result = birth?.getFullYear() > date.getFullYear()
  return result
}

export function maxBirthDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return date;
}
export function maxBirthDateAge() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
}
export function minBirthDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 90);
  return date;
}
