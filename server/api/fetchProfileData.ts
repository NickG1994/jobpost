import { getProfileData } from "../utils/userRepo"
export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.params
    const profileData = await getProfileData(event, Number(userId))
    if(!profileData) {
      return createError({ statusCode: 404, statusMessage: 'Profile Not Found' })
    }
    return profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
