
let puppyData;
let teamData;
const list = document.querySelector('ul');
const itemDisplay = document.querySelector('div');
let current;
let id;
main();

async function main(){
    await getPuppyData();
    console.log(puppyData);
    console.log(teamData);
    renderList();
    selectPlayer();
}

async function getPuppyData(){
    let response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
    let jdata = await response.json();
    puppyData = jdata.data.players;
    response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/teams');
    jdata = await response.json();
    teamData = jdata.data.teams;
}

window.addEventListener("hashchange", () => {
    
    selectPlayer();
})

function selectPlayer(){
        
    getEventFromHash();
    renderPlayerInfo();
    
    window.scroll({
        top: 0,
        left:0,
        behavior: "smooth"
    })
}

function getEventFromHash(){
    //get the id from the hash
    
    if(current !== undefined){
        rerenderItemFromList(document.getElementById(`c${id}`));
    }

    id = window.location.hash.slice(1);

    const item = puppyData.find((i) => {
        return i.id === (id*1);
    })

    current = item;
    
    unrenderItemFromList(document.getElementById(`c${id}`));
}

function rerenderItemFromList(element){
    element.innerHTML = `
    <div class="dogcard">
    <h3><a href=#${current.id}> ${current.name} </a></h3>
    <h4>${current.breed}</h4>
    </div>
    `;
}
function unrenderItemFromList(element){
    element.innerHTML = "";
}

function renderPlayerInfo(){
    if(current === undefined){
        return;
    }
    const team = teamData.find((i) => {
        return i.id === current.teamId;
    });
    itemDisplay.innerHTML = `
    <a href=""> Return to Home </a>
    <div class = "box">
    <h2>${current.name}</h2>
    <p>Breed: ${current.breed}</p>
    <p>Team: ${team.name}</p>
    <p>Status: On ${current.status.charAt(0).toUpperCase() + current.status.slice(1)}</p>
    <img src=${current.imageUrl} alt=dog #${current.id}/>
    </div>
    `;
}

function renderList(){
    const update = puppyData.map(function(i){

        return `
        <li id="c${i.id}">
        <div class="dogcard">
        <h3><a href=#${i.id}> ${i.name} </a></h3>
        <h4>${i.breed}</h4>
        <div>
        </li>
        `;
    })

    list.innerHTML = update.join('');

}
//${current === i ? `` : `<a href=#${i.id}>`}  ${i.name}  ${current === i ? `` : `</a>`}