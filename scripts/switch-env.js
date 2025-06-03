#!/usr/bin/env node

/**
 * Environment Switcher Utility
 * Usage: node scripts/switch-env.js [local|staging|production]
 */

const fs = require("fs");
const path = require("path");

const environments = {
  local: ".env.local.example",
  staging: ".env.staging.example",
  production: ".env.production.example",
};

function switchEnvironment(env) {
  if (!environments[env]) {
    console.error(`❌ Unknown environment: ${env}`);
    console.log(
      "Available environments:",
      Object.keys(environments).join(", ")
    );
    process.exit(1);
  }

  const sourceFile = path.join(__dirname, "..", environments[env]);
  const targetFile = path.join(__dirname, "..", ".env");

  try {
    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
      console.error(`❌ Source file not found: ${sourceFile}`);
      process.exit(1);
    }

    // Copy the environment file
    fs.copyFileSync(sourceFile, targetFile);

    console.log(`✅ Switched to ${env} environment`);
    console.log(`📄 Copied ${environments[env]} → .env`);

    // Show current configuration
    const content = fs.readFileSync(targetFile, "utf8");
    const baseUrl =
      content.match(/EXPO_PUBLIC_BASE_URL=(.+)/)?.[1] || "Not set";
    console.log(`🌐 Base URL: ${baseUrl}`);
  } catch (error) {
    console.error(`❌ Error switching environment: ${error.message}`);
    process.exit(1);
  }
}

// Get environment from command line argument
const targetEnv = process.argv[2];

if (!targetEnv) {
  console.log("🔧 Environment Switcher");
  console.log("Usage: node scripts/switch-env.js [environment]");
  console.log("");
  console.log("Available environments:");
  Object.keys(environments).forEach((env) => {
    console.log(`  - ${env}`);
  });
  process.exit(0);
}

switchEnvironment(targetEnv);
