import { readBody, createError, defineEventHandler } from 'h3'
import {createUser} from '../../utils/userRepo' // adjust path if needed

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, username, password } = body;
    
    if (!email || !password || !username) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    const user = await createUser(event, email,username, password, 'user'); // Assuming 'user' is the default userType
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      });
    }
    return {
      status: 'success',
      message: 'User created successfully',
      user: {
        username: user.username,
        email: email
      }
    };

  } catch (error: any) {
    console.error('Error during user authentication:', error);

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
