export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, username, password, userType } = body;
    
    if (!email || !password || !username || userType !== 'employer') {
      return createError({
        statusCode: 400,
        statusMessage: 'Email, username, password are required and userType must be employer',
      });
    }

    const response = await createUser(event, email, username, password, userType);
    console.log('Employer creation response:', response);
    return response
  } catch (error: any) {
    console.error('Error during employer creation:', error);
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message:error.message,
    })
  }
})
