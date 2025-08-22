import { useMyAuthStore } from '~/store/Auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const pinia = useNuxtApp().$pinia
  const myAuth = useMyAuthStore(pinia)

  const authPaths = ['/auth/signin', '/auth/signup']

  if (myAuth.isAuthenticated) {
    // Redirect to the sign-in page if not authenticated and trying to access a protected route
    console.log('Authenticated user:', myAuth.user)
    if(to.path !== '/') {
      return navigateTo('/')
    }

    return true
  } 
  if (!myAuth.isAuthenticated) {
    // Redirect to the sign-in page if not authenticated and trying to access a protected route
    console.log('Unauthenticated user, redirecting to sign-in:', to.path)
    if(authPaths.includes(to.path.toLowerCase())) {
      // Allow access to sign-in and sign-up pages
      console.log('Unauthenticated user, redirecting to path:', to.path)
      return true
    }
    return navigateTo('/auth/signin')
  }

})
