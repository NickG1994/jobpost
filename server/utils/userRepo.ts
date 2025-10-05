import { query } from './db'
import { H3Event } from 'h3'
import {useAuthUtils} from "../../composables/useAuthUtils"
const { bcrypt_verify_password } = useAuthUtils();

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
    // Get user by email
    const userRows = await query(
      event,
      'SELECT sec_password_hash FROM jobpost.SEC_AUTH WHERE sec_email = ?',
      [email]
    )

    if (userRows.length === 0) {
      console.log('No user found with the provided email.')
      return createError({
        statusCode: 401,
        statusMessage: 'User not found or invalid credentials',
        message: 'No user found with the provided email.',
      })
    } else {
      const hashedPassword = userRows[0].sec_password_hash;
      // Now compare the plain password with the hash
      if (!bcrypt_verify_password(password, hashedPassword)) {
        return createError({
          statusCode: 401,
          statusMessage: 'User not found or invalid credentials',
          message: 'Invalid password.',
        })
      }
    }

    // Now fetch the full user info
    const users = await query<User>(
      event,
      `SELECT 
         sa.auth_id as id,
         sa.sec_email as email,
         sa.sec_username as username,
         sa.sec_password_hash as password,
         rl.role_id,
         rl.role_name as role
       FROM jobpost.SEC_AUTH sa
       LEFT JOIN jobpost.USR_PERSONS per ON per.persons_id = sa.auth_id
       LEFT JOIN jobpost.USR_ROLES rl ON rl.persons_id = per.persons_id
       WHERE sa.sec_email = ?`,
      [email]
    )
    if (users.length > 0) {
      return users[0]
    }
    return null
  } catch (error) {
    console.error('Error fetching user:', error.message, error)
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

export async function getUserProfileData(event: H3Event, userId: number) {
  try {
    const profileData = await query(event, `
      select per.persons_id,
      	   per.first_name,
             per.last_name,
             per.middle_name,
             per.date_of_birth,
             per.address,
             per.phone_number,
             sa.sec_username,
             sa.sec_password_hash,
             sa.sec_email,
             r.role_name
      FROM jobpost.USR_PERSONS per
      LEFT JOIN jobpost.SEC_AUTH sa ON per.persons_id = sa.auth_id
      LEFT JOIN jobpost.USR_ROLES r ON per.persons_id = r.persons_id 
      WHERE per.persons_id = ?
    `, [userId])
      console.log('Fetched profile data:', profileData)
    return profileData.length > 0 ? profileData[0] : createError('User profile not found', 404)
  } catch (error) {
    console.error('Error fetching user profile data:', error)
    return createError('Internal Server Error', 500)
  }

 }
