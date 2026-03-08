let size = 20;

const menu = document.getElementById("menu");
const editor = document.getElementById("editor");
const grid = document.getElementById("grid");

const newBtn = document.getElementById("newMap");
const loadBtn = document.getElementById("loadMap");
const saveBtn = document.getElementById("saveMap");
const backBtn = document.getElementById("backMenu");

const sizeSelect = document.getElementById("mapSize");

let map = [];

let isPainting = false;


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


function updateTileColor(tile,type){

    tile.classList.remove("grass","road","water");

    if(type===0) tile.classList.add("grass");
    if(type===1) tile.classList.add("road");
    if(type===2) tile.classList.add("water");

}


function changeTile(x,y,tile){

    map[y][x]++;

    if(map[y][x] > 2){
        map[y][x] = 0;
    }

    updateTileColor(tile,map[y][x]);

}


function drawGrid(){

    grid.innerHTML="";

    grid.style.gridTemplateColumns = `repeat(${size}, 30px)`;
    grid.style.width = `${size*30}px`;

    for(let y=0;y<size;y++){

        for(let x=0;x<size;x++){

            const tile=document.createElement("div");
            tile.classList.add("tile");

            updateTileColor(tile,map[y][x]);


            tile.addEventListener("mousedown",function(){

                isPainting = true;

                changeTile(x,y,tile);

            });


            tile.addEventListener("mouseover",function(){

                if(isPainting){

                    changeTile(x,y,tile);

                }

            });


            grid.appendChild(tile);

        }
    }

}


document.addEventListener("mouseup",function(){

    isPainting = false;

});


newBtn.onclick=function(){

    size = parseInt(sizeSelect.value);

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

    const data = {
        size:size,
        map:map
    };

    localStorage.setItem("map",JSON.stringify(data));

    alert("Mapa uložena");

}


loadBtn.onclick=function(){

    const data=localStorage.getItem("map");

    if(!data){
        alert("Žádná uložená mapa");
        return;
    }

    const parsed=JSON.parse(data);

    size = parsed.size;
    map = parsed.map;

    menu.classList.add("hidden");
    editor.classList.remove("hidden");

    drawGrid();

}