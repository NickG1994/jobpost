import bcrypt from 'bcryptjs';
export const useAuthUtils = () => {
const bcrypt_hash_password = (password: string): string => {
  try {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
 }

const bcrypt_verify_password = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);  
}
return { bcrypt_hash_password, bcrypt_verify_password }
}
