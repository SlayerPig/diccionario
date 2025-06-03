let datos;

fetch('data/diccionario.json')
  .then(res => res.json())
  .then(json => {
    datos = json;
    mostrarModo('alfabetico');
  });

document.getElementById('modo').addEventListener('change', e => {
  mostrarModo(e.target.value);
});

document.getElementById('busqueda').addEventListener('input', () => {
  mostrarModo(document.getElementById('modo').value);
});

function mostrarModo(modo) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = '';

  const filtro = document.getElementById('busqueda').value.toLowerCase();

  let filtrados = datos.filter(entry =>
    entry.palabra.toLowerCase().includes(filtro)
  );

  if (modo === 'alfabetico') {
    filtrados.sort((a, b) => a.palabra.localeCompare(b.palabra));
    filtrados.forEach(entry => {
      cont.innerHTML += generarEntrada(entry);
    });

  } else if (modo === 'sinonimos') {
    filtrados.forEach(entry => {
      cont.innerHTML += `
        <div class="entrada">
          <h2>${entry.palabra}</h2>
          <p><strong>Sinónimos:</strong> ${entry.sinonimos.join(', ')}</p>
          <p><strong>Antónimos:</strong> ${entry.antonimos.join(', ')}</p>
        </div>
      `;
    });

  } else if (modo === 'temas') {
    const porTema = {};

    filtrados.forEach(entry => {
      entry.temas.forEach(t => {
        if (!porTema[t]) porTema[t] = [];
        porTema[t].push(entry);
      });
    });

    for (let tema in porTema) {
      cont.innerHTML += `<h2>${tema}</h2>`;
      porTema[tema].forEach(entry => {
        cont.innerHTML += generarEntrada(entry);
      });
    }
  }
}

function generarEntrada(entry) {
  return `
    <div class="entrada">
      <h2>${entry.palabra}</h2>
      <p><strong>Tipo:</strong> ${entry.tipo}</p>
      <p><strong>Pronunciación:</strong> ${entry.pronunciacion}</p>
      <p><strong>Definición:</strong> ${entry.definicion}</p>
      <p><strong>Ejemplo:</strong> <em>${entry.ejemplo}</em></p>
      <p><strong>Sinónimos:</strong> ${entry.sinonimos.join(', ')}</p>
      <p><strong>Antónimos:</strong> ${entry.antonimos.join(', ')}</p>
    </div>
  `;
}
