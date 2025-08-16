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
    //console.log(`Creating user with email: ${email}, username: ${username}, and userType: ${userType}`)
    // A stored procedure to create a new user
    const result = await query(event, 'CALL Create_New_User(?, ?, ?, ?, CURDATE())', [email, username, password, userType])
    //console.log('Result from user creation:', result)
    if (result && result.length > 0) {
      const user = result[0][0]
      return user
    } else {
      throw new Error('User creation failed')
    }    
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user: ' + error.message)
  }

} 
