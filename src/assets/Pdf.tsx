import jsPDF from "jspdf";
import QRcode from "qrcode";

export function generatePDF() {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define the QR code text
  const qrCodeText = "48df0f08-4c14-4ed8-a2a8-9d517d81c689";

  // Generate the QR code
  const canvas = document.createElement("canvas");
  QRcode.toCanvas(canvas, qrCodeText);
  // Convert the canvas to an image data URL
  const dataURL = canvas.toDataURL();
  // Add the QR code image to the PDF
  doc.addImage(dataURL, "JPEG", 41, 10, 128, 128);

  // Define variables for info
  const sellerName = "Belo Jorgin";
  const email = "belo.jorgin21@etec.sp.gov.br";
  const rm = "21XXXX";
  const invitedName = "Maria Jorgin";
  const price = "R$10,00 + taxas";
  const purchaseDate = "07/06/2023";

  // Add info to the PDF
  doc.setFontSize(12);
  doc.text(sellerName, 15, 128+15);
  doc.text(email, 15, 128+15+8);
  doc.text(rm, 15, 128+15+8*2);
  doc.text(invitedName, 15, 128+18+8*3);
  doc.text(price, 15, 128+21+8*4);
  doc.text(purchaseDate, 15, 128+21+8*5);
  
  // Save the PDF file
  doc.save("qr_code.pdf");
}