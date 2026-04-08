$html = Get-Content "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\frontend\public\Monesh_portfolio.html" -Raw -Encoding UTF8
$jsonContent = Get-Content "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\image_data.txt" -Raw
$json = $jsonContent | ConvertFrom-Json

# Function to safely get JSON value by filename
function Get-ImageBase64($filename) {
    return $json.$filename
}

$profilepic = Get-ImageBase64 "profilepic.png"
$coursera = Get-ImageBase64 "Coursera_Certificate.jpg"
$tata = Get-ImageBase64 "TATA_GenAI.jpg"
$google = Get-ImageBase64 "Google-Cloud-Monesh.jpg"
$resume = Get-ImageBase64 "RESUME-MONESH.pdf"

# Replace profilepic.png - for src attribute
$html = $html -replace 'src="profilepic\.png"', "src=""data:image/png;base64,$profilepic"""

# Replace certificate showCertModal calls - need to replace the jpg file references
$html = $html -replace "showCertModal\('Coursera_Certificate\.jpg'", "showCertModal('data:image/jpeg;base64,$coursera'"
$html = $html -replace "showCertModal\('TATA_GenAI\.jpg'", "showCertModal('data:image/jpeg;base64,$tata'"
$html = $html -replace "showCertModal\('Google-Cloud-Monesh\.jpg'", "showCertModal('data:image/jpeg;base64,$google'"

# Replace resume PDF - for src and href
$html = $html -replace 'src="RESUME-MONESH\.pdf"', "src=""data:application/pdf;base64,$resume"""
$html = $html -replace 'href="RESUME-MONESH\.pdf"', "href=""data:application/pdf;base64,$resume"""

$html | Out-File "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\frontend\public\Monesh_portfolio.html" -Encoding UTF8
Write-Host "Done! Images embedded in HTML."