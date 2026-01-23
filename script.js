/***************************************************
 *  TOPES DIAN 2025 (Año gravable 2025 – Declara 2026)
 ***************************************************/
const UVT_2025 = 49798;
const TOPE_PATRIMONIO_UVT = 4500;
const TOPE_PATRIMONIO_PESOS = UVT_2025 * TOPE_PATRIMONIO_UVT;
const TOPE_OTROS_UVT = 1400;
const OTROS_PESOS = UVT_2025 * TOPE_OTROS_UVT;

/***************************************************
 *  FECHAS DE PRESENTACIÓN POR NIT
 ***************************************************/
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

/***************************************************
 *  FORMULARIO
 ***************************************************/
document.getElementById('rentaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const responsableIVA = document.getElementById('responsableIVA').value === 'si';
  const patrimonio = parseFloat(document.getElementById('patrimonio').value) || 0;
  const ingresos = parseFloat(document.getElementById('ingresos').value) || 0;
  const consumosTC = parseFloat(document.getElementById('consumosTC').value) || 0;
  const compras = parseFloat(document.getElementById('compras').value) || 0;
  const depositos = parseFloat(document.getElementById('depositos').value) || 0;
  const nit = document.getElementById('nit').value.trim();
  const ultimosDos = nit.slice(-2).padStart(2, "0");

  let debeDeclarar = false;
  let razones = [];

  if (responsableIVA) {
    debeDeclarar = true;
    razones.push("Es responsable del IVA");
  } else {
    if (patrimonio > TOPE_PATRIMONIO_PESOS) razones.push("Patrimonio superior al tope");
    if (ingresos > OTROS_PESOS) razones.push("Ingresos superiores al tope");
    if (consumosTC > OTROS_PESOS) razones.push("Consumos con TC superiores al tope");
    if (compras > OTROS_PESOS) razones.push("Compras superiores al tope");
    if (depositos > OTROS_PESOS) razones.push("Depósitos superiores al tope");
    if (razones.length > 0) debeDeclarar = true;
  }

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.className = 'resultado ' + (debeDeclarar ? 'debe' : 'no-debe');
  resultadoDiv.innerHTML = debeDeclarar
    ? `✅ <strong>¡DEBES DECLARAR RENTA!</strong><br><small>${razones.join(", ")}</small><br><strong>Fecha límite:</strong> ${fechasPresentacion[ultimosDos]}`
    : '❌ <strong>No estás obligado a declarar.</strong>';

  document.getElementById('btnPDF').disabled = false;

  window.appData = { debeDeclarar, nit, ultimosDos, razones };
});

/***************************************************
 *  GENERAR PDF
 ***************************************************/
document.getElementById('btnPDF').addEventListener('click', function () {
  try {
    const { jsPDF } = window.jspdf;
    const { debeDeclarar, nit, ultimosDos, razones } = window.appData;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Certificado de Obligación Tributaria", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`NIT: ${nit}`, 20, 40);
    doc.text(`Resultado: ${debeDeclarar ? "OBLIGADO A DECLARAR" : "NO OBLIGADO"}`, 20, 50);
    doc.text(`Fecha límite: ${fechasPresentacion[ultimosDos]}`, 20, 60);

    doc.text("Motivos:", 20, 75);
    razones.forEach((r, i) => doc.text(`- ${r}`, 25, 85 + i * 8));

    doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, 140);
    doc.text("Contador Público", 20, 148);

    doc.save(`Certificado_Renta_${nit}.pdf`);
  } catch (e) {
    console.error(e);
    alert("Error generando el PDF. Revisa la consola.");
  }
});
