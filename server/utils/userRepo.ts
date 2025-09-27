import { query } from './db'
import { H3Event } from 'h3'

type User = {
  id: number
  email: string
  password: string
}

type createUserParams = {
  username: string
  password: string
}

export async function getUserByUsernamePassword(
  event: H3Event,
  email: string,
  password: string
): Promise<User | null> {
  try {
    //console.log('Fetching user with email:', email)
    //console.log('Using password:', password)
    const users = await query<User>(
      event,
      `SELECT 
         sa.auth_id as ID,
         sa.sec_email as email,
         sa.sec_username as username,
         sa.sec_password_hash as password,
         rl.role_id,
         rl.role_name as role
       FROM jobpost.SEC_AUTH sa
       LEFT JOIN jobpost.USR_PERSONS per ON per.persons_id = sa.auth_id
       LEFT JOIN jobpost.USR_ROLES rl ON rl.persons_id = per.persons_id
       WHERE sa.sec_email = ? AND sa.sec_password_hash = ?`,
      [email, password]
    )
    console.log('Query result:', users)
    if (users.length > 0) {
      return users[0]
    }
    return null
  } catch (error) {
    console.error('Error fetching user:', error.message, error)
    // You can throw an error or return null based on your error handling strategy
    return null
  }
}

export async function createUser(
  event: H3Event,
  email: string,
  username: string,
  password: string,
  userType: string
): Promise<createUserParams> {
  try {
    // Validate required fields
    if (!email || !username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Email, username, and password are required',
      })
    }

    // Call stored procedure
    const data = await query(
      event,
      'CALL Create_New_User(?, ?, ?, ?, CURDATE())',
      [email, username, password, userType]
    )

    if (data && data.length > 0 && data[0].length > 0) {
      const user = data[0][0] as createUserParams
      return user
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'User creation failed',
        message: 'No user data returned from the database',
      })
    }
  } catch (error: any) {
    console.error('Error creating user:', error)

    // Handle MySQL duplicate entry (unique constraint violation)
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      let field = 'field'
      //if (error.sqlMessage?.includes('sec_email_UNIQUE')) field = 'email'
      if (error.sqlMessage?.includes('sec_username_UNIQUE')) field = 'username'
      if (error.sqlMessage?.includes('sec_password_hash_UNIQUE')) field = 'password'

      throw createError({
        statusCode: 409, // Conflict
        statusMessage: 'Duplicate Entry',
        message: `The provided ${field} already exists.`,
      })
    }

    // If it's already an H3Error, rethrow
    if (error.statusCode) {
      throw error
    }

    // Default fallback
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    })
  }
}

