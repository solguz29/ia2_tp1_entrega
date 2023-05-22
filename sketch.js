let t = [];
let cantidad = 16;
let nombre;

let estado;
let estadoFinal = 5;

let cuantosCirculos = 23;

let ubicaciones = [];
let xyi = [];

let unGrosor;
let gros;
let grosores = [];

let unColor;
let monoCromo;
let cuantosColores;
let paletaAutor;
let paleta = [30,150,336];

let col;
let sat;
let bri;
let setColores = [];
let colores = [];
let randomColores = [];


function setup() {
  createCanvas(600, 600, WEBGL);
  background(220);

  //TONO, SATURACION, BRILLO
  colorMode(HSB,255,255,255);
  
  //Estados iniciales
  estado = 1;
  unColor = 1;
  monoCromo = 1;
  paletaAutor = 1;

  unGrosor = 0;

  setearUbicaciones();  
  setearColores();  
  setearGrosores();
  
  for(i=0;i<cantidad;i++){
    nombre = "img"+i;
    t.push (new Triangulo(nombre));    
  }

}

function draw() {
  
  if (frameCount % 10 == 0)
  {
    for(i=0;i<cantidad;i++){
       t[i].dibujar(cantidad,cuantosCirculos,grosores,ubicaciones,xyi,randomColores);
      //console.log(nombre);    
    }
  }
    
}

function keyPressed(){

    //PASAJE DE ESTADOS  
    if(keyCode == ENTER){
      estado++;

      if(estado == estadoFinal){
          estado = 1;
      }

      console.log(estado);
    }

  
    //CONTROL ESTADO 2
    if(estado == 4){
      if(key == 'a'){
        unColor = 1;
        setearColores();
      } else if (key == 'b'){
        unColor = 0;
        monoCromo = 1;
        setearColores();
      } else if (key == 'c'){
        unColor = 0;
        monoCromo = 0;
        setearColores();
      }    
  
    } else if(estado == 3){
      if(key == 'a'){
        paletaAutor = 1;
        setearColores();
        estado++;
      } else if (key == 'b'){
        paletaAutor = 0;
        setearColores();
        estado++;
      }

      console.log(estado);

    } else if (estado == 1){
      if(key == 'a'){
        unGrosor = 1;
        setearGrosores();
      } else if (key == 'b'){
        unGrosor = 0;
        setearGrosores();
      }

    }

}

function mousePressed(){

    if (estado == 2){
      if(mouseButton == LEFT){
  
        setearUbicaciones();
       
      }       
    }      
}


function setearColores(){

  if(unColor == 1){   
    if(paletaAutor == 1){
      col = random(paleta);
    } else{
      col = random(255);
    }
    sat = random(150,220);
    bri = random(150,220);
      
    setColores[0] = color(col, sat, bri); 

    for(i=0;i<cuantosCirculos;i++){
      colores[i] = setColores[0];
    }

  } else {
    if(monoCromo == 1){
      cuantosColores = int(random(3,5));
      if(paletaAutor == 1){
        col = random(paleta);
      } else {
        col = random(255);
      }      
      if(cuantosColores == 3){
        setColores.pop();
      }
      for(i=0;i<cuantosColores;i++){
        bri = random(30,220);
        setColores[i] = color(col,sat,bri);
      }

      for(i=0;i<cuantosCirculos;i++){
        colores[i] = random(setColores);
      }

    } else {
      cuantosColores = int(random(3,5));
      if(cuantosColores == 3){
        setColores.pop();
      }
      if (paletaAutor == 1){
        setColores[0] = color(150,12,190); //gris
        for(i=1;i<cuantosColores;i++){
          sat = random(150,220);
          bri = random(150,220);         
          col = random(paleta); 
          setColores[i] = color(col,sat,bri);
        }
      } else {
        for(i=0;i<cuantosColores;i++){
          sat = random(150,220);
          bri = random(150,220);         
          col = random(255); 
          setColores[i] = color(col,sat,bri);
        }
      }         

      for(i=0;i<cuantosCirculos;i++){
        colores[i] = random(setColores);
      }

    }
  }

  for(i=0;i<(cantidad*cuantosCirculos);i++){
    randomColores[i] = random(colores);   
  }

}

function setearGrosores(){
  if(unGrosor == 1){
    gros = random(7,20);
    for(i=0;i<cuantosCirculos;i++){
      grosores[i] = gros;
    }

  } else if(unGrosor == 0){
    for(i=0;i<cuantosCirculos;i++){
      grosores[i] = random(7,20);
    }
  }
}

function setearUbicaciones(){
  for(i=0;i<(cantidad*cuantosCirculos);i++){
    ubicaciones[i] = random(70,100);
    xyi[i] = random(10,100);
  }
}

