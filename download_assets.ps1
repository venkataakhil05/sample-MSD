# Download Reliable Placeholders (Themed)
# Base Image: Dark Grey with clear instruction
Invoke-WebRequest -Uri "https://placehold.co/600x800/1a1a1a/cccccc/png?text=DROP+YOUR+IMAGE+HERE" -OutFile "public/images/hero-dhoni.png"

# Reveal Image: Black & Gold (Theme Colors) for "X-Ray" effect
Invoke-WebRequest -Uri "https://placehold.co/600x800/000000/F2CD1E/png?text=HELMET+LAYER" -OutFile "public/images/hero-helmet.png"

# Signature: Transparent background style (though placeholder is solid)
Invoke-WebRequest -Uri "https://placehold.co/600x300/transparent/F2CD1E/png?text=Signature+Placeholder" -OutFile "public/images/signature.png"

Write-Host "Placeholder assets downloaded to public/images/"
