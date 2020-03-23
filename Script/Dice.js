
//It is data-structure[Object]  used to store information related to Dice game: 
let Dice ={
You:{Div:"#youBox",Result:"#yourResult",Score:0},
Bot:{Div:"#botBox",Result:"#botResult",Score:0},
Play:true,    
}

const You = Dice['You'];
const Bot = Dice['Bot'];
 

const Swish = new Audio('Assets/swish.m4a'); // It will produce Swish sound whenever match draw :
const Cash =  new Audio('Assets/cash.mp3');// It will produce Cash sound whenever User win match:
const Aww =   new Audio('Assets/aww.mp3');//It will produce Aww sound whenever User lose match:

// These are click events,whenever User click either (Play or Reset) button ,a function will run:  
document.querySelector('#dicePlay').addEventListener('click',Play); // when user click on Play button , Play function will run : 

document.querySelector('#diceReset').addEventListener('click',Reset);// when user click on Play button , Reset function will run :  

// It is reset function:
function Reset(){

 Restart(You); // Calling Restart function & passing  Object :  
 Restart(Bot);// Calling Restart function & passing Object :
 
 document.querySelector("#Header").textContent = "Let's Play" ; // It will change Content of header:
 document.querySelector("#Header").style.color = "white"; // It will change color of header:

 Dice['Play'] = true; //  If it is true than Play function functionality  will run :
}

// It is restart function ,receiving a parameter  Player(Either You or Bot):
function Restart(Player){
   
    document.querySelector(Player['Div']).querySelector('img').remove(); //It will remove image object from Player Div,Player may be You or Bot:
    document.querySelector(Player['Result']).textContent = 0; // It will set result :0  of Player Result,Player may be You or Bot:
   
   let Image = document.createElement('img'); // It will create and image element in DOM and return its object :
   Image.src  =  "Assets/start.jpg" ; //It will link Image to Image object(if you link image to image object it means you link image to image element because object refers to element ) :

   document.querySelector(Player['Div']).appendChild(Image); // It will add Image object to  Player div,Player may be You or Bot :
     
}

// It is Play function :
function Play(){

 if(Dice['Play']){  // If it is true than rest of code will run :
 let N1 = Random(); // It returns random number from 1 to 6 :
 let N2 = Random(); // It returns random number from 1 to 6 :

 You['Score'] = N1;   // store random number in score of you object:
 Bot['Score'] = N2;   // store random number in score of bot object:
 

 DisplayDice(N1,You); // It will display Dice image to You  Accoring to N1 number : 
 DisplayDice(N2,Bot); // It will display Dice image to Bot  Accoring to N2 number : 
 
 ShowScore(You); // It will display score to You :
 ShowScore(Bot);// It will display score to Bot:
 
 let winner = decideWinner(You,Bot); // It will check who is winner & return a number which represents win,lose,draw:
 displayMessage(winner); // It will display message in Header according to winner number :
 Dice['Play'] = false ; // Now user can't play game without clicking reset button :
 }
}

// It is Random function which generates random number from 1 to 6 & return it :
function Random(){
    return Math.floor(Math.random()*6 + 1);
}

function DisplayDice(Number,Player){

    // It will remove Image of  Player[Div] ,Player maybe  You or Bot  :
     document.querySelector(Player['Div']).querySelector('img').remove();  
  
   //It will Create an image object in DOM:  
     let Image = document.createElement('img');

   // It will link and image to Image Object :  
     Image.src = `Assets/${Number}.jpg`;

   // It will insert image object to Player ,Player maybe You or Bot :  
     document.querySelector(Player['Div']).appendChild(Image);

}

// It is ShowScore function: It will show Score to Corresponding Score area of Respective You or Bot Object :
function ShowScore(Player){
 
  document.querySelector(Player['Result']).textContent = Player['Score'] ;// It will show result to Score area of Player , Player maybe You,Bot :  
}

// It decides who is winner and return a number which represents to  Win,Lose,Draw :
function decideWinner(You,Bot){
 
   if(You['Score'] > Bot['Score'])
      return 1;
   else if(You['Score'] < Bot['Score'])
      return 0;
   else
      return 0.5;        


}

function displayMessage(winner){
  
    let Message ={1:"You Won :)",0:"You Lose :",0.5:"Match Draw :"} ; // It is object which store message/string to corresponding numbers :0.5,0,1   :
       
        document.querySelector("#Header").textContent  = Message[winner]; //It will display message to Header:

        if(winner === 0){    // It will produce Aww sound when winner = 0[means match draw] : 
        document.querySelector('#Header').style.color = "red" ; // It will change color of header :
         Aww.play(); // It will produce Aww sound :
         }else if(winner === 1) {//It will produce Cash sound when winner = 1[means User win match] : 
            document.querySelector('#Header').style.color = "green" ; // It will change color of header :
            Cash.play(); // It will produce Cash sound :
         }else{
            document.querySelector('#Header').style.color = "yellow" ;// It will change header color:
            Swish.play(); //It will produce Swish sound :
         }

}

