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

  // Define variables for info
  const sellerName = "Belo Jorgin";
  const email = "belo.jorgin21@etec.sp.gov.br";
  const rm = "21XXXX";
  const invitedName = "Maria Jorgin";
  const price = "R$10,00";
  const purchaseDate = "23/06/2023, 10:00 AM";

  const qrCodeX = 41;
  const qrCodeY = 25;
  const namesX = 15;
  const namesY = 184;
  const priceX = 195;
  const priceY = 274;
  const purchaseTimeX = 195;
  const purchaseTimeY = 284;
  const emailX = 15;
  const emailY = 209;
  const codeX = 15;
  const codeY = 219;

  // Add info to the PDF
  doc.setFontSize(12);
  doc.setFont('times');
  doc.addImage(dataURL, "JPEG", qrCodeX, qrCodeY, 128, 128);
  doc.text(`Nome do Aluno: ${sellerName}`, namesX, namesY);
  doc.text(`Email Institucional: ${email}`, emailX, emailY);
  doc.text(`RM do Aluno: ${rm}`, codeX, codeY);
  doc.text(`Nome do Convidado: ${invitedName}`, namesX, namesY + 10);
  doc.text(`Custo do Ingresso: ${price}`, priceX, priceY, {align: 'right'});
  doc.text(`Data de Compra: ${purchaseDate}`, purchaseTimeX, purchaseTimeY, {align: 'right'});
  
  // Save the PDF file
  doc.save("qr_code.pdf");
}