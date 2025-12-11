#!/bin/bash
# Build wrapper script that ensures TAILWIND_DISABLE_NATIVE is set
# before Node.js starts, preventing native binding issues

export TAILWIND_DISABLE_NATIVE=1
exec npm run build:internal

