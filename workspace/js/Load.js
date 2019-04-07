var Loading = function(){}
 
Loading.prototype = {
	preload: function(){ 
          game.stage.backgroundColor = '#f0f0f0';
          this.add.text(game.world.centerX-100,game.world.centerY,"loading...",{fill:"#000"});
          this.load.image('blue','assets/blueblock.png');
          this.load.image('red','assets/pinkblock.png');
          this.load.image('green','assets/greenblock.png');
          this.load.image('purple','assets/purpblock.png');
          this.load.image('yellow','assets/yellblock.png');

          
          this.load.spritesheet('bblue','assets/bluebub.png',80,80);
          this.load.spritesheet('bred','assets/bubred.png',80,80);
          this.load.spritesheet('bgreen','assets/bubgreen.png',80,80);
          this.load.spritesheet('bpurple','assets/bubpurp.png',80,80);
          this.load.spritesheet('byellow','assets/bubyell.png',80,80);
          
          this.load.spritesheet('post','assets/postbutton.png',105,99);
          this.load.spritesheet('replay','assets/replaybutton.png',105,100);
          this.load.image('gameover','assets/gameoverbox.png');
          this.load.image('fader','assets/fader.png');
          
          this.load.image('title','assets/poptext.png');
          this.load.image('time','assets/timetext.png');
          this.load.image('score','assets/scoretext.png');
          this.load.spritesheet('leader','assets/leader.png',104,100);
          this.load.spritesheet('start','assets/button.png',200,100);
          
          this.load.image('board','assets/board.png');


         
	},
  	create : function(){
		this.state.start("Menu");
                   
	}
}