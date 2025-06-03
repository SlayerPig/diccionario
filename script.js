let datos;

fetch('data/diccionario.json')
  .then(res => res.json())
  .then(json => {
    datos = json;
    mostrarRimas('');
  });

document.getElementById('busqueda').addEventListener('input', e => {
  const palabra = e.target.value.toLowerCase();
  mostrarRimas(palabra);
});

function mostrarRimas(palabra) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = '';

  if (palabra === '') {
    cont.innerHTML = '<p>Escribe una palabra para encontrar rimas.</p>';
    return;
  }

  const entrada = datos.find(e => e.palabra.toLowerCase() === palabra);

  if (entrada) {
    cont.innerHTML += `
      <div class="entrada">
        <h2>${entrada.palabra}</h2>
        <p><strong>Rimas:</strong> ${entrada.rimas.join(', ')}</p>
        <p><strong>Temas:</strong> ${entrada.temas.join(', ')}</p>
        <p><strong>Terminación:</strong> -${entrada.terminacion}</p>
      </div>
    `;
  } else {
    // Si no encuentra la palabra exacta, busca por terminación similar
    const terminacion = palabra.slice(-2); // las dos últimas letras
    const sugerencias = datos.filter(e => e.terminacion.includes(terminacion));

    if (sugerencias.length === 0) {
      cont.innerHTML = `<p>No se encontraron rimas para "<strong>${palabra}</strong>".</p>`;
    } else {
      cont.innerHTML = `<p>No se encontró "${palabra}", pero estas palabras riman de forma parcial:</p>`;
      sugerencias.forEach(entry => {
        cont.innerHTML += `
          <div class="entrada">
            <h2>${entry.palabra}</h2>
            <p><strong>Rimas:</strong> ${entry.rimas.join(', ')}</p>
            <p><strong>Temas:</strong> ${entry.temas.join(', ')}</p>
          </div>
        `;
      });
    }
  }
}
