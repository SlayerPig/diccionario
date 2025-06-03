let datos;

fetch('data/diccionario.json')
  .then(res => res.json())
  .then(json => {
    datos = json;
    mostrarModo('alfabetico');
  });

document.getElementById('modo').addEv
entListener('change', e => {
  mostrarModo(e.target.value);
});

function mostrarModo(modo) {
  const cont =
document.getElementById('contenido');
  cont.innerHTML = '';

if (modo === 'alfabetico') {
  datos.sort((a, b) =>
a.palabra.localeCompare(b.palabra));
  datos.forEach(entry => {
    cont.innerHTML += `<p><strong>${entry.palabra}</strong>: $
    {entry.definicion}</p>`;
  });
} else if (modo === 'sinonimos') {
  datos.forEach(entry => {
    cont.innerHTML += `<p><strong>$
      
