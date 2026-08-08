// //fetch(URL,{options:GET,POST,PUT,DELETE})


// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")//this func is promise based i.e it may reject or resolve
//     // .then(response => console.log(response))
//     // .then(response => response.json())//for formatting into object json
    
//     .then(response => {
//         if(!response.ok){
//             throw new Error("Could not fetch resource");
//         }
//         return response.json();
//     })
    
//     .then(data => console.log(data))//details
//     // .then(data => console.log(data.height))//particular fetch
//     .catch((error)=>console.error(error)
//     );
    

fetchDATA();
async function fetchDATA() {
    try{
        const pokemonNameInput = document.getElementById("pokemonName");
        const messageEl = document.getElementById("message");
        const pokemonName = pokemonNameInput.value.trim().toLowerCase();

        // clear previous messages
        if(messageEl){ messageEl.style.display = 'none'; messageEl.classList.remove('error'); messageEl.textContent = ''; }

        if(!pokemonName){
            if(messageEl){ messageEl.textContent = 'Please enter a Pokémon name.'; messageEl.style.display = 'inline-block'; messageEl.classList.remove('error'); }
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        console.log(data);
        const pokemonSprite = data.sprites.front_default;//here the all pokemon image is store
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display ="inline";
        imgElement.style.width = "344px";

        const power = document.getElementById("power");
        const pokemonType = data.types[0].type.name;
        power.textContent = pokemonType;

        const pokemonNameValue = data.name;
        const formattedName = pokemonNameValue
            .split("-")
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join("_");
        const bulbaUrl = `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(Pok%C3%A9mon)`;
        power.href = bulbaUrl;
        power.title = `View ${formattedName} info on Bulbapedia`;

        const powerInfo = document.querySelector(".power-info");
        powerInfo.style.display = "flex";
        // hide any previous message on success
        if(messageEl){ messageEl.style.display = 'none'; messageEl.classList.remove('error'); messageEl.textContent = ''; }
    }
    catch(error){
        console.error(error);
        const messageEl = document.getElementById("message");
        const imgElement = document.getElementById("pokemonSprite");
        const powerInfo = document.querySelector(".power-info");
        if(imgElement) imgElement.style.display = 'none';
        if(powerInfo) powerInfo.style.display = 'none';
        if(messageEl){
            messageEl.textContent = "Can't find that Pokémon — please check the name.";
            messageEl.classList.add('error');
            messageEl.style.display = 'inline-block';
        }
    }
}