
// importando a partir do local storage:
import fruteira_objetojs from "./dataset/registrarfruta.js";


// obter a duração temporal do plantio, começando a partir da data de inicio do plantio:
const calcularIdade = (dataPlantio) => {
    const dataAtual = new Date(); // momento presente
    const dataPlantioDate = new Date(dataPlantio); // string vai virar um objeto Date

    const meses = dataAtual.getMonth() - dataPlantioDate.getMonth();

    return meses;
}


// criação de cards em sintaxe HTML, passando um objeto JavaScript (ou seja, a nova fruta registrada) como parâmetro:
const createFrutaCard = (novafruta) => {


    // Passando a idade do plantio em meses:

    const idadeEmMeses = calcularIdade(novafruta.dataPlantio);

    let card = `

        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${novafruta.nomePopular}</h6>
                    <p class="card-text">ID do Registro: ${novafruta.id}</p>
                    <p class="card-text">Nome Botânico: ${novafruta.nomeCientifico}</p>
                    <p class="card-text">Produtividade Média (Kg): ${novafruta.producaoMedia}</p>
                    <p class="card-text">Início do Plantio: ${novafruta.dataPlantio}</p>
                    <p class="card-text">Idade: ${idadeEmMeses} meses</p>    
                </div>
            </div>
        </div>
    `

    return card;
}


// inserção de cards já preenchidos na página WEB, através de uma arrow function:

let addFrutaCard = (card_preenchido) => {

    let listagem_de_frutasCardsRow = document.getElementById("listagem_de_frutasCardsRow");

    listagem_de_frutasCardsRow.insertAdjacentHTML('beforeend', card_preenchido);

}


// função de cards dinâmicos (que precisará das duas anteriores):

const loadFrutaCard = () => {

    for (let fruta of fruteira_objetojs) { // vai percorrer cada fruta listada pela fruteira no local storage, uma a uma

        let criar_card = createFrutaCard(fruta); // vai criar o card em sintaxe HTML, para a fruta atual

        addFrutaCard(criar_card); // passa o card preenchido como parâmetro para a função de inserção na página
    }

};


// loadFrutaCard();

window.onload = loadFrutaCard;