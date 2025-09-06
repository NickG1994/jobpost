import {getUserByUsernamePassword} from '../../utils/userRepo'
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    const user = await getUserByUsernamePassword(event, email, password);

    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: 'User not found or invalid credentials',
      });
    }
    return {
      status: 'success',
      message: 'User authenticated successfully',
      user: {
        username: user.sec_username,
        email: user.sec_email
      }
    };

  } catch (error) {
    console.error('Error during user fetching:', error);
    return {
      status: 'error',
      message: error.message || 'Internal Server Error',
      user: null
    };
  }
})
