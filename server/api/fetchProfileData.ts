import { getUserProfileData } from "../utils/userRepo"
export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event)
    console.log('Profile userId:', userId)
    if(userId === undefined) {
      return createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'userId is required' })
    }
    const profileData = await getUserProfileData(event, Number(userId))
    return !profileData? createError({ statusCode: 404, statusMessage: 'Profile Not Found' }) : profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
