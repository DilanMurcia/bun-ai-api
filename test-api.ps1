$uri = "http://localhost:3000/chat"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    messages = @(
        @{
            role = "user"
            content = "Hola, ¿puedes decirme un chiste?"
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "Enviando solicitud a $uri..."
Write-Host "Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $uri `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -TimeoutSec 30

    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Respuesta:"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host $_.Exception
}
