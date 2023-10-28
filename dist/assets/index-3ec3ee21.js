(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const b of t.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&a(b)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();const o={type:Phaser.AUTO,width:1850,height:900,backgroundColor:"000000",physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scene:{preload:w,create:x,update:B}};let g,l=0;const p=1;let n=0,d,c;new Phaser.Game(o);function w(){this.load.image("background","assets/background.png"),this.load.image("bubble1","assets/bubble1.png"),this.load.image("bubble2","assets/bubble2.png"),this.load.image("bubble3","assets/bubble3.png"),this.load.image("bubble4","assets/bubble4.png"),this.load.image("bubble5","assets/bubble5.png"),this.load.image("customCursor","assets/cursor.png")}let f=0,m,i,y=!1;function x(){g=this.physics.add.group();let s=this.add.image(0,0,"background");s.setDisplaySize(o.width,o.height),s.setOrigin(0,0),d=this.add.text(o.width-10,10,`Bubbles: ${n}`,{fontSize:"16px",fill:"#fff",backgroundColor:"#000000",padding:{left:10,right:10,top:5,bottom:5},borderRadius:5}),d.setOrigin(1,0),m=this.add.text(10,10,`Destroyed: ${f}`,{fontSize:"16px",fill:"#fff",backgroundColor:"#000000",padding:{left:10,right:10,top:5,bottom:5},borderRadius:5}),i=this.add.text(o.width/2,o.height/2,"Start Game",{fontSize:"32px",fill:"#ffffff",fontStyle:"bold",backgroundColor:"#000000",padding:{left:10,right:10,top:10,bottom:10},borderRadius:5}),i.setOrigin(.5,.5),c=this.add.text(o.width/2,o.height/2+40,"Pop the bubbles and don't let the bubble count on screen reach 10",{fontSize:"16px",fill:"#ffffff",fontStyle:"bold",align:"center",wordWrap:{width:o.width-20}}),c.setOrigin(.5,.5),i.setInteractive(),i.on("pointerdown",C,this),this.input.setDefaultCursor("url(assets/cursor.png), pointer")}function B(s,r){y&&(l+=r/1e3,l>=p&&(P(),l=0))}function C(){i.destroy(),c.destroy(),y=!0,l=p}function P(){let s=Phaser.Math.Between(0,o.width),r=Phaser.Math.Between(0,o.height),u=["bubble1","bubble2","bubble3","bubble4","bubble5"],a=Phaser.Utils.Array.GetRandom(u);if(n>=10){O();return}let e=g.create(s,r,a);Phaser.Math.Between(.5,.75),e.setScale(.6),e.setVelocity(Phaser.Math.Between(-100,100),Phaser.Math.Between(-100,100)),e.setCollideWorldBounds(!0),e.setBounce(1,1),e.setInteractive(),e.on("pointerdown",function(){e.destroy(),n--,f++,h(),S()}),n++,h()}function O(){location.reload()}function h(){d.setText(`Bubbles: ${n}`)}function S(){m.setText(`Destroyed: ${f}`)}