#!/usr/bin/env node
/**
 * Pre-build script to ensure TAILWIND_DISABLE_NATIVE is set
 * This runs before any modules are loaded to prevent native binding issues
 */

// Set the environment variable before any imports
process.env.TAILWIND_DISABLE_NATIVE = "1";

// Verify it's set
if (process.env.TAILWIND_DISABLE_NATIVE !== "1") {
  console.error("❌ Failed to set TAILWIND_DISABLE_NATIVE");
  process.exit(1);
}

console.log("✅ TAILWIND_DISABLE_NATIVE=1 set successfully");

