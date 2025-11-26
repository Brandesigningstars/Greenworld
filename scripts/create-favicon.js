const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  const logoPath = path.join(__dirname, '../src/assets/logo.png');
  const publicDir = path.join(__dirname, '../public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Read the logo image
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    
    console.log('Processing logo image...');
    console.log('Image dimensions:', metadata.width, 'x', metadata.height);
    
    // Process image to remove background
    // For best results, use an online tool like remove.bg first
    let processedImage = image;
    
    // Check if image has alpha channel
    if (metadata.hasAlpha) {
      console.log('Image already has transparency');
      processedImage = image;
    } else {
      console.log('Processing image to make background transparent...');
      // Extract the image data and process it
      const { data, info } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      
      // Process pixels to make white/light backgrounds transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Calculate brightness
        const brightness = (r + g + b) / 3;
        // If pixel is very light (close to white), make it transparent
        if (brightness > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      
      processedImage = sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4
        }
      }).png();
    }
    
    // Create different favicon sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' },
    ];
    
    console.log('Creating favicon files...');
    
    for (const { size, name } of sizes) {
      const outputPath = path.join(publicDir, name);
      await processedImage
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath);
      console.log(`Created: ${name}`);
    }
    
    // Create .ico file (favicon.ico) - 32x32 is standard
    const icoPath = path.join(publicDir, 'favicon.ico');
    await processedImage
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(icoPath.replace('.ico', '-temp.png'));
    
    // Note: Sharp doesn't create .ico directly, so we'll use the PNG
    // For a proper .ico file, you may need to use an online converter
    console.log('\n✅ Favicon files created successfully!');
    console.log('Note: For a proper .ico file, you may want to use an online converter.');
    console.log('For better background removal, consider using:');
    console.log('- https://www.remove.bg/');
    console.log('- https://www.canva.com/features/background-remover/');
    
  } catch (error) {
    console.error('Error processing image:', error.message);
    console.log('\nAlternative: Please use an online tool to remove the background first:');
    console.log('1. Go to https://www.remove.bg/');
    console.log('2. Upload src/assets/logo.png');
    console.log('3. Download the result and save it as public/favicon.png');
    console.log('4. Then run this script again or manually create favicon sizes.');
  }
}

createFavicon();

