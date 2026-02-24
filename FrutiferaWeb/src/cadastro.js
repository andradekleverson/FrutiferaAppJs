// Definir o evento de submissão para o formulário
// onsubmit







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






let plantio = JSON.parse(localStorage.getItem('plantio')) ?? [];



for (let fruteira of plantio) {
  insertRowTBody(fruteira);
}


let form_da_fruteira = document.getElementById('form_da_fruteira');


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

  plantio.push(fruteiraJson);

  localStorage.setItem(
    'plantio',
    JSON.stringify(plantio),
  );

  // Atualizar a listagem das IEs na tabela.
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
