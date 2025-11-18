/**
 * Simple password-based authentication for admin pages
 * Uses environment variable ADMIN_PASSWORD for protection
 */

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // If no password is set, allow access (for development)
    // In production, you should always set ADMIN_PASSWORD
    return true;
  }
  return password === adminPassword;
}

export function requireAdminPassword(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

