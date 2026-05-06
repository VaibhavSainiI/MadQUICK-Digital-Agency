<#
Set GitHub repository secrets using the GitHub CLI (`gh`).

Usage:
1. Install and authenticate `gh` (https://cli.github.com/): `gh auth login`
2. From this repo root, run: `./set_github_secrets.ps1`

The script will prompt for values if not provided via environment variables.
#>

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI 'gh' is not installed. Install from https://cli.github.com/ and authenticate with 'gh auth login'."
    exit 1
}

$secrets = @(
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'ECR_REPOSITORY',
    'APP_RUNNER_SERVICE_NAME',
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
)

foreach ($s in $secrets) {
    $val = $env:$s
    if (-not $val) {
        $val = Read-Host -Prompt "Enter value for $s (or leave blank to skip)"
    }
    if ([string]::IsNullOrEmpty($val)) {
        Write-Host "Skipping $s"
        continue
    }
    gh secret set $s --body "$val" || Write-Error "Failed to set $s"
}

Write-Host "Secrets script finished. Check GitHub repository settings to confirm."
