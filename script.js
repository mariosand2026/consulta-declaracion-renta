// ===============================
// GENERAR PDF (CON LOGO)
// ===============================
document.getElementById("btnPDF").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const data = window.appData;

  if (!data) {
    alert("Primero valida el formulario");
    return;
  }

  const doc = new jsPDF();

  // ===============================
  // LOGO MARIA
  // ===============================
  const logo = new Image();
  logo.crossOrigin = "Anonymous";
  logo.src = "https://mariosand2026.github.io/consulta-declaracion-renta/logo.png";

  logo.onload = function () {

    // LOGO CENTRADO
    doc.addImage(logo, "PNG", 80, 10, 50, 50);

    // TÍTULO
    doc.setFontSize(18);
    doc.text(
      "CERTIFICADO DE OBLIGACIÓN TRIBUTARIA",
      105,
      70,
      { align: "center" }
    );

    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // CONTENIDO
    doc.setFontSize(12);
    doc.text(`NIT: ${data.nit}`, 20, 90);
    doc.text(
      `Resultado: ${data.debeDeclarar ? "OBLIGADO A DECLARAR" : "NO OBLIGADO"}`,
      20,
      100
    );

    if (data.debeDeclarar) {
      doc.text(
        `Fecha límite: ${fechasPresentacion[data.ultimosDos]}`,
        20,
        110
      );

      doc.text("Motivos:", 20, 125);
      data.razones.forEach((r, i) => {
        doc.text(`• ${r}`, 25, 135 + i * 8);
      });
    }

    // FIRMA
    doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, 260);
    doc.text("Contador Público", 20, 268);

    // GUARDAR
    doc.save(`Certifica
