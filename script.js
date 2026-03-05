const size = 20;

const menu = document.getElementById("menu");
const editor = document.getElementById("editor");
const grid = document.getElementById("grid");

const newBtn = document.getElementById("newMap");
const loadBtn = document.getElementById("loadMap");
const saveBtn = document.getElementById("saveMap");
const backBtn = document.getElementById("backMenu");

let map = [];

function createEmptyMap(){
    map = [];

    for(let y=0;y<size;y++){
        let row=[];

        for(let x=0;x<size;x++){
            row.push(0);
        }

        map.push(row);
    }
}

function drawGrid(){

    grid.innerHTML="";

    for(let y=0;y<size;y++){

        for(let x=0;x<size;x++){

            const tile=document.createElement("div");
            tile.classList.add("tile");

            updateTileColor(tile,map[y][x]);

            tile.addEventListener("click",function(){

                map[y][x]++;

                if(map[y][x]>2){
                    map[y][x]=0;
                }

                updateTileColor(tile,map[y][x]);

            });

            grid.appendChild(tile);
        }
    }
}

function updateTileColor(tile,type){

    tile.classList.remove("grass","road","water");

    if(type===0){
        tile.classList.add("grass");
    }

    if(type===1){
        tile.classList.add("road");
    }

    if(type===2){
        tile.classList.add("water");
    }

}

newBtn.onclick=function(){

    createEmptyMap();

    menu.classList.add("hidden");
    editor.classList.remove("hidden");

    drawGrid();
}

backBtn.onclick=function(){

    editor.classList.add("hidden");
    menu.classList.remove("hidden");

}

saveBtn.onclick=function(){

    localStorage.setItem("map",JSON.stringify(map));
    alert("Mapa uložena");

}

loadBtn.onclick=function(){

    const data=localStorage.getItem("map");

    if(!data){
        alert("Žádná uložená mapa");
        return;
    }

    map=JSON.parse(data);

    menu.classList.add("hidden");
    editor.classList.remove("hidden");

    drawGrid();

}