document.getElementById('btnPDF').addEventListener('click', function() {
  try {
    // Verificar que jsPDF esté disponible
    if (typeof jsPDF === 'undefined') {
      throw new Error("jsPDF no se cargó. Verifica que el archivo jspdf.min.js esté en la carpeta correcta.");
    }

    // Validar datos
    if (!window.appData || !window.appData.nit) {
      throw new Error("No hay datos válidos para generar el PDF.");
    }

    const { debeDeclarar, ultimosDos, nit, razones, fechaLarga } = window.appData;
    const doc = new jsPDF();

    // Configurar PDF
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.text("Certificado de Obligación Tributaria", 105, 25, { align: "center" });
    doc.line(20, 30, 190, 30);

    let yPosition = 50;
    doc.text(`NIT: ${nit}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Últimos 2 dígitos: ${ultimosDos}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Obligación: ${debeDeclarar ? 'DECLARAR RENTA' : 'NO DECLARAR RENTA'}`, 20, yPosition);

    if (debeDeclarar) {
      yPosition += 15;
      doc.text(`Fecha límite: ${fechaLarga}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Motivo(s): ${razones.join(", ")}`, 20, yPosition);
    }

    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, yPosition);
    yPosition += 6;
    doc.setFont("helvetica", "normal");
    doc.text("Contador Públicico", 20, yPosition);

    doc.save(`Certificado_Renta_${nit}.pdf`);
    alert("PDF generado correctamente"); // Confirmación visual

  } catch (error) {
    console.error("Error detallado:", error);
    alert(`Error: ${error.message}`);
  }
});
