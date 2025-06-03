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
      cont.innerHTML += `<p><strong>${entry.palabra}</strong>: ${entry.definicion}</p>`;
    });
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
