$inputFolder = "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\frontend\public"
$outputFile = "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\image_data.txt"

$files = @("profilepic.png", "Coursera_Certificate.jpg", "Google-Cloud-Monesh.jpg", "TATA_GenAI.jpg", "RESUME-MONESH.pdf")

$result = @{}

foreach ($file in $files) {
    $path = Join-Path $inputFolder $file
    if (Test-Path $path) {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $base64 = [Convert]::ToBase64String($bytes)
        $result[$file] = $base64
        Write-Host "Converted: $file"
    } else {
        Write-Host "Not found: $file"
    }
}

$result | ConvertTo-Json -Depth 10 | Out-File $outputFile -Encoding UTF8
Write-Host "Done! Saved to $outputFile"