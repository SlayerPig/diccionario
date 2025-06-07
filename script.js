let datos;

// Cargar el JSON (jasdjjads ahi dice yeison asi komo el de la motosierra)
fetch('data/diccionario.json')
  .then(res => res.json())
  .then(json => {
    datos = json;
    mostrarRimas('');
  });

// Quitar acentos de una cadena (ajajakakaajajk las cadenas no tienen acentos porke son  de metal ajsjdja)
function quitarAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Mostrar resultados de rimas rimosas rimudas rimoneras remolino 
function mostrarRimas(palabra) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = '';

  if (palabra === '') {
    cont.innerHTML = '<p>Escribe una palabra para encontrar rimas.</p>';
    return;
  }

  const palabraNormalizada = quitarAcentos(palabra.toLowerCase());

  const entrada = datos.find(e =>
    quitarAcentos(e.palabra.toLowerCase()) === palabraNormalizada
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
      quitarAcentos(e.terminacion).includes(terminacion)
    );

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

// Escuchar entrada de texto textoso
document.getElementById('busqueda').addEventListener('input', e => {
  const palabra = e.target.value.toLowerCase();
  mostrarRimas(palabra);
});

// Cambiar color del tema asi para ke se vea bien colorido komo ut kieras
document.getElementById('tema').addEventListener('change', e => {
  const tema = e.target.value;
  let color;

  switch (tema) {
    case 'verde':
      color = '#66bb6a';
      break;
    case 'rojo':
      color = '#ef5350';
      break;
    case 'morado':
      color = '#ab47bc';
      break;
    case 'azul':
    default:
      color = '#4fc3f7';
  }

  document.documentElement.style.setProperty('--color-principal', color);
});
