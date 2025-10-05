import { getUserProfileData } from "../utils/userRepo"
export default defineEventHandler(async (event) => {
  try {
    const { userId } = readBody(event)
    const profileData = await getUserProfileData(event, Number(userId))
    console.log('Profile Data:', profileData)
    return !profileData? createError({ statusCode: 404, statusMessage: 'Profile Not Found' }) : profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
