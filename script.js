// Topes DIAN 2025 (en UVT y pesos)
const UVT_2025 = 49798;
const TOPE_PATRIMONIO_UVT = 4500;
const TOPE_PATRIMONIO_PESOS = UVT_2025 * TOPE_PATRIMONIO_UVT; // $224.095.000
const TOPE_OTROS_UVT = 1400;
const OTROS_PESOS = UVT_2025 * TOPE_OTROS_UVT; // $69.718.600

// Tabla de fechas por NIT (últimos dos dígitos) - AÑO GRAVABLE 2025 (DECLARACIÓN 2026)
const fechasPresentacion = {
  "00": "26 de octubre de 2026", "99": "26 de octubre de 2026",
  "01": "12 de agosto de 2026", "02": "12 de agosto de 2026",
  "03": "13 de agosto de 2026", "04": "13 de agosto de 2026",
  "05": "14 de agosto de 2026", "06": "14 de agosto de 2026",
  "07": "18 de agosto de 2026", "08": "18 de agosto de 2026",
  "09": "19 de agosto de 2026", "10": "19 de agosto de 2026",
  "11": "20 de agosto de 2026", "12": "20 de agosto de 2026",
  "13": "21 de agosto de 2026", "14": "21 de agosto de 2026",
  "15": "24 de agosto de 2026", "16": "24 de agosto de 2026",
  "17": "25 de agosto de 2026", "18": "25 de agosto de 2026",
  "19": "26 de agosto de 2026", "20": "26 de agosto de 2026",
  "21": "27 de agosto de 2026", "22": "27 de agosto de 2026",
  "23": "28 de agosto de 2026", "24": "28 de agosto de 2026",
  "25": "31 de agosto de 2026", "26": "31 de agosto de 2026",
  "27": "1 de septiembre de 2026", "28": "1 de septiembre de 2026",
  "29": "2 de septiembre de 2026", "30": "2 de septiembre de 2026",
  "31": "3 de septiembre de 2026", "32": "3 de septiembre de 2026",
  "33": "4 de septiembre de 2026", "34": "4 de septiembre de 2026",
  "35": "7 de septiembre de 2026", "36": "7 de septiembre de 2026",
  "37": "8 de septiembre de 2026", "38": "8 de septiembre de 2026",
  "39": "9 de septiembre de 2026", "40": "9 de septiembre de 2026",
  "41": "10 de septiembre de 2026", "42": "10 de septiembre de 2026",
  "43": "11 de septiembre de 2026", "44": "11 de septiembre de 2026",
  "45": "14 de septiembre de 2026", "46": "14 de septiembre de 2026",
  "47": "15 de septiembre de 2026", "48": "15 de septiembre de 2026",
  "49": "16 de septiembre de 2026", "50": "16 de septiembre de 2026",
  "51": "17 de septiembre de 2026", "52": "17 de septiembre de 2026",
  "53": "18 de septiembre de 2026", "54": "18 de septiembre de 2026",
  "55": "21 de septiembre de 2026", "56": "21 de septiembre de 2026",
  "57": "22 de septiembre de 2026", "58": "22 de septiembre de 2026",
  "59": "23 de septiembre de 2026", "60": "23 de septiembre de 2026",
  "61": "24 de septiembre de 2026", "62": "24 de septiembre de 2026",
  "63": "25 de septiembre de 2026", "64": "25 de septiembre de 2026",
  "65": "28 de septiembre de 2026", "66": "28 de septiembre de 2026",
  "67": "1 de octubre de 2026", "68": "1 de octubre de 2026",
  "69": "2 de octubre de 2026", "70": "2 de octubre de 2026",
  "71": "5 de octubre de 2026", "72": "5 de octubre de 2026",
  "73": "6 de octubre de 2026", "74": "6 de octubre de 2026",
  "75": "7 de octubre de 2026", "76": "7 de octubre de 2026",
  "77": "8 de octubre de 2026", "78": "8 de octubre de 2026",
  "79": "9 de octubre de 2026", "80": "9 de octubre de 2026",
  "81": "13 de octubre de 2026", "82": "13 de octubre de 2026",
  "83": "14 de octubre de 2026", "84": "14 de octubre de 2026",
  "85": "15 de octubre de 2026", "86": "15 de octubre de 2026",
  "87": "16 de octubre de 2026", "88": "16 de octubre de 2026",
  "89": "19 de octubre de 2026", "90": "19 de octubre de 2026",
  "91": "20 de octubre de 2026", "92": "20 de octubre de 2026",
  "93": "21 de octubre de 2026", "94": "21 de octubre de 2026",
  "95": "22 de octubre de 2026", "96": "22 de octubre de 2026",
  "97": "23 de octubre de 2026", "98": "23 de octubre de 2026"
};

document.getElementById('rentaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener valores
  const responsableIVA = document.getElementById('responsableIVA').value === 'si';
  const patrimonio = parseFloat(document.getElementById('patrimonio').value) || 0;
  const ingresos = parseFloat(document.getElementById('ingresos').value) || 0;
  const consumosTC = parseFloat(document.getElementById('consumosTC').value) || 0;
  const compras = parseFloat(document.getElementById('compras').value) || 0;
  const depositos = parseFloat(document.getElementById('depositos').value) || 0;
  const nit = document.getElementById('nit').value;
  const ultimosDos = nit.slice(-2).padStart(2, "0");

  // Evaluar condiciones (cada una por separado)
  let debeDeclarar = false;
  let razones = [];

  if (responsableIVA) {
    debeDeclarar = true;
    razones.push("Es responsable del IVA");
  } else {
    // Verificar cada criterio individualmente
    if (patrimonio > TOPE_PATRIMONIO_PESOS) {
      debeDeclarar = true;
      razones.push(`Patrimonio bruto ($ ${patrimonio.toLocaleString()}) > ${TOPE_PATRIMONIO_PESOS.toLocaleString()}`);
    }
    
    if (ingresos > OTROS_PESOS) {
      debeDeclarar = true;
      razones.push(`Ingresos brutos ($ ${ingresos.toLocaleString()}) > ${OTROS_PESOS.toLocaleString()}`);
    }
    
    if (consumosTC > OTROS_PESOS) {
      debeDeclarar = true;
      razones.push(`Consumos con tarjeta de crédito ($ ${consumosTC.toLocaleString()}) > ${OTROS_PESOS.toLocaleString()}`);
    }
    
    if (compras > OTROS_PESOS) {
      debeDeclarar = true;
      razones.push(`Compras y consumos ($ ${compras.toLocaleString()}) > ${OTROS_PESOS.toLocaleString()}`);
    }
    
    if (depositos > OTROS_PESOS) {
      debeDeclarar = true;
      razones.push(`Depósitos/inversiones ($ ${depositos.toLocaleString()}) > ${OTROS_PESOS.toLocaleString()}`);
    }
  }

  // Asignar fecha de presentación
  let fechaPresentacion = "";
  if (debeDeclarar && fechasPresentacion[ultimosDos]) {
    fechaPresentacion = `<br><strong>Fecha límite:</strong> ${fechasPresentacion[ultimosDos]}`;
  }

  // Mostrar resultado
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.className = 'resultado ' + (debeDeclarar ? 'debe' : 'no-debe');
  resultadoDiv.innerHTML = `
    ${debeDeclarar ? 
      `✅ <strong>¡DEBES DECLARAR RENTA!</strong><br><small>Motivo(s): ${razones.join(", ")}</small>` : 
      '❌ <strong>No estás obligado a declarar.</strong>'}
    ${fechaPresentacion}
  `;

  // Habilitar botón PDF
  document.getElementById('btnPDF').disabled = false;
  window.appData = { debeDeclarar, ultimosDos, fechaPresentacion, nit, razones };
});

// Generar PDF
document.getElementById('btnPDF').addEventListener('click', function() {
  try {
    const { debeDeclarar, ultimosDos, fechaPresentacion, nit, razones } = window.appData;
    
    if (!nit || !debeDeclarar) {
      alert("Error: No hay datos válidos para generar el PDF.");
      return;
    }

    const doc = new jsPDF();
    
    // Configuración del PDF
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    // Título
    doc.setFontSize(18);
    doc.text("Certificado de Obligación Tributaria", 105, 25, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    
    // Contenido
    let yPosition = 50;
    doc.setFontSize(12);
    doc.text(`NIT: ${nit}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Últimos 2 dígitos: ${ultimosDos}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Obligación: ${debeDeclarar ? 'DECLARAR RENTA' : 'NO DECLARAR RENTA'}`, 20, yPosition);
    
    if (debeDeclarar) {
      yPosition += 15;
      doc.text(`Fecha límite: ${fechasPresentacion[ultimosDos]}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Motivo(s): ${razones.join(", ")}`, 20, yPosition);
    }
    
    // Firma del contador
    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, yPosition);
    yPosition += 6;
    doc.setFont("helvetica", "normal");
    doc.text("Contador Públicico", 20, yPosition);
    yPosition += 6;
    doc.text("Cédula Profesional: [Número]", 20, yPosition);
    
    // Guardar PDF
    doc.save(`Certificado_Renta_${nit}.pdf`);
    
  } catch (error) {
    console.error("Error al generar PDF:", error);
    alert("Error al generar el PDF. Revisa la consola para más detalles.");
  }
});
