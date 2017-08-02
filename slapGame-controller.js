function GameController() {
    var gameService = new GameService();

    gameService.createFixedData();

    update();

    this.reset = function () {
        reset();
    }

    this.attack = function attack(type) {
        gameService.attack(type);

        let health = gameService.getHealth();
        if (health == 0.0) {
            return;
        }

        writeData();

        setTimeout(btnDisable, 100);

        document.getElementById('sub').src = '../effects/subattack/torp.gif';
        setTimeout(function () { document.getElementById('sub').src = '../images/sub.jpg' }, 3000);

        barGraph();

        if (health > 0) {
            setTimeout(function () { document.getElementById('ship').src = '../effects/shipattack/shipdamage.gif' }, 3000);
            setTimeout(function () { document.getElementById('ship').src = './images/destroyer.jpg' }, 8000);
            setTimeout(btnEnable, 8000);
        }

        if (health <= 0 && health > -100) {
            setTimeout(function () { document.getElementById('ship').src = '../effects/shipdeath/ship explode.gif' }, 5000);
            setTimeout(function () { document.getElementById('ship').src = '' }, 14000);
            setTimeout(btnEnable, 14000);
        }
        if (health < -100) {
            setTimeout(function () { document.getElementById('ship').src = '../effects/annihilate/nuke.gif' }, 5000);
            setTimeout(function () { document.getElementById('ship').src = '' }, 8500);
            setTimeout(btnEnable, 8000);
        }

        gameService.healthCheck();

        update();
    }

    this.giveItems = function giveItems(type) {
        gameService.giveItems(type);
    }

    function barGraph() {
        var targt = gameService.getTarget();
        var bar = document.getElementById("vertBar");
        var requiredHeight = (130 * targt.health.toFixed(0)) / 100
        bar.style.height = requiredHeight + 'px'
    }

    function update() {
        let targt = gameService.getTarget();

        document.getElementById('health').innerText = targt.health.toFixed(1);
        document.getElementById('hits').innerText = targt.hits;
        document.getElementById('name').innerText = targt.name;

        barGraph();

        writeData();
    }

    function reset() {
        gameService.reset();
        let targt = gameService.getTarget();

        document.getElementById('health').innerText = targt.health.toFixed(1);
        document.getElementById('hits').innerText = targt.hits;
        document.getElementById('ship').src = './images/destroyer.jpg';

        barGraph();
    }

    function btnDisable() {
        document.getElementById('remote1').disabled = true;
        document.getElementById('remote2').disabled = true;
        document.getElementById('remote3').disabled = true;
    }
    
    function btnEnable() {
        document.getElementById('remote1').disabled = false;
        document.getElementById('remote2').disabled = false;
        document.getElementById('remote3').disabled = false;
    }

    function writeData(){ 
        let attMsg = document.getElementById('attack');
        let stats = document.getElementById('status');
        let fxd = document.getElementById('fixed');
        let rprt = document.getElementById('finalReport');

        attMsg.innerHTML = gameService.getAttackMsg();
        stats.innerHTML = gameService.getStatusMsg();
        fxd.innerHTML = gameService.getFixedData();
        rprt.innerHTML = gameService.getAttackSummary();
    }
}




