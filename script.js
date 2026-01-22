// Tabla de fechas por NIT (últimos dos dígitos)
const fechasPresentacion = {
  "00": "24 de octubre de 2025", "99": "24 de octubre de 2025",
  "01": "12 de agosto de 2025", "02": "12 de agosto de 2025",
  "03": "13 de agosto de 2025", "04": "13 de agosto de 2025",
  "05": "14 de agosto de 2025", "06": "14 de agosto de 2025",
  "07": "15 de agosto de 2025", "08": "15 de agosto de 2025",
  "09": "19 de agosto de 2025", "10": "19 de agosto de 2025",
  "11": "20 de agosto de 2025", "12": "20 de agosto de 2025",
  "13": "21 de agosto de 2025", "14": "21 de agosto de 2025",
  "15": "22 de agosto de 2025", "16": "22 de agosto de 2025",
  "17": "25 de agosto de 2025", "18": "25 de agosto de 2025",
  "19": "26 de agosto de 2025", "20": "26 de agosto de 2025",
  "21": "27 de agosto de 2025", "22": "27 de agosto de 2025",
  "23": "28 de agosto de 2025", "24": "28 de agosto de 2025",
  "25": "29 de agosto de 2025", "26": "29 de agosto de 2025",
  "27": "1 de septiembre de 2025", "28": "1 de septiembre de 2025",
  "29": "2 de septiembre de 2025", "30": "2 de septiembre de 2025",
  "31": "3 de septiembre de 2025", "32": "3 de septiembre de 2025",
  "33": "4 de septiembre de 2025", "34": "4 de septiembre de 2025",
  "35": "5 de septiembre de 2025", "36": "5 de septiembre de 2025",
  "37": "8 de septiembre de 2025", "38": "8 de septiembre de 2025",
  "39": "9 de septiembre de 2025", "40": "9 de septiembre de 2025",
  "41": "10 de septiembre de 2025", "42": "10 de septiembre de 2025",
  "43": "11 de septiembre de 2025", "44": "11 de septiembre de 2025",
  "45": "12 de septiembre de 2025", "46": "12 de septiembre de 2025",
  "47": "15 de septiembre de 2025", "48": "15 de septiembre de 2025",
  "49": "16 de septiembre de 2025", "50": "16 de septiembre de 2025",
  "51": "17 de septiembre de 2025", "52": "17 de septiembre de 2025",
  "53": "18 de septiembre de 2025", "54": "18 de septiembre de 2025",
  "55": "19 de septiembre de 2025", "56": "19 de septiembre de 2025",
  "57": "22 de septiembre de 2025", "58": "22 de septiembre de 2025",
  "59": "23 de septiembre de 2025", "60": "23 de septiembre de 2025",
  "61": "24 de septiembre de 2025", "62": "24 de septiembre de 2025",
  "63": "25 de septiembre de 2025", "64": "25 de septiembre de 2025",
  "65": "26 de septiembre de 2025", "66": "26 de septiembre de 2025",
  "67": "1 de octubre de 2025", "68": "1 de octubre de 2025",
  "69": "2 de octubre de 2025", "70": "2 de octubre de 2025",
  "71": "3 de octubre de 2025", "72": "3 de octubre de 2025",
  "73": "6 de octubre de 2025", "74": "6 de octubre de 2025",
  "75": "7 de octubre de 2025", "76": "7 de octubre de 2025",
  "77": "8 de octubre de 2025", "78": "8 de octubre de 2025",
  "79": "9 de octubre de 2025", "80": "9 de octubre de 2025",
  "81": "10 de octubre de 2025", "82": "10 de octubre de 2025",
  "83": "14 de octubre de 2025", "84": "14 de octubre de 2025",
  "85": "15 de octubre de 2025", "86": "15 de octubre de 2025",
  "87": "16 de octubre de 2025", "88": "16 de octubre de 2025",
  "89": "17 de octubre de 2025", "90": "17 de octubre de 2025",
  "91": "20 de octubre de 2025", "92": "20 de octubre de 2025",
  "93": "21 de octubre de 2025", "94": "21 de octubre de 2025",
  "95": "22 de octubre de 2025", "96": "22 de octubre de 2025",
  "97": "23 de octubre de 2025", "98": "23 de octubre de 2025"
};

document.getElementById('rentaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Topes DIAN 2025
  const TOPE_PATRIMONIO = 211792500;
  const TOPE_OTROS = 65891000;

  // Obtener valores
  const patrimonio = parseFloat(document.getElementById('patrimonio').value) || 0;
  const ingresos = parseFloat(document.getElementById('ingresos').value) || 0;
  const consumosTC = parseFloat(document.getElementById('consumosTC').value) || 0;
  const depositos = parseFloat(document.getElementById('depositos').value) || 0;
  const compras = parseFloat(document.getElementById('compras').value) || 0;
  const responsableIVA = document.getElementById('responsableIVA').value === 'si';
  const nit = document.getElementById('nit').value;
  const ultimosDos = nit.slice(-2).padStart(2, "0");

  // Evaluar condiciones
  const debeDeclarar = 
    patrimonio >= TOPE_PATRIMONIO ||
    ingresos >= TOPE_OTROS ||
    consumosTC >= TOPE_OTROS ||
    depositos >= TOPE_OTROS ||
    compras >= TOPE_OTROS ||
    responsableIVA;

  // Asignar fecha de presentación (si aplica)
  let fechaPresentacion = "";
  if (debeDeclarar && fechasPresentacion[ultimosDos]) {
    fechaPresentacion = `<br><strong>Fecha límite de presentación:</strong> ${fechasPresentacion[ultimosDos]}`;
  }

  // Mostrar resultado
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.className = 'resultado ' + (debeDeclarar ? 'debe' : 'no-debe');
  resultadoDiv.innerHTML = `
    ${debeDeclarar ? '✅ <strong>¡DEBES DECLARAR RENTA!</strong>' : '❌ <strong>No estás obligado a declarar.</strong>'}
    ${fechaPresentacion}
  `;

  // Habilitar botón PDF
  document.getElementById('btnPDF').disabled = false;
  window.appData = { debeDeclarar, ultimosDos, fechaPresentacion, nit };
});

// Generar PDF
document.getElementById('btnPDF').addEventListener('click', function() {
  const { debeDeclarar, ultimosDos, fechaPresentacion, nit } = window.appData;
  const doc = new jsPDF();

  // Configuración del PDF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Certificado de Obligación Tributaria", 20, 20);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // Contenido
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`NIT: ${nit}`, 20, 40);
  doc.text(`Últimos 2 dígitos: ${ultimosDos}`, 20, 50);
  doc.text(`Obligación: ${debeDeclarar ? 'DECLARAR RENTA' : 'NO DECLARAR RENTA'}`, 20, 60);
  if (debeDeclarar) {
    doc.text(`Fecha límite: ${fechasPresentacion[ultimosDos]}`, 20, 70);
  }

  // Firma del contador
  doc.setFont("helvetica", "bold");
  doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, 100);
  doc.setFont("helvetica", "normal");
  doc.text("Contador Públicico", 20, 105);
  doc.text("Cédula Profesional: [Número]", 20, 110);

  // Guardar PDF
  doc.save(`Certificado_Renta_${nit}.pdf`);
});
