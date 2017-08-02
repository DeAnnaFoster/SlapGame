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
        shield: new Item("Shield", 0.3, "Awesome shield!"),
        ADCAP: new Item("ADCAP", 1.5, "Better torpedo!"),
        nuke: new Item("Nuke", 15.0, "'Nuf said!")
    }

    var targt = new Target("Target", 100);

    var attackMsg = 'No Attack Messages Yet';
    var statusMsg = 'No Status Messages Yet';
    var fixedData = 'not available yet';
    var attackSummary = 'not available yet';

    function createFixedData() {

        let temp = [];
        temp.push(items['shield']);
        temp.push(items['ADCAP']);
        temp.push(items['nuke']);

        let template = '';
        for (var i = 0; i < temp.length; i++) {
            let item = temp[i];

            template += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.modifier}</td>
                    <td>${item.description}</td>
                </tr>
                `
        }

        fixedData = template;
    }

    function attackTarget(type) {
        if (targt.health == 0) {
            attackMsg = 'You\'re kidding right!? They\'re already Dead!' + '\r\nYou\'re a MONSTER!';
            return;
        }

        var baseDamage = targt.attacks[type];
        var randomDamage = Math.random();

        var totalDamage = (Math.floor((randomDamage * baseDamage) + 1));
        var totalMods = targt.addMods().toFixed(1);

        createAttackSummary(baseDamage, randomDamage, totalDamage, totalMods);

        targt.health -= totalDamage * totalMods;
        targt.hits += 1;

        if(targt.health > 75 && targt.health < 101){
            attackMsg = 'That was WEAK!!!! Try Again!';
        }
        if(targt.health > 50 && targt.health < 76){
            attackMsg = 'Not Bad! But quit playing with them!'; 
        }
        if(targt.health > 25 && targt.health < 51){
            attackMsg = 'Now you\'re talking! Now give them a one-two punch!';     
        }
        if(targt.health > 0 && targt.health < 26){
            attackMsg = 'Get \'em again! They\'re nearly Finished!';
        }
    }

    function createAttackSummary(baseDamage, randomDamage, damage, mods) {
       
        var damageSummary = 'Total attack damage: ' + (damage * mods).toFixed(1);

        var itemSummary = 'You are using the following weapons: ';
        for (var i = 0; i < targt.items.length; i++) {
            if (i == targt.items.length - 1) {
                itemSummary += targt.items[i].name;
            } else {
                itemSummary += targt.items[i].name + ', ';
            }
        }

        var template = '';
        template += `
                <tr>
                    <td>${itemSummary}</td>
                </tr>
                <tr>
                    <td>The resulting logistic factors generated are:</td>
                </tr>
                <tr>
                    <td style="padding-left:10px">Base Damage: ${baseDamage}</td>
                </tr>
                <tr>
                    <td>Randomizer: ${randomDamage.toFixed(4)}</td>
                </tr>
                <tr>
                    <td>Modifiers Total: ${mods}</td>
                </tr>
                <tr>
                    <td>${damageSummary}</td>
                </tr>
                `
        attackSummary = template;
    }

    function giveTargetItems(type) {
        if(statusMsg == 'No Status Messages Yet'){
            statusMsg = 'Using: ';  
        }
        
        if (targt.items.length < 3) {
            if(targt.items.length !=0){
                statusMsg += ', ';
            }

            targt.items.push(items[type]);
            statusMsg += type;        
        }
    }

    function targetReset() {
        targt.health = 100;
        targt.hits = 0;
        targt.items.length = 0;
    }

    function healthCheckReset() {
        if (targt.health < 0) {
            targt.health = 0;
            attackMsg = 'You annihilated your enemy!';
        }
    }

    //public
    this.attack = function attack(type) {
        return attackTarget(type);
    }

    this.giveItems = function giveItems(type) {
        giveTargetItems(type);
    }

    this.getTarget = function getTarget() {
        return targt;
    }

    this.reset = function () {
        targetReset();
    }

    this.getHealth = function getHealth() {
        return targt.health;
    }

    this.healthCheck = function healthCheck() {
        healthCheckReset();
    }

    this.getItems = function () {
        return itemsList;
    }

    this.getAttackMsg = function () {
        return attackMsg;
    }

    this.getStatusMsg = function () {
        return statusMsg;
    }

    this.getFixedData = function () {
        return fixedData;
    }

    this.getAttackSummary = function () {
        return attackSummary;
    }

    this.createFixedData = function () {
        createFixedData();
    }
}