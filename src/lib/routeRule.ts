/**
 * An array of routes that are accessible to the public , no need to be authenticated
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are for auth , redirect logged user to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Prefix for api authentication routes
 * routes that start with this prefix are used for api auth purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
