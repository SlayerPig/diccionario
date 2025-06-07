let datos;
let idiomaActual = 'es';

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

document.getElementById('tema').addEventListener('change', e => {
  const tema = e.target.value;
  const colores = {
    azul: '#4fc3f7',
    verde: '#66bb6a',
    rojo: '#ef5350',
    morado: '#ab47bc'
  };
  document.documentElement.style.setProperty('--color-principal', colores[tema] || colores.azul);
});

document.getElementById('idioma').addEventListener('change', e => {
  idiomaActual = e.target.value;
  document.getElementById('busqueda').placeholder = {
    es: 'Escribe una palabra para rimar...',
    en: 'Type a word to rhyme...',
    fr: 'Tape un mot pour rimer...'
  }[idiomaActual];
  mostrarRimas(document.getElementById('busqueda').value.toLowerCase());
});

function quitarAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarRimas(palabra) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = '';

  if (palabra === '') {
    cont.innerHTML = idiomaActual === 'es'
      ? '<p>Escribe una palabra para encontrar rimas.</p>'
      : idiomaActual === 'en'
      ? '<p>Type a word to find rhymes.</p>'
      : '<p>Tape un mot pour trouver des rimes.</p>';
    return;
  }

  const palabraNormalizada = quitarAcentos(palabra.toLowerCase());

  const entrada = datos.find(e =>
    quitarAcentos(e.palabra.toLowerCase()) === palabraNormalizada && e.idioma === idiomaActual
  );

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
    const terminacion = palabraNormalizada.slice(-2);
    const sugerencias = datos.filter(e =>
      quitarAcentos(e.terminacion).includes(terminacion) && e.idioma === idiomaActual
    );

    if (sugerencias.length === 0) {
      cont.innerHTML = `<p>${
        idiomaActual === 'es'
          ? `No se encontraron rimas para "<strong>${palabra}</strong>".`
          : idiomaActual === 'en'
          ? `No rhymes found for "<strong>${palabra}</strong>".`
          : `Aucune rime trouvée pour "<strong>${palabra}</strong>".`
      }</p>`;
    } else {
      cont.innerHTML = `<p>${
        idiomaActual === 'es'
          ? `No se encontró "${palabra}", pero estas palabras riman de forma parcial:`
          : idiomaActual === 'en'
          ? `No exact match for "${palabra}", but partial rhymes found:`
          : `Pas de correspondance exacte pour "${palabra}", mais des rimes partielles:`
      }</p>`;
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
