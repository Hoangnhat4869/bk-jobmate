# Environment Switcher for Windows PowerShell
# Usage: .\scripts\switch-env.ps1 [local|staging|production]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("local", "staging", "production")]
    [string]$Environment
)

$environments = @{
    "local" = ".env.local.example"
    "staging" = ".env.staging.example"
    "production" = ".env.production.example"
}

function Switch-Environment {
    param([string]$env)
    
    if (-not $environments.ContainsKey($env)) {
        Write-Host "❌ Unknown environment: $env" -ForegroundColor Red
        Write-Host "Available environments: $($environments.Keys -join ', ')" -ForegroundColor Yellow
        exit 1
    }

    $sourceFile = Join-Path $PSScriptRoot ".." $environments[$env]
    $targetFile = Join-Path $PSScriptRoot ".." ".env"

    try {
        # Check if source file exists
        if (-not (Test-Path $sourceFile)) {
            Write-Host "❌ Source file not found: $sourceFile" -ForegroundColor Red
            exit 1
        }

        # Copy the environment file
        Copy-Item $sourceFile $targetFile -Force
        
        Write-Host "✅ Switched to $env environment" -ForegroundColor Green
        Write-Host "📄 Copied $($environments[$env]) → .env" -ForegroundColor Cyan
        
        # Show current configuration
        $content = Get-Content $targetFile -Raw
        $baseUrlMatch = $content | Select-String "EXPO_PUBLIC_BASE_URL=(.+)"
        $baseUrl = if ($baseUrlMatch) { $baseUrlMatch.Matches[0].Groups[1].Value } else { "Not set" }
        Write-Host "🌐 Base URL: $baseUrl" -ForegroundColor Blue
        
    } catch {
        Write-Host "❌ Error switching environment: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

if (-not $Environment) {
    Write-Host "🔧 Environment Switcher" -ForegroundColor Magenta
    Write-Host "Usage: .\scripts\switch-env.ps1 [environment]" -ForegroundColor White
    Write-Host ""
    Write-Host "Available environments:" -ForegroundColor Yellow
    $environments.Keys | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Cyan
    }
    exit 0
}

Switch-Environment $Environment
