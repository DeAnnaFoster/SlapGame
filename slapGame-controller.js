function GameController() {
    var gameService = new GameService();

    update();

    this.reset = function(){
        reset();
    }
    this.attack = function attack(type) {
        gameService.attack(type);
        let targt = gameService.getTarget();








        update();
    }
    this.giveItems = function giveItems(type) {
        gameService.giveItems(type);
    }



    function barGraph() {
        var targt = gameService.getTarget();

        var bar = document.getElementById("vertBar"); 
        var requiredHeight = (130 * targt.health.toFixed(0))/100
        bar.style.height = requiredHeight + 'px'//requiredHeight;
        
        // console.log(targt.health.toFixed(0));
        // console.log(bar.style.height = requiredHeight);
       
    }

    function update() {
        let targt = gameService.getTarget();
        console.log(targt);
        document.getElementById("health").innerText = targt.health.toFixed(0);
        document.getElementById("hits").innerText = targt.hits;
        document.getElementById("name").innerText = targt.name;

        barGraph();
    }

    function reset(){
        gameService.reset();
        let targt = gameService.getTarget();
        document.getElementById("health").innerText = targt.health.toFixed(0);
        document.getElementById("hits").innerText = targt.hits;
        document.getElementById('ship').src = './images/destroyer.jpg';

        barGraph(); 
    }
}




