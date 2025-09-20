import { readBody, createError, defineEventHandler } from 'h3'
import {createUser} from '../../utils/userRepo'

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
    console.log('Received sign-up request:', { email, username, password, userType });
    const response = await createUser(event, email, username, password, userType);
    console.log('User created successfully:', response);
    return response 
    
  } catch (error: any) {
    console.error('Error during user authentication:', error);
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message:error.message,
    })
  }
});
