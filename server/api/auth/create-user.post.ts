import { readBody, createError, defineEventHandler } from 'h3'
import {createUser} from '../../utils/userRepo'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, username, password } = body;
    
    if (!email || !password || !username) {
      return createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    const {response,error} = await createUser(event, email, username, password, 'user'); // Assuming 'user' is the default userType
    console.error('User creation result:', response);
    console.error('User creation error:', error);
    
    return { response }
    
  } catch (error: any) {
    console.error('Error during user authentication:', error);
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message:error.message,
    })
  }
});
