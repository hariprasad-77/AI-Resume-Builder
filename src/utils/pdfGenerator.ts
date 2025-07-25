import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, filename: string = 'resume.pdf'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Hide any interactive elements
    const interactiveElements = element.querySelectorAll('button, input, select, textarea');
    interactiveElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // Restore interactive elements
    interactiveElements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};