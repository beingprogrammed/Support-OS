import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Exports data to a PDF file.
 * @param {Array} data - Array of objects to export.
 * @param {Array} headers - Array of strings for the PDF table header row.
 * @param {Function} rowMapper - Function to map each data object to an array of values.
 * @param {string} fileName - Name of the file to download (without extension).
 * @param {string} title - Title of the PDF document.
 */
export const exportToPDF = (data, headers, rowMapper, fileName, title) => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(title, 14, 22);
    
    // Add timestamp
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableRows = data.map(item => rowMapper(item));

    autoTable(doc, {
      head: [headers],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: {
        fillColor: [124, 58, 237], // var(--accent) #7c3aed
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50]
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 35 },
    });

    doc.save(`${fileName}_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error; // Re-throw to be handled by the UI
  }
};
