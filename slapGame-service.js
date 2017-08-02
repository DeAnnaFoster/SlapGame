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
        nuke: new Item("Nuke", 15.0, "'Nuf said!")
    }

    var targt = new Target("Target", 100);

    function attackTarget(type) {
        if(targt.health == 0){
            alert('You\'re kidding right!? They\'re already Dead!' + '\r\nYou\'re a MONSTER!');
            return;
        }

        var damage = (Math.floor((Math.random() * targt.attacks[type]) + 1));

        var mods = targt.addMods().toFixed(1);
        var temp = getAlertSummary(damage,mods);
        alert(temp);

        targt.health -= damage * mods;
        targt.hits += 1;  
    }

    function getAlertSummary(damage,mods){
        var damageSummary = 'Expected damage is: ' + (damage * mods).toFixed(1);
        var itemSummary='Items Used: ';

        for(var i = 0; i < targt.items.length;i++){
            if(i == targt.items.length-1){
                itemSummary += targt.items[i].name;    
            }else{
                itemSummary += targt.items[i].name + ', ';
            }
        }

        var entire = damageSummary + "\r\n" + itemSummary;  
        return entire;
    }

    function giveTargetItems(type) {
        if (targt.items.length < 3) {
            targt.items.push(items[type]);
        }

        if (targt.items.length > 2) {
            alert('You have reached the maximum number of Mods - Cheater!');
        }
    }

    function targetReset(){
        targt.health = 100;
        targt.hits = 0;
        targt.items.length = 0;
    }

    function healthCheckReset(){
        if (targt.health < 0) {
            targt.health = 0;
            alert('You annihilated your enemy!');
        }
    }

    //public
    this.attack = function attack(type){
        return attackTarget(type);
    }

    this.giveItems = function giveItems(type){
        giveTargetItems(type);
    }

    this.getTarget = function getTarget(){
        return targt;
    }

    this.reset = function(){
        targetReset();
    }

    this.getHealth = function getHealth(){
        return targt.health;
    }

    this.healthCheck = function healthCheck(){
        healthCheckReset();
    }
}