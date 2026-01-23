// ===============================
// CONSTANTES DIAN 2025 (DECLARA 2026)
// ===============================
const UVT_2025 = 49798;

const TOPE_PATRIMONIO_UVT = 4500;
const TOPE_PATRIMONIO_PESOS = UVT_2025 * TOPE_PATRIMONIO_UVT;

const TOPE_OTROS_UVT = 1400;
const TOPE_OTROS_PESOS = UVT_2025 * TOPE_OTROS_UVT;

// ===============================
// FECHAS POR ÚLTIMOS 2 DÍGITOS NIT
// ===============================
const fechasPresentacion = {
  "00":"26 de octubre de 2026","01":"12 de agosto de 2026","02":"12 de agosto de 2026",
  "03":"13 de agosto de 2026","04":"13 de agosto de 2026",
  "05":"14 de agosto de 2026","06":"14 de agosto de 2026",
  "07":"18 de agosto de 2026","08":"18 de agosto de 2026",
  "09":"19 de agosto de 2026","10":"19 de agosto de 2026",
  "11":"20 de agosto de 2026","12":"20 de agosto de 2026",
  "13":"21 de agosto de 2026","14":"21 de agosto de 2026",
  "15":"24 de agosto de 2026","16":"24 de agosto de 2026",
  "17":"25 de agosto de 2026","18":"25 de agosto de 2026",
  "19":"26 de agosto de 2026","20":"26 de agosto de 2026",
  "21":"27 de agosto de 2026","22":"27 de agosto de 2026",
  "23":"28 de agosto de 2026","24":"28 de agosto de 2026",
  "25":"31 de agosto de 2026","26":"31 de agosto de 2026",
  "27":"1 de septiembre de 2026","28":"1 de septiembre de 2026",
  "29":"2 de septiembre de 2026","30":"2 de septiembre de 2026",
  "31":"3 de septiembre de 2026","32":"3 de septiembre de 2026",
  "33":"4 de septiembre de 2026","34":"4 de septiembre de 2026",
  "35":"7 de septiembre de 2026","36":"7 de septiembre de 2026",
  "37":"8 de septiembre de 2026","38":"8 de septiembre de 2026",
  "39":"9 de septiembre de 2026","40":"9 de septiembre de 2026",
  "41":"10 de septiembre de 2026","42":"10 de septiembre de 2026",
  "43":"11 de septiembre de 2026","44":"11 de septiembre de 2026",
  "45":"14 de septiembre de 2026","46":"14 de septiembre de 2026",
  "47":"15 de septiembre de 2026","48":"15 de septiembre de 2026",
  "49":"16 de septiembre de 2026","50":"16 de septiembre de 2026",
  "51":"17 de septiembre de 2026","52":"17 de septiembre de 2026",
  "53":"18 de septiembre de 2026","54":"18 de septiembre de 2026",
  "55":"21 de septiembre de 2026","56":"21 de septiembre de 2026",
  "57":"22 de septiembre de 2026","58":"22 de septiembre de 2026",
  "59":"23 de septiembre de 2026","60":"23 de septiembre de 2026",
  "61":"24 de septiembre de 2026","62":"24 de septiembre de 2026",
  "63":"25 de septiembre de 2026","64":"25 de septiembre de 2026",
  "65":"28 de septiembre de 2026","66":"28 de septiembre de 2026",
  "67":"1 de octubre de 2026","68":"1 de octubre de 2026",
  "69":"2 de octubre de 2026","70":"2 de octubre de 2026",
  "71":"5 de octubre de 2026","72":"5 de octubre de 2026",
  "73":"6 de octubre de 2026","74":"6 de octubre de 2026",
  "75":"7 de octubre de 2026","76":"7 de octubre de 2026",
  "77":"8 de octubre de 2026","78":"8 de octubre de 2026",
  "79":"9 de octubre de 2026","80":"9 de octubre de 2026",
  "81":"13 de octubre de 2026","82":"13 de octubre de 2026",
  "83":"14 de octubre de 2026","84":"14 de octubre de 2026",
  "85":"15 de octubre de 2026","86":"15 de octubre de 2026",
  "87":"16 de octubre de 2026","88":"16 de octubre de 2026",
  "89":"19 de octubre de 2026","90":"19 de octubre de 2026",
  "91":"20 de octubre de 2026","92":"20 de octubre de 2026",
  "93":"21 de octubre de 2026","94":"21 de octubre de 2026",
  "95":"22 de octubre de 2026","96":"22 de octubre de 2026",
  "97":"23 de octubre de 2026","98":"23 de octubre de 2026",
  "99":"26 de octubre de 2026"
};

// ===============================
// FORMULARIO
// ===============================
document.getElementById("rentaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const responsableIVA = document.getElementById("responsableIVA").value === "si";
  const patrimonio = Number(document.getElementById("patrimonio").value);
  const ingresos = Number(document.getElementById("ingresos").value);
  const consumosTC = Number(document.getElementById("consumosTC").value);
  const compras = Number(document.getElementById("compras").value);
  const depositos = Number(document.getElementById("depositos").value);
  const nit = document.getElementById("nit").value;

  const ultimosDos = nit.slice(-2).padStart(2, "0");

  let debeDeclarar = false;
  let razones = [];

  if (responsableIVA) {
    debeDeclarar = true;
    razones.push("Es responsable del IVA");
  }
  if (patrimonio > TOPE_PATRIMONIO_PESOS) {
    debeDeclarar = true;
    razones.push("Patrimonio superior al tope legal");
  }
  if (ingresos > TOPE_OTROS_PESOS) {
    debeDeclarar = true;
    razones.push("Ingresos superiores al tope legal");
  }
  if (consumosTC > TOPE_OTROS_PESOS) {
    debeDeclarar = true;
    razones.push("Consumos con tarjeta superiores al tope legal");
  }
  if (compras > TOPE_OTROS_PESOS) {
    debeDeclarar = true;
    razones.push("Compras y consumos superiores al tope legal");
  }
  if (depositos > TOPE_OTROS_PESOS) {
    debeDeclarar = true;
    razones.push("Consignaciones superiores al tope legal");
  }

  const resultado = document.getElementById("resultado");
  resultado.className = debeDeclarar ? "resultado debe" : "resultado no-debe";
  resultado.innerHTML = debeDeclarar
    ? `✅ <strong>OBLIGADO A DECLARAR</strong><br>
       Motivos: ${razones.join(", ")}<br>
       <strong>Fecha límite:</strong> ${fechasPresentacion[ultimosDos]}`
    : "❌ <strong>NO OBLIGADO A DECLARAR</strong>";

  window.appData = { nit, ultimosDos, debeDeclarar, razones };
  document.getElementById("btnPDF").disabled = false;
});

// ===============================
// GENERAR PDF (CON LOGO MARIA)
// ===============================
document.getElementById("btnPDF").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const data = window.appData;

  if (!data) {
    alert("Primero valida el formulario");
    return;
  }

  const doc = new jsPDF();

  const logo = new Image();
  logo.crossOrigin = "Anonymous";
  logo.src = "https://mariosand2026.github.io/consulta-declaracion-renta/logo.png";

  logo.onload = function () {

    // LOGO
    doc.addImage(logo, "PNG", 80, 80, 50, 50);

    // TÍTULO
    doc.setFontSize(18);
    doc.text("CERTIFICADO DE OBLIGACIÓN TRIBUTARIA", 105, 70, { align: "center" });

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
      doc.text(`Fecha límite: ${fechasPresentacion[data.ultimosDos]}`, 20, 110);
      doc.text("Motivos:", 20, 125);
      data.razones.forEach((r, i) => {
        doc.text(`• ${r}`, 25, 135 + i * 8);
      });
    }

    // FIRMA
    doc.text("MG Esp CP Mario Andrés Narváez Delgado", 20, 260);
    doc.text("Contador Público", 20, 268);

    doc.save(`Certificado_Renta_${data.nit}.pdf`);
  };
});
