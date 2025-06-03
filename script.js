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

function mostrarModo(modo) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = '';

  if (modo === 'alfabetico') {
    datos.sort((a, b) => a.palabra.localeCompare(b.palabra));
    datos.forEach(entry => {
      cont.innerHTML += `
        <div class="entrada">
          <h2>${entry.palabra}</h2>
          <p><strong>Tipo:</strong> ${entry.tipo}</p>
          <p><strong>Pronunciación:</strong> ${entry.pronunciacion}</p>
          <p><strong>Definición:</strong> ${entry.definicion}</p>
          <p><strong>Ejemplo:</strong> <em>${entry.ejemplo}</em></p>
          <p><strong>Sinónimos:</strong> ${entry.sinonimos.join(', ')}</p>
          <p><strong>Antónimos:</strong> ${entry.antonimos.join(', ')}</p>
          <hr>
        </div>
      `;
    });
  }
  } else if (modo === 'sinonimos') {
    datos.forEach(entry => {
      cont.innerHTML += `<p><strong>${entry.palabra}</strong> – Sinónimos: ${entry.sinonimos.join(', ')}</p>`;
    });
  } else if (modo === 'temas') {
    const porTema = {};
    datos.forEach(entry => {
      entry.temas.forEach(t => {
        porTema[t] = porTema[t] || [];
        porTema[t].push(entry.palabra);
      });
    });
    for (let tema in porTema) {
      cont.innerHTML += `<h3>${tema}</h3><p>${porTema[tema].join(', ')}</p>`;
    }
  }
}
