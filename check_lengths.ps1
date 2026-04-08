$json = Get-Content "C:\Users\MONESH\OneDrive\Desktop\Monesh_portfolio\image_data.txt" -Raw | ConvertFrom-Json
$json.PSObject.Properties | ForEach-Object {
    Write-Host "$($_.Name): $($_.Value.Length) chars"
}