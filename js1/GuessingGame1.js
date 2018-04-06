var Game = function(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

function newGame(){
    return new Game();
}

function generateWinningNumber(){
    return Math.floor(Math.random() * 100 + 1);
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber
}

Game.prototype.playersGuessSubmission = function(guess){
    if (typeof guess !== "number" || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    if (this.playersGuess === this.winningNumber) {
        return "You Win!"
    }
    else { 
        if (this.pastGuesses.indexOf(this.playersGuess) > -1){
            return "You have already guessed that number.";            
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length === 5){
                return "You Lose."
            }
            else {
                var diff = this.difference();
                if (diff < 10){
                    return "You're burning up!"
                }
                else if (diff < 25){
                    return "You're lukewarm."
                }
                else if (diff < 50){
                    return "You're a bit chilly."
                }
                else {
                    return "You're ice cold!"
                }
            }
        }
    }
}
Game.prototype.provideHint = function(){
    var hintArray = [];
    hintArray.push(this.winningNumber);
    hintArray.push(generateWinningNumber());
    hintArray.push(generateWinningNumber());
    return shuffle(hintArray);
}

function shuffle (array){
    var m = array.length, t, i;
    while (m){
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array
}

