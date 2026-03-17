const fs = require('fs');
const getPixels = require('image-pixels');

async function checkImage(filePath) {
  try {
    const { data, width, height } = await getPixels(filePath);
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }
    const count = data.length / 4;
    return {
      file: filePath,
      width, height,
      color: `rgb(${Math.round(r/count)}, ${Math.round(g/count)}, ${Math.round(b/count)})`
    };
  } catch (err) {
    return { file: filePath, error: err.message };
  }
}

async function main() {
  const images = [
    'public/images/1773751200471.jpeg',
    'public/images/1773751229599.jpeg',
    'public/images/1773751447746.jpeg',
    'public/images/1773752216793.jpeg',
    'public/images/1773752553763.jpeg'
  ];
  const results = [];
  for (const img of images) {
    results.push(await checkImage(img));
  }
  fs.writeFileSync('image-stats.json', JSON.stringify(results, null, 2));
}

main();
