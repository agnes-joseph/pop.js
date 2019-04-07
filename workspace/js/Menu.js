var Menu = function()
{
    
}

Menu.prototype = {
    create : function(){
        this.game.stage.backgroundColor = '#f0f0f0';
        
        var title = this.game.add.sprite(game.world.centerX,game.world.centerY-100,'title');
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        
         var start = this.game.add.button(title.x,title.y+180,'start',this.start,this,1,0,2,1);
         start.anchor.x = 0.5;
         start.anchor.y = 0.5;
         
         var leader = this.game.add.button(start.x-5,start.y+100,'leader',function(){this.state.start("Board");},this,1,0,2,1);
         leader.anchor.x = 0.5;
         leader.anchor.y = 0.5;
         
         
    },

    start : function()
    {
        var fader = game.add.sprite(game.world.centerX,game.world.centerY,'fader');
        fader.anchor.x = 0.5;
        fader.anchor.y = 0.5;
        fader.alpha = 0;
        this.state.start("Game");
        
}

}