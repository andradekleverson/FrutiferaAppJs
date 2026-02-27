// Definir o evento de submissão para o formulário
// onsubmit



// pega o botão de zerar listagem pelo ID
const recomecarButton = document.getElementById('recomecarButton');

recomecarButton.addEventListener('click', () => {
    // limpa todo o localStorage
    localStorage.clear();



    Toastify({
     text: 'Frutífera zerada com sucesso!',
     className: 'info',
     style: {
      background: 'linear-gradient(to right, #c0c579, #9fc730)',
    },
    duration: 1000
    }).showToast();


    // Preciso que os dois estejam em sicronia para o toast aparecer!
    setTimeout(() => {
        location.reload();
    }, 1000);


});



// permite que o preenchimento do formulário apareça na tabela da página de cadastro:
const insertRowTBody = (fruteira) => {

  let fruteiraTBody = document.getElementById(
    'fruteiraTBody',
  );
  
  let row = `<tr>
          <th scope="row">${fruteira.id}</th>
          <td>${fruteira.nomePopular}</td>
          <td>${fruteira.nomeCientifico}</td>
          <td>${fruteira.producaoMedia}</td>
          <td>${fruteira.dataPlantio}</td>
        </tr>`;
  fruteiraTBody.insertAdjacentHTML('beforeend', row);
};





// buscará no localstorage pela chave 'plantio' e converte a JSON em objeto js:
let plantio = JSON.parse(localStorage.getItem('plantio')) ?? []; // se for nulo, a gente terá array vazia


// dps que virou um objeto js, é só percorrer o que há dentro dessa array
for (let fruteira of plantio) {
  insertRowTBody(fruteira); // com essa estrutura de repetição, a variável recebe um objeto da array list a cada rodada
}


// guardando o elemento form dentro dessa variável
let form_da_fruteira = document.getElementById('form_da_fruteira');


// no onsubmit, a gente usa ela pra controlar o botão de submit da página web
form_da_fruteira.onsubmit = (event) => {
  event.preventDefault();
  console.log('Controlando a submissão do browser');


  // Captar os valores digitados nos elementos do formulário.
  let nomePopularInput = document.getElementById('nomePopular');
  let nomePopular = nomePopularInput.value;

  let nomeCientificoInput = document.getElementById('nomeCientifico');
  let nomeCientifico = nomeCientificoInput.value;

  let producaoMediaInput = document.getElementById('producaoMedia');
  let producaoMedia = producaoMediaInput.value;

  let dataPlantioInput = document.getElementById('dataPlantio');
  let dataPlantio = dataPlantioInput.value;





  // Persistir os dados no LocalStorage.
  let fruteiraJson = {
    id: Date.now(),
    nomePopular: nomePopular,
    nomeCientifico: nomeCientifico,
    producaoMedia: producaoMedia,
    dataPlantio: dataPlantio,
  };

  plantio.push(fruteiraJson); // o push atualiza a array original com o novo objeto JS

  // aqui armazenamos no local storage
  localStorage.setItem(
    'plantio',
    JSON.stringify(plantio),
  ); // a gente localiza a array list e utiliza a função de transformar em JSON string


  // Atualizar a listagem das fruteiras na tabela.
  insertRowTBody(fruteiraJson);

  $('#modal_da_fruteira').modal('hide');

  Toastify({
    text: 'Fruta cadastrada com sucesso!',
    className: 'info',
    style: {
      background: 'linear-gradient(to right, #c0c579, #9fc730)',
    },
  }).showToast();
};
