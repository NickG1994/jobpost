import { readBody, createError, defineEventHandler } from 'h3'
import {createUser} from '../../utils/userRepo'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, username, password, userType } = body;
    
    if (!email || !password || !username || userType) {
      return createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    if(userType === 'employer') {
      return createError({
        statusCode: 400,
        statusMessage: 'Use the /api/auth/create-employer endpoint to create an employer',
      });
    }  

    const response = await createUser(event, email, username, password, userType);
    console.log('User creation response:', response);
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
