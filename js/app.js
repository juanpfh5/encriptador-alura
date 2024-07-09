document.addEventListener('DOMContentLoaded', function () { // Escoger un gif aleatorio al cargar la página
  random_gif();
});

let text_to_work = document.getElementById('text_to_work');

function corregirTexto(texto) { // Corregir texto para que nsiga los estándares del encriptado Alura
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

text_to_work.addEventListener('input', function (e) { // Corregir texto en tiempo real
  let select = document.getElementById('type_encode');
  let selectedOption = select.options[select.selectedIndex].value;

  if (selectedOption === '1') { // Alura
    e.target.value = corregirTexto(e.target.value);
  }
});

const selectElement = document.querySelector('#type_encode'); 

selectElement.addEventListener('change', (event) => { // Mostrar o no la advertencia debajo del text_to_work
  const seleccionado = event.target.value;
  let workspace__form__div_text = document.getElementById('workspace__form__div_text');

  if (seleccionado === '1') { // Alura
    workspace__form__div_text.style.display = 'flex';
    text_to_work.value = corregirTexto(text_to_work.value);
  } else {
    workspace__form__div_text.style.display = 'none';
  }
});

function getText() { // Obtener el texto a trabajar
  let text = document.getElementById('text_to_work').value;

  return text;
}

function getOption() { // Obtener la opción seleccionada
  let select = document.getElementById('type_encode');
  let selectedOption = select.options[select.selectedIndex].value;

  return selectedOption;
}

function encode_text() { // Codificar el texto
  selectedOption = getOption();

  switch (selectedOption) {
    case '1':
      // Alura
      text = alura(true);
      break;
    case '2':
      // Base64
      text = btoa(getText());
      break;
    case '3':
      // Cesar
      text = cesar(getText(), 3);
      break;
    default:
      console.log('Opción no válida');
      return;
  }

  clear_text(text);
}

function decode_text() { // Decodificar el texto
  selectedOption = getOption();

  switch (selectedOption) {
    case '1':
      // Alura
      text = alura(false);
      break;
    case '2':
      // Base64
      text = atob(getText());
      break;
    case '3':
      // Cesar
      text = cesar(getText(), -3);
      break;
    default:
      console.log('Opción no válida');
      return;
  }

  clear_text(text);
}

function alura(encode) { // Encriptado Alura
  let text = getText();
  let result = '';

  if (encode) { // Codificar
    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      switch (char) {
        case 'a':
          result += 'ai';
          break;
        case 'e':
          result += 'enter';
          break;
        case 'i':
          result += 'imes';
          break;
        case 'o':
          result += 'ober';
          break;
        case 'u':
          result += 'ufat';
          break;
        default:
          result += char;
      }
    }

    return result;
  } else { // Decodificar
    text = text.replace(/ai/g, 'a');
    text = text.replace(/enter/g, 'e');
    text = text.replace(/imes/g, 'i');
    text = text.replace(/ober/g, 'o');
    text = text.replace(/ufat/g, 'u');

    return text;
  }
}

function cesar(text, shift) { // Encriptado Cesar
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabet_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (alphabet.includes(char)) {
      result += alphabet[(alphabet.indexOf(char) + shift + 26) % 26];
    } else {
      if (alphabet_upper.includes(char)) {
        result += alphabet_upper[(alphabet_upper.indexOf(char) + shift + 26) % 26];
      } else {
        result += char;
      }
    }
  }

  return result;
}


function clear_text(final_text) { // Mostrar el resultado
  let text = text_to_work.value;
  const image = document.getElementById('result__div__img');
  let text_h3_result = document.getElementById('result__div__h3');
  let text_p_result = document.getElementById('result__div__text');
  let result__btn_copy = document.getElementById('result__btn_copy');
  let result__div = document.getElementById('result__div');

  if (text === '') { // Si está vacío
    if (window.matchMedia('(min-width: 1024px)').matches) {
      image.style.display = 'block';
      random_gif();
    }
    text_p_result.style.display = 'block';
    text_h3_result.textContent = 'Ningún mensaje fue encontrado';
    result__div.style.justifyContent = 'center';
    result__btn_copy.style.display = 'none';
  } else { 
    image.style.display = 'none';
    text_p_result.style.display = 'none';
    text_h3_result.textContent = final_text;
    result__btn_copy.style.display = 'block';
    result__div.style.justifyContent = 'initial';
  }
}

function copy_text() { // Copiar el texto al portapapeles
  const h3Element = document.getElementById('result__div__h3');
  const textArea = document.createElement('textarea');
  textArea.value = h3Element.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, 99999); // Para dispositivos móviles
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function random_gif() { // Escoger un gif aleatorio
  const img = document.getElementById('result__div__img');
  const rute = ["img/caitlyn.gif", "img/puppet_black_box.gif"]

  img.src = rute[Math.floor(Math.random() * rute.length)];
}