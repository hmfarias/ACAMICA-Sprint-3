
// Medicion temperatura frontend :
// usando el api https://pokeapi.co/
// crear un dashboard de tarjetas de pokemon

let limit = 25;
let offset = 0;
let pages = 0;


let URL_BASE_POKEMON = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;


window.onload = function () {
    showPokemons(); //load the pokemons
};


let containerPokemon = document.getElementById('containerPokemon');//get div node for show pokemon's card
let buttonsPage = document.getElementById('buttonsPage'); //get the div node where the paging buttons will be located
let scrollLeftButton = document.getElementById('scrollLeftButton'); //get input node for scroll left
let scrollRightButton = document.getElementById('scrollRightButton');//get input node for scroll right


let totalPokemons = getPokemonsTotal();
totalPokemons.then((response) => {
    console.log(response);
    pages = response / limit;
    console.log('pages en promesa');
    console.log(pages);

    // let pages = parseInt(infoGeneral.count) / limit;
    // pages = 10;
    // pages > 14 ? pages = 7 : pages = pages;

    buttonsPage.innerHTML += '';

    for (let index = 0; index < pages; index++) {

        //create the button element 
        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.className = "buttonsPage__button"; // set the CSS class
        inputButton.id = index;
        inputButton.value = index + 1;
        buttonsPage.appendChild(inputButton); // put it into the DOM

    }
    buttonsPage.innerHTML += `
        <input id="R" class="buttonsPage__button__red" type="button" value="R">
    `
    let buttonsList = document.getElementsByClassName('buttonsPage__button');
    let buttonNext = document.getElementById('R');
    buttonNext.addEventListener('click' , ()=> {
        console.log('entra click next R');
    });

    //add event click in each button
    for (let indexb = 0; indexb < buttonsList.length; indexb++) {
        let buttonElement = buttonsList[indexb];
    
        buttonElement.addEventListener("click", (event) => {
            buttonElement.style.backgroundColor = 'white';
            buttonElement.style.color = 'blue';
            buttonElement.style.border = 'solid 1px blue';
            offset = event.target.id * limit;
            URL_BASE_POKEMON = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
            showPokemons();
        });

        buttonElement.addEventListener('mouseover' , () => {
            buttonElement.style.backgroundColor = 'red';
            buttonElement.style.color = 'white';
            buttonElement.style.border = 'solid 1px blue';
        });
        buttonElement.addEventListener('mouseout' , (event) => {
            console.log(event);
            console.log('activo');
            console.log(document.activeElement.id);
            if(document.activeElement.id !== event.target.id){
                buttonElement.style.backgroundColor = 'blue';
                buttonElement.style.color = 'white';
                buttonElement.style.border = 'none';
            }
        });
        buttonElement.addEventListener('blur' , () => {
            buttonElement.style.backgroundColor = 'blue';
            buttonElement.style.color = 'white';
            buttonElement.style.border = 'none';
        });
    }
});

async function showPokemons() {
    try {
        let infoGeneral = await getPokemonsList();
        containerPokemon.innerHTML = "";
        infoGeneral.results.forEach((element) => {

            let infoPokemon = getPokemon(element.url);
            infoPokemon.then((response) => {
                
                let imgSrc = response.sprites.other.dream_world.front_default;
                if(imgSrc ===null) imgSrc = response.sprites.front_default;

                let idPokemon = response.id;
                let orderPokemon = response.order;
                let heightPokemon = response.height;
                let movesPokemon = response.moves.length;
                let weightPokemon = response.weight;
                let abilitiesPokemon = response.abilities.length;

                //construct the types for each pokemon
                let arrayTypes = response.types;
                let typesPockemon = '';
                arrayTypes.forEach((element, index) => {
                    index === arrayTypes.length - 1 ? typesPockemon += element.type.name : typesPockemon += element.type.name + ', ';
                });

                let experiencePokemon = response.base_experience

                // construct the inerHTML for each Pokemon
                containerPokemon.innerHTML += `
                <div class="eachPokemon">
                    <div class="containImg">
                        <p >${element.name}</p>
                        <img src="${imgSrc}" alt="imágen pokemon">
                    </div>
                    <div class="containInfo">
                        <p><b>id:</b>  <span>${idPokemon}</span></p>
                        <p><b>order:</b>  <span>${orderPokemon}</p>
                    </div>
                    <div class="containInfo">
                        <p><b>height:</b> <span> ${heightPokemon}</span></p>
                        <p><b>moves:</b>  <span>${movesPokemon}</span></p>
                    </div class="containInfo">
                    <div class="containInfo">
                        <p><b>weight:</b>  <span>${weightPokemon}</span></p>
                        <p><b>abilities:</b>  <span>${abilitiesPokemon}</p>
                    </div>
                    <div class="containInfo">
                        <p><b>type:</b>  <span>${typesPockemon}</span></p>
                        <p><b>experience:</b>  <span>${experiencePokemon}</span></p>
                    </div>
                </div>
            `;
            });
        });
    } catch (error) {
        console.error(error);
    }
}

//SCROLLING ELEMENTS ------------------------------------------------------
var scrollAmount = 0;
var scrollMin = 0;
var scrollMax = buttonsPage.clientWidth;

scrollRightButton.addEventListener('click' , () => {
    buttonsPage.scrollTo({
        top: 0,
        left: Math.max(scrollAmount += 500, scrollMax),
        behavior: 'smooth'
      });
});

scrollLeftButton.addEventListener('click' , () => {
    buttonsPage.scrollTo({
        top: 0,
        left: Math.max(scrollAmount -= 500, scrollMin),
        behavior: 'smooth'
      });
});
// END SCROLLING ELEMENTS ------------------------------------------------------



//SERVICES --------------------------------------------------------------------
// get all Pokemon list
async function getPokemonsList() {
    const response = await fetch(URL_BASE_POKEMON);
    const listaPokemons = await response.json();
    return listaPokemons;
}

// get Pokemon total elements
async function getPokemonsTotal() {
    const response = await fetch(URL_BASE_POKEMON);
    const listaPokemons = await response.json();
    return listaPokemons.count;
}

//get single pokemon by name
async function getPokemon(url) {
    const response = await fetch(url);
    const pokemon = await response.json();
    return pokemon;
}
//END SERVICES --------------------------------------------------------------------



