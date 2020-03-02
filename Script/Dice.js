
let Dice ={
You:{Div:"#youBox",Result:"#yourResult",Score:0},
Bot:{Div:"#botBox",Result:"#botResult",Score:0},
Play:true,    
}

const You = Dice['You'];
const Bot = Dice['Bot'];
 
const Swish = new Audio('Assets/swish.m4a');
const Cash =  new Audio('Assets/cash.mp3');
const Aww =   new Audio('Assets/aww.mp3');

document.querySelector('#dicePlay').addEventListener('click',Play);
document.querySelector('#diceReset').addEventListener('click',Reset);

function Reset(){

 Restart(You);
 Restart(Bot);
 
 document.querySelector("#Header").textContent = "Let's Play" ;
 document.querySelector("#Header").style.color = "white";

 Dice['Play'] = true;
}

function Restart(Player){
  
    document.querySelector(Player['Div']).querySelector('img').remove();
    document.querySelector(Player['Result']).textContent = 0;
   
   let Image = document.createElement('img');
   Image.src  =  "Assets/start.jpg" ;

   document.querySelector(Player['Div']).appendChild(Image);
     
}

function Play(){

 if(Dice['Play']){
 let N1 = Random();
 let N2 = Random();

 You['Score'] = N1;
 Bot['Score'] = N2;
 

 DisplayDice(N1,You);
 DisplayDice(N2,Bot);
 ShowScore(You);
 ShowScore(Bot);
 let winner = decideWinner(You,Bot);
 displayMessage(winner);
 Dice['Play'] = false ;
 }
}

function Random(){
    return Math.floor(Math.random()*6 + 1);
}

function DisplayDice(Number,Player){

    // It will remove Image of youBox Div[Object]:
    document.querySelector(Player['Div']).querySelector('img').remove();  
  
     let Image = document.createElement('img');
     Image.src = `Assets/${Number}.jpg`;

     document.querySelector(Player['Div']).appendChild(Image);

}

function ShowScore(Player){
  document.querySelector(Player['Result']).textContent = Player['Score'] ;   
}

function decideWinner(You,Bot){
 
   if(You['Score'] > Bot['Score'])
      return 1;
   else if(You['Score'] < Bot['Score'])
      return 0;
   else
      return 0.5;        


}

function displayMessage(winner){
  
    let Message ={1:"You Won :)",0:"You Lose :",0.5:"Match Draw :"} ;
       
        document.querySelector("#Header").textContent  = Message[winner];

        if(winner === 0){
        document.querySelector('#Header').style.color = "red" ;
         Aww.play();
         }else if(winner === 1) {
            document.querySelector('#Header').style.color = "green" ;
            Cash.play();
         }else{
            document.querySelector('#Header').style.color = "yellow" ;
            Swish.play();
         }

}

