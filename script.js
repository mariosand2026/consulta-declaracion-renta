document.getElementById('rentaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Topes DIAN 2025 (en pesos colombianos)
  const TOPE_PATRIMONIO = 211792500;
  const TOPE_OTROS = 65891000; // Para ingresos, TC, depósitos, compras

  // Obtener valores del formulario
  const patrimonio = parseFloat(document.getElementById('patrimonio').value) || 0;
  const ingresos = parseFloat(document.getElementById('ingresos').value) || 0;
  const consumosTC = parseFloat(document.getElementById('consumosTC').value) || 0;
  const depositos = parseFloat(document.getElementById('depositos').value) || 0;
  const compras = parseFloat(document.getElementById('compras').value) || 0;
  const responsableIVA = document.getElementById('responsableIVA').value === 'si';

  // Evaluar condiciones
  const debeDeclarar = 
    patrimonio >= TOPE_PATRIMONIO ||
    ingresos >= TOPE_OTROS ||
    consumosTC >= TOPE_OTROS ||
    depositos >= TOPE_OTROS ||
    compras >= TOPE_OTROS ||
    responsableIVA;

  // Mostrar resultado
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.className = 'resultado ' + (debeDeclarar ? 'debe' : 'no-debe');
  
  if (debeDeclarar) {
    resultadoDiv.innerHTML = `
      ✅ <strong>¡DEBES DECLARAR RENTA!</strong><br>
      Cumples con al menos una de las condiciones obligatorias.
    `;
  } else {
    resultadoDiv.innerHTML = `
      ❌ <strong>No estás obligado a declarar renta.</strong><br>
      No superas ninguno de los topes establecidos.
    `;
  }
});
