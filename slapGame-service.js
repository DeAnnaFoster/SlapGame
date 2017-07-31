function GameService() {
    function Target(name, health) {
        this.name = name,
            this.health = health,
            this.hits = 0,
            this.attacks = { 'slap': 1, 'punch': 5, 'kick': 10 },
            this.items = [],
            this.addMods = function () {
                var ttl = 0;
                if (this.items.length < 1) {
                    return 1;
                }

                for (var i = 0; i < this.items.length; i++) {
                    ttl += this.items[i].modifier;
                }
                if (ttl == 0) {
                    return 1;
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

    function attackTarget(type) {
        var damage = targt.attacks[type];
        var mods = targt.addMods().toFixed(1);

        document.getElementById('sub').src = '/effects/subattack/torp.gif';
        setTimeout(function(){document.getElementById('sub').src = '/images/sub.jpg'},3000);

        alert('Expected damage is: ' + damage * mods);

        targt.health -= damage * mods;
        targt.hits += 1;

        //do something here for up to 150 pints then a nuke result for over 200!
        if (targt.health < 0) {
            targt.health = 0;

            //setTimeout(function(){document.getElementById('ship').src = '/effects/shipdeath/ship explode.gif'}, 3000);
            //setTimeout(function(){document.getElementById('ship').src = './images/destroyer.jpg'},12000);

            setTimeout(function(){document.getElementById('ship').src = '/effects/annihilate/nuke.gif'}, 3000);
            setTimeout(function(){document.getElementById('ship').src = './images/destroyer.jpg'},5500);

        }
        runUpdate();
    }

    function giveTargetItems(type) {
        if (targt.items.length < 3) {
            targt.items.push(items[type]);
        }

        if (targt.items.length > 2) {
            alert('You have reached the maximum number of Mods - Cheater!');
        }
    }

     var targt = new Target("Target", 100);

    function runUpdate() {
        document.getElementById("health").innerText = targt.health.toFixed(0);
        document.getElementById("hits").innerText = targt.hits;
        document.getElementById("name").innerText = targt.name;
    }

    function runReset(){
        targt.health = 100;
        targt.hits = 0;
        targt.items.length = 0;
        document.getElementById("health").innerText = targt.health.toFixed(0);
        document.getElementById("hits").innerText = targt.hits;
    }

    //public
    this.attack = function attack(type){
        attackTarget(type);
    }

    this.giveItems = function giveItems(type){
        giveTargetItems(type);
    }

    this.update = function update(){
        runUpdate();
    }
    
    this.reset = function reset() {
        runReset();
    }
}