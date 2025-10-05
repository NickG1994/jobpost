import { readBody, createError, defineEventHandler } from 'h3'
import {createUser} from '../../utils/userRepo'
import { useAuthUtils } from '~/composables/useAuthUtils';
const useAuth = useAuthUtils();
const { bcrypt_hash_password } = useAuth;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, username, password, userType } = body;
    if (!email) {
      return createError({
        statusCode: 400,
        statusMessage: 'Email is required',
      });
    }
    if (!username) {
      return createError({
        statusCode: 400,
        statusMessage: 'Username is required',
      });
    }
    if (!password) {
      return createError({
        statusCode: 400,
        statusMessage: 'Password is required',
      });
    }
    if (!userType) {
      return createError({
        statusCode: 400,
        statusMessage: 'User type is required',
      });
    }
    const hash_password = bcrypt_hash_password(password);
    console.log('Hashed password:', hash_password);
    // Use the hashed password for user creation
    // Here, you would typically save the user to your database
    // For demonstration, we'll just return a success message
    //console.log('Received sign-up request:', { email, username, password, userType });
    const response = await createUser(event, email, username, hash_password, userType);
    //console.log('User created successfully:', response);
    return response;

  } catch (error: any) {
    console.error('Error during user authentication:', error);
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message:error.message,
    })
  }
});
