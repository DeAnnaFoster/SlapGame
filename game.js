// var health = 100;
// var hits = 0;
// var name = 'Target';


// var target = {
//     name: "Ship",
//   health: 100,
//   attacks: {
//     slap: 1,
//     punch: 5,
//     kick: 10
//   }
// }

function GameService() {
    var dataStore = this;
    var targt = new Target("Target", 100);

    //constructor for Target
    function Target(name, health) {
        this.name = name,
        this.health = health,
        this.hits = 0,
        this.attacks = [{ slap: 1, punch: 5, kick: 10 }],
        this.items = [],
        this.addMods = function () {
            var ttl = 0;
            if (this.items.length < 0) {
                return 1;
            }

            for (var i = 0; i < this.items.length; i++) {
                ttl += this.items[i].modifier;
            }

            return ttl;
        }
    }

    function Item(name, modifier, description) {
        this.name = name;
        this.modifier = modifier;
        this.description = description;
    }
}

//constructor for Target
function Target(name, health) {
    this.name = name,
        this.health = health,
        this.hits = 0,
        this.attacks = [{ slap: 1, punch: 5, kick: 10 }],
        this.items = [],
        this.addMods = function () {
            var ttl = 0;
            if (this.items.length < 0) {
                return 1;
            }

            for (var i = 0; i < this.items.length; i++) {
                ttl += this.items[i].modifier;
            }

            return ttl;
        }
}

function Item(name, modifier, description) {
    this.name = name;
    this.modifier = modifier;
    this.description = description;
}










var items = {
    shield: new Item("Shield", 0.3, "This is an awesome shield!"),
    ADCAP: new Item("ADCAP", 1.5, "This is an awesome ADvanced CAPability torpedo!"),
    nuke: new Item("Nuke", 25.0, "'Nuf said!")
}

var targt = new Target("Target", 100);



//attacks[type] 
// modify to use one function call with pass in value
function slap() {
    var mods = targt.addMods().toFixed(1);
    alert(mods);
    targt.health -= 1 * mods;
    targt.hits += 1;
    if (targt.health < 0) {
        targt.health = 0;
    }
    update();
}

function punch() {
    var mods = targt.addMods().toFixed(1);
    alert(mods);
    targt.health -= 5 * mods;
    targt.hits += 1;
    if (targt.health < 0) {
        targt.health = 0;
    }
    update();
}

function kick() {
    var mods = targt.addMods().toFixed(1);
    alert(mods);
    targt.health -= 10 * mods;
    targt.hits += 1;
    if (targt.health < 0) {
        targt.health = 0;
    }
    update();
}


//giveItems() 
function shield() {
    if (targt.items.length < 3) {
        targt.items.push(items.shield);
    }

    if (targt.items.length > 2) {
        alert('You have reached the maximum number of Mods - Cheater!');
    }
}
function adcap() {
    if (targt.items.length < 3) {
        targt.items.push(items.ADCAP);
    }

    if (targt.items.length > 2) {
        alert('You have reached the maximum number of Mods - Cheater!');
    }

}
function nuke() {
    if (targt.items.length < 3) {
        targt.items.push(items.nuke);
    }

    if (targt.items.length > 2) {
        alert('You have reached the maximum number of Mods - Cheater!');
    }
}



function update() {
    document.getElementById("health").innerText = targt.health.toFixed(0);
    document.getElementById("hits").innerText = targt.hits;
    document.getElementById("name").innerText = targt.name;
}

function reset() {
    targt.health = 100;
    targt.hits = 0;
    targt.items.length = 0;
    document.getElementById("health").innerText = targt.health.toFixed(0);
    document.getElementById("hits").innerText = targt.hits;
}

//document.getElementById("name").innerText = targt.name;

update();