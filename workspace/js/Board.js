var Board = function(){
    
}

Board.prototype = {
    
    create : function(){
    
    var load = this.add.text(game.world.centerX,game.world.centerY,"loading...",{fill:"#000"});  
    load.anchor.x = 0.5;
    load.anchor.y = 0.5;
    
    var req = new XMLHttpRequest();
    var i = 0;
    req.open("GET","https://test2-agnes-joseph-1.c9users.io/php/getscores.php")
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200)
        {
             load.destroy();
             var board = game.add.sprite(450,300,'board');
             board.anchor.x = 0.5;
             board.anchor.y = 0.5;
             
             var sprite = game.add.button(game.world.centerX,530,'replay',function(){game.state.start("Menu");},this,1,0,2,1);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
   
    
            var scores = req.responseText.replace("\n",'').split('/');
            console.log(scores);
            
            for(i = 0; i<scores.length/2 ; i++)
            {
                var timeText = game.add.text(250 ,96+i*38, scores[2*i] ,{fontSize: '1px',fill:'grey'});
                var scoreText = game.add.text(680,96+i*38, scores[2*i+1] ,{fontSize: '3px',fill:'grey'});
                scoreText.anchor.x = 0.5;
             }

            
        }
     };
    req.send();
   
}
}