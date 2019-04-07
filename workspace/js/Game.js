var Game = function (){
   this.timeText;
   this.scoreText
   
   this.blocks;
   this.bubbles;
   
   this.names;
   this.bnames;

   this.speed=0;
   this.maxspeed=600;
   this.bspeed = 100;
   this.maxb =1;
   this.inc = 6;
   this.duration = Phaser.Timer.SECOND;
   this.first;
   this.last;
   this.score = 0;
    
    this.timer;
    this.pause;

}
    
   
Game.prototype = 
        {  
            create : function() {
                game.stage.backgroundColor = '#f0f0f0';
                this.game.world.setBounds(0, 0, 900,630);
                
                this.game.camera.y = 30;
               
                game.physics.startSystem(Phaser.Physics.ARCADE);
                
                this.set();
                
                game.add.sprite(30,50,'time');
                game.add.sprite(30,100,'score');
                this.timeText = game.add.text(150,63,'1:00',{fontSize: '8px',fill:'#fff'});
                this.scoreText = game.add.text(168,110,'0',{fontSize: '8px',fill:'#fff'});
                
                var x = this.game.world.width;
                var y = 30;
                this.names = ["blue","red","purple","green","yellow"];
                this.bnames = ["bblue","bred","bpurple","bgreen","byellow"];
                
                this.bubbles = this.game.add.group();
                this.bubbles.enableBody = true;
                this.bubbles.physicsBodyType = Phaser.Physics.ARCADE; 
                
                this.blocks = this.game.add.group();
                this.blocks.enableBody = true;
                this.blocks.physicsBodyType = Phaser.Physics.ARCADE; 
                
               
                this.first = 0;
                for(var i = 0 ; i<5 ;i++)
                {
                    var block = this.blocks.create(x,y,this.names[i]);
                   // block.x = i;
                    block.color = this.names[i];
                    block.currx = x;
                    block.anchor.x = 1.0;
                    block.anchor.y = 1.0;
                    block.checkWorldBounds = true;
                    block.body.immovable = true;
                    block.events.onOutOfBounds.add(this.cycle,this);
                    y+=150;
                }
                this.last = 4;

                
                var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
                var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                
               
                this.timer = game.time.create(false);
                this.timer.add(Phaser.Timer.SECOND*60, this.gameOver, this);
                this.timer.start();
                
                this.game.time.events.add(600, this.addBub, this);
                
                this.game.time.events.loop(Phaser.Timer.SECOND*5, function(){this.bspeed+=5;}, this);
                this.game.time.events.loop(Phaser.Timer.SECOND*15, function(){this.maxb++;}, this);
                this.game.time.events.loop(Phaser.Timer.SECOND*10, function(){this.inc+=3;}, this);
                this.game.time.events.loop(Phaser.Timer.SECOND*5, function(){this.duration-=Phaser.Timer.SECOND/2;}, this);
                
                this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
                this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
                this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
                
            },
            
            set : function(){
                this.speed=0;
                this.maxspeed=600;
                this.bspeed = 100;
                this.maxb =1;
                this.inc = 6;
                this.duration = Phaser.Timer.SECOND;
                this.first;
                this.last;
                this.score = 0;
                this.pause = false;
             },
            
            update : function() {
                if(this.pause!= true){
                var cursors = game.input.keyboard.createCursorKeys();
                if(cursors.up.isDown)
                    this.scrollup();
                if(cursors.down.isDown)
                    this.scrolldown();
            

                if(this.speed>0)
                    this.speed-=this.inc/2;
                else
                    if(this.speed<0)
                        this.speed+=this.inc/2;
                
               
                this.scoreText.text = this.score;
                var t = this.timer.duration.toFixed(0);
                var m = Math.floor(t/(Phaser.Timer.SECOND*60));
                var s = Math.floor(t/Phaser.Timer.SECOND);
                if(s<10)
                    this.timeText.text = m + ":0" + s;
                else
                    this.timeText.text = m + ":" + s;
            
                this.game.physics.arcade.overlap(this.blocks,this.bubbles,this.pop,null,this);
                this.game.physics.arcade.collide(this.bubbles,this.blocks);
                var b = this.bubbles.getFirstExists(false);
                
                if(b != null)
                    b.destroy();
                
                if(this.bubbles.length < this.maxb )
                     this.addBub();
             }
             else
             {
                 this.blocks.setAll('body.velocity.y',0);
             }
                
            },
            
             scrollup: function(){
               if(this.speed > -this.maxspeed)
               this.speed-=this.inc;
               this.blocks.setAll('body.velocity.y',this.speed);
                
            },
            
             scrolldown: function(){
                if(this.speed < this.maxspeed)
                this.speed+=this.inc;
                this.blocks.setAll('body.velocity.y', this.speed);
                  
            },
            
            
             cycle : function(block)
             {
                 var lastblock;
                 
                 if(block.y<120)
                 {
                     
                     lastblock = this.blocks.children[this.last];
                     this.last = (this.last+1)%5;
                     this.first = (this.first+1)%5;
                     this.s = lastblock;
                     
                    
                     block.reset(block.x,lastblock.y+150);
                     this.scrollup();
                 }
                   else
                 {
                     
                     lastblock = this.blocks.children[this.first];
                     this.first = (this.first-1);
                      this.last = (this.last-1);
                      if(this.first<0)
                          this.first = 4;
                      if(this.last < 0)
                          this.last = 4;
                     this.s = lastblock;
                     
                    
                     block.reset(block.x,lastblock.y-150);
                     this.scrolldown();
                 }
                 
             },
             
             addBub : function(){
                 

                 var color = Math.floor(Math.random()*5); 
                 var y = this.game.rnd.integerInRange(20, 550);
                 var x =-80;
                
                
              for(var i=0; i < this.bubbles.length; i++)
                {
                    if( Math.abs(this.bubbles.children[i].y - y) < 80 )
                    {
                        
                         if(this.bubbles.children[i].y > y)
                                y = this.game.rnd.integerInRange(30, y-40);
                            
                            else
                                y = this.game.rnd.integerInRange(y+40, 550);
                        
                     }
                    
                }
                
                
                
                 bub = this.bubbles.create(x,y,this.bnames[color]);
                 bub.color = this.names[color];
                 bub.flag = false;
                 bub.body.velocity.x = this.bspeed;
                 bub.body.bounce.x=0.8;
                 bub.animations.add('float', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
                 bub.animations.add('pop',[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]);
                 bub.animations.play('float',13,true);
             
                 //this.game.time.events.add(1000, this.addBub, this);
             },
             
            
             pop : function(block,bubble)
             {
                
                 
                
                 if(block.color == bubble.color && bubble.flag == false)
                 {
                     bubble.flag = true;
                     this.score++;
                     bubble.reset(bubble.x,bubble.y);
                     bubble.animations.play('pop',25,false,true);
                   
                 }
                 else
                 {
                     bubble.flag = true;
                     game.physics.arcade.accelerateToXY(bubble, -20,this.game.rnd.integerInRange(0, 600));
                     var tween = game.add.tween(bubble);
                        tween.to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
                        tween.start();
                        tween.onComplete.add( function(){
                         bubble.destroy();
                        });
                        block.body.velocity.x =100;
                        this.game.time.events.add((Phaser.Timer.SECOND*2)/3, function(){block.body.velocity.x=-100; }, this);
                        this.game.time.events.add(Phaser.Timer.SECOND, function(){block.body.velocity.x=50; }, this);
                        this.game.time.events.add(Phaser.Timer.SECOND*1.5, function(){block.body.velocity.x=0; }, this);
                     
                 }

             },
             
             
            gameOver : function(){
        
               this.game.stage.backgroundColor = '#f0f0f0';
                this.pause = true;
               
               var fader = game.add.sprite(game.world.centerX,game.world.centerY,'fader');
               fader.anchor.x = 0.5;
               fader.anchor.y = 0.5;
               fader.alpha = 0.8;
               
               var box = game.add.sprite(game.world.centerX,game.world.centerY,'gameover');
               box.anchor.x = 0.5;
               box.anchor.y = 0.5;
               
               var replay = this.game.add.button(box.x-130,box.y+55,'replay',function(){this.state.start("Menu");},this,1,0,2,1);
                var post = this.game.add.button(replay.x+150,replay.y,'post',function(){ 
                    var name = prompt("What's your name? "); 
                    var req = new XMLHttpRequest();
                
                    req.open("POST","https://test2-agnes-joseph-1.c9users.io/php/connect.php", true);
                    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                
                   
                    req.send("name=" + name + "&score=" + this.score);
                    req.onreadystatechange = function() {
                        if(req.readyState == 4 && req.status == 200)
                                game.state.start("Board"); ;
                    }
                    
                
                    
                },this,1,0,2,1);
               
              
                game.add.text(game.world.centerX+15,game.world.centerY-32,"" + this.score,{fontSize: '8px',fill:'828282'});
        
        
        
                 
             },
      

}


