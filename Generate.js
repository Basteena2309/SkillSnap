const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const generateCertificate = async (name, lesson) => {
  const htmlTemplate = fs.readFileSync('./cert-template.html', 'utf8');
  const today = new Date().toLocaleDateString();

  // Inject data
  const finalHtml = htmlTemplate
    .replace('{{name}}', name)
    .replace('{{lesson}}', lesson)
    .replace('{{date}}', today);

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

  // Create PDF
  const pdfPath = path.join(__dirname, `${name}-certificate.pdf`);
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

  await browser.close();
  console.log(`✅ Certificate saved: ${pdfPath}`);
};

// Example use
generateCertificate("John Doe", "JavaScript Basics");
