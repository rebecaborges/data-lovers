window.onload = function () {
  allPokemon();
  eggKmSelect();
};

function getPokemon() {
  return POKEMON["pokemon"];
}

const orderAzSelect = document.getElementById("orderAz");
orderAzSelect.addEventListener("change", function () {
  if (orderAzSelect.selectedIndex === 1) {
    return showOrderAz();
  } else if (orderAzSelect.selectedIndex === 2) {
    return showOrderZa();
  } else {
    alert("Selecione uma opção!");
  }
});


orderPokemonName = () =>  getPokemon().sort(function (a, b) {
   return a.name.localeCompare(b.name)
  });


function showOrderAz() {
  document.getElementById("show-pokemon").innerHTML = `
  ${orderPokemonName().map((i) =>`
  <div class='list-pokemon'>
    <img src='${i.img}' class= 'pokemon-img'/>
    <div class= text-name> 
      <h3 class='pokemon-name'>${i.name}</h3>
    </div>
    <div class= text-name> 
      <h3 class='pokemon-name'>${"Tipo: " + i.type}</h3>
    </div>
    <div class= text-name> 
      <h3 class='pokemon-name'>${"Altura: " + i.height}</h3>
    </div>
    
  </div>
  `).join("")
}`;
}

function showOrderZa() {
  document.getElementById("show-pokemon").innerHTML = `
  ${orderPokemonName().reverse().map((i) =>`
  <div class='list-pokemon'>
    <img src='${i.img}' class= 'pokemon-img'/>
    <div class= text-name> 
      <h3 class='pokemon-name'>${i.name}</h3>
    </div>
  </div>
  `).join("")
}`;

}

function allPokemon() {
  const showPokemon = document.getElementById("show-pokemon");

  showPokemon.innerHTML = ` 
  ${getPokemon().map((monster) =>`
    <div class='list-pokemon'>
      <img src='${monster["img"]}' class= 'pokemon-img'/>
      <div class= text-name> 
        <h3 class='pokemon-name'>${monster["name"]}</h3>
      </div>
      <div class='text-type'>
        <p class='pokemon-type'>${monster["num"]}</p>
      </div>
    </div>
    `).join("")
}`;
}

function eggKmSelect() {
  const eggKmSelect = document.getElementById("eggKm");
  eggKmSelect.addEventListener("change", function () {
    if (eggKmSelect.selectedIndex === 1) {
      showEggs(eggKmParam = "Not in Eggs");
    } else if (eggKmSelect.selectedIndex === 2) {
      showEggs(eggKmParam = "2 km");
    } else if (eggKmSelect.selectedIndex === 3) {
      showEggs(eggKmParam = "5 km");
    } else if (eggKmSelect.selectedIndex === 4) {
      showEggs(eggKmParam = "10 km");
    } else {
      return alert("Selecione uma opção!");
    }
  });
  
}

function showEggs(eggKmParam) {
  const showPokemon = document.getElementById("show-pokemon");
  const eggFilter = getPokemon().filter((pokemon) => pokemon.egg === eggKmParam);
  
  showPokemon.innerHTML = ` 
  ${eggFilter.map((eggFilter) => `
    <div class='list-pokemon'>
      <img src='${eggFilter.img}' class= 'pokemon-img'/>
      <div class= text-name> 
        <h3 class='pokemon-name'>${eggFilter.name}</h3 >
      </div>
      <div class='text-type'>
        <p class='pokemon-type'>${eggFilter.egg}</p>
      </div>
    </div>
    `).join("")
}`;
}




//grafico

document.getElementById("candy").addEventListener("change", () => {
  if (document.getElementById("candy").selectedIndex === 1) { 
    google.charts.load("current", {"packages": ["corechart"]});
    google.charts.setOnLoadCallback(drawGraphic);
  } else {
    alert("Selecione uma opção!");
  }
});


function drawGraphic() {
  const candy = getPokemon().map(monster => monster.candy_count);
  const candyFilter = candy.filter(i => typeof i === "number");
  const candyTotal = candyFilter.reduce((acc, cur) => acc + cur);
  const result = candyTotal / candyFilter.length;

  const max = candyFilter.reduce(function (a, b) {
    return Math.max(a, b);
  });

  const min = candyFilter.reduce(function (a, b) {
    return Math.min(a, b);
  });

  const data = google.visualization.arrayToDataTable([
    ["média de candy", "quantidade"],
    ["Média de candy por pokémon", result],
    ["Máximo de candy por pokémon", max],
    ["Mínimo de candy por pokémon", min],
  ]);

  const options = {
    title: "Candy's",
    pieHole: 0.4,
    'width':600,
    'height':400,
  };

  const chart = new google.visualization.PieChart(document.getElementById("graphic"));
  chart.draw(data, options);
}

//limpa os outros selects

const eggKm = document.getElementById("eggKm")
const candy = document.getElementById("candy") 
const order = document.getElementById("orderAz") 

order.addEventListener("change", function(){
  eggKm.selectedIndex=0;
  candy.selectedIndex=0;
  document.getElementById('graphic').innerHTML="";
});


eggKm.addEventListener("change", function () {
  order.selectedIndex = 0;
  candy.selectedIndex = 0;
  document.getElementById("graphic").innerHTML = "";
});

candy.addEventListener("change", function () {
  order.selectedIndex = 0;
  eggKm.selectedIndex = 0;
  document.getElementById("show-pokemon").innerHTML = "";
});