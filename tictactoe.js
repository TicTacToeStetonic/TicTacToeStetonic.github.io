"use strict";

let fieldarray = [];
let player = 1;

addListeners();
initializeArray();

function addListeners() {
    let el;
	
    for(let x=1; x<=3; x++)
    {
      for(let y=1; y<=3; y++)
      {
        el=document.getElementById('f'+x+y);
        el.addEventListener("click",fieldClick);
      }
    }
    el=document.getElementById("restart");
    el.addEventListener("click",dorestart);
  }

function initializeArray()
{
  fieldarray = new Array(3);

  for (let i = 0; i < fieldarray.length; i++) {
    fieldarray[i] = new Array(3);
  }
}

function fieldClick(e)
{
    const id=e.target.id;
    let fieldX,fieldY;

    fieldX=id.substring(1,2);
    fieldY=id.substring(2,3);
    fieldX--;
    fieldY--;
    if(player === 1){
        e.target.innerText='X';
        fieldarray[fieldX][fieldY]='X';
        player=2;
    }
    else if(player === 2){
        e.target.innerText='O';
        fieldarray[fieldX][fieldY]='O';
        player=1;
    }

    checkWinner();
    target.removeEventListener("click", fieldClick, false);
}

function removeListeners()
{
  const field=document.getElementById("playfield");
  const fields=field.getElementsByClassName("field");
  let obj;

  for (obj of fields) {
    obj.removeEventListener("click", fieldClick, false);
  }
}

function checkWinner()
{
    let pO,pX;
    let win1=false,win2=false,winner=false;
    let result='';

    let x=0;
    do
    {
      pO=0;
      pX=0;
      for(let y=0; y<=2; y++)
        {
          if(fieldarray[x][y]==='O')
            pO++;
          if(fieldarray[x][y]==='X')
            pX++;
          if(pO===3 || pX===3)
            winner=true;
        }
        x++;
    } while(!winner && x<=2);

    if(!winner)
    {    
      let y=0;
      do
      {
        winner=false;
        pO=0;
        pX=0;
        for(let x=0; x<=2; x++)
          {
            if(fieldarray[x][y]==='O')
              pO++;
            if(fieldarray[x][y]==='X')
              pX++;
            if(pO===3 || pX===3)
              winner=true;
          }
          y++;
      } while(!winner && y<=2);
    }

    if(!winner)
    {
      const center=fieldarray[1][1];
      // across
      if(center==='X' || center==='O')
      {
        if(center===fieldarray[0][0] && center===fieldarray[2][2])
          win1=true;
        if(center===fieldarray[0][2] && center===fieldarray[2][0])
          win2=true;
      }
      if(win1 || win2)
      {
        winner=true;
        if(center==='O')
          pO=3;
        else if(center==='X')
          pX=3;
      }
    }

    if(winner)
    {
      if(pO===3)
      {
        result="Speler O heeft gewonnen!";
      } else if(pX===3)
      {
        result="Speler X heeft gewonnen!";
      }
      removeListeners();
    }
    else
    {
      let fieldCount=0;
      for(let x=0; x<=2; x++)
        for(let y=0; y<=2; y++){
          if(fieldarray[x][y]==='O' || fieldarray[x][y]==='X')
            fieldCount++;
          else
            break;
        }
      if(fieldCount===9)
        result="Gelijkspel...";
    }
    document.getElementById("result").innerText=result;
}

function dorestart()
{
  let id,el;

  let c=1;
  for(let arr of fieldarray)
  {
    arr.fill([undefined,undefined,undefined]);
    for(let r=1; r<=3; r++)
    {
      id="f"+r+c;
      el=document.getElementById(id);
      el.innerText='';
    }
    c++;
  }
  document.getElementById("result").innerText='';
  removeListeners();
  addListeners();
}