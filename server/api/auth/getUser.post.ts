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
    console.log('Retrieved user:', user);
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
        id: user.ID,
        email: user.email,
        username: user.username,
        role: user.role
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
