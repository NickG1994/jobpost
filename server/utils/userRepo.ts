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

export async function getUserByUsernamePassword(event: H3Event, email: string, password: string): Promise<User | null> {
  try {
    const users = await query<User>(event, 'SELECT * FROM sec_auth WHERE sec_username = ? and sec_password_hash = ?', [email, password])
    if(users.length > 0) {
      return users[0]
    }
    return null 
  } catch (error) {
    console.error('Error fetching user:', error)
    // You can throw an error or return null based on your error handling strategy
    return null
  }
}

export async function createUser(event: H3Event, email: string, username: string, password: string, userType: string): Promise<createUserParams> {
  try {
    if(email === '' || username === '' || password === '') {
    throw new Error('Email, username, and password are required')
    }
    // A stored procedure to create a new user
    const data = await query(event, 'CALL Create_New_User(?, ?, ?, ?, CURDATE())', [email, username, password, userType])
    console.log('Result from user creation:', data)
    if (data && data.length > 0) {
      console.log('User created successfully:', data)
      const user = data[0][0]
      return user
    } else {
      console.log('No user data returned from the database after creation')
      return createError({
        statusCode: 500,  
        statusMessage: 'User creation failed',
        message: 'No user data returned from the database',

      })
    }    
  } catch (error) {
    console.error('Error creating user:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    })
  }

} 
