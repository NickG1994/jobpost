import { useMyAuthStore } from '~/store/Auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const pinia = useNuxtApp().$pinia
  const myAuth = useMyAuthStore(pinia)

  if(!import.meta.client) return 
  const authPaths = ['/auth/signin', '/auth/signup']

  if (myAuth.isAuthenticated) {
    // Redirect to the sign-in page if not authenticated and trying to access a protected route
    return true
  } 
  if (!myAuth.isAuthenticated) {
    // Redirect to the sign-in page if not authenticated and trying to access a protected route
    if(authPaths.includes(to.path.toLowerCase())) {
      // Allow access to sign-in and sign-up pages
      return true
    }
    return navigateTo('/auth/signin')
  }

})
