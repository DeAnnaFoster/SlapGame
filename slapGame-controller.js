function GameController() {
    var gameService = new GameService();

    gameService.update();


    this.reset = function reset() {
        gameService.reset();
    }
    this.attack = function attack(type) {
        gameService.attack(type);
    }
    this.giveItems = function giveItems(type) {
        gameService.giveItems(type);
    }
}




