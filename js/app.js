'use strict';

var productName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var productsrc = ['assets/bag.jpg','assets/banana.jpg','assets/bathroom.jpg','assets/boots.jpg','assets/breakfast.jpg','assets/bubblegum.jpg','assets/chair.jpg','assets/cthulhu.jpg','assets/dog-duck.jpg','assets/dragon.jpg','assets/pen.jpg','assets/pet-sweep.jpg','assets/scissors.jpg','assets/shark.jpg','assets/sweep.png','assets/tauntaun.jpg','assets/unicorn.jpg','assets/usb.gif','assets/water-can.jpg','assets/wine-glass.jpg'];

var pic1Index ='';
var pic2Index ='';
var pic3Index ='';

var img1,img2,img3;
var pic_div;

var counter =10;
var voteCounter =0;
var previousPic = [];

var myChart1 = document.getElementById('myChart1').getContext('2d');


function Product(name,src,vote, timeShown){
 this.name= name;
 this.src= src;
 this.vote= vote;
 this.timeShown= timeShown;

 Product.prototype.allProduct.push(this);
}

Product.prototype.allProduct = [];

if(! localStorage.getItem('products')){

for(var i=0; i< productName.length;i++){
    new Product(productName[i],productsrc[i],0,0);
}

console.log(Product.prototype.allProduct);
console.log(productName.length);

} else{
  getData();
}


function randomPic(){
    return Math.floor(Math.random()*(20));
}

var main_content = document.getElementById('main_content');
var header = document.createElement('h1');
header.textContent = 'click on the pic';
main_content.appendChild(header);

pic_div = document.createElement('div');
pic_div.id = 'div_content';
main_content.appendChild(pic_div);

img1 = document.createElement('img');
img1.id= 'img1';
pic_div.appendChild(img1);

img2 = document.createElement('img');
img2.id = 'img2';
pic_div.appendChild(img2);

img3 = document.createElement('img');
img3.id = 'img3';
pic_div.appendChild(img3);



function create_3Img(){

do{
    pic1Index = randomPic();
    pic2Index = randomPic();
    pic3Index = randomPic();
} while(pic1Index === pic2Index || pic1Index===pic3Index|| pic2Index===pic3Index || pic1Index === previousPic[0] || pic1Index === previousPic[1]|| pic1Index===previousPic[2] || pic2Index===previousPic[0] || pic2Index===previousPic[1]|| pic2Index===previousPic[2] || pic3Index ===previousPic[0]|| pic3Index===previousPic[1]|| pic3Index===previousPic[2]);

console.log('previous pic' + previousPic);
console.log(pic1Index,pic2Index,pic3Index);


previousPic=[];
previousPic.push(pic1Index);
previousPic.push(pic2Index);
previousPic.push(pic3Index);

console.log(Product.prototype.allProduct);

img1.src = productsrc[pic1Index];

img2.src = productsrc[pic2Index];

img3.src = productsrc[pic3Index];
}

create_3Img();

var firstImg = document.getElementById('img1');
var secondImg = document.getElementById('img2');
var thirdImg = document.getElementById('img3');


firstImg.addEventListener('click', imgFun);
secondImg.addEventListener('click', imgFun);
thirdImg.addEventListener('click', imgFun);

function imgFun(event){
    console.log(event);
    voteCounter++;

    if(voteCounter <= counter){
      for(var i=0 ; i<Product.prototype.allProduct.length;i++){
        if(pic1Index === i || pic2Index===i || pic3Index===i){
        Product.prototype.allProduct[i].timeShown++;
        }
      }
    
        if(event.target.id === img1.id){
          Product.prototype.allProduct[pic1Index].vote++;
        } else if(event.target.id === img2.id){
            Product.prototype.allProduct[pic2Index].vote++;
        } else if(event.target.id === img3.id){
            Product.prototype.allProduct[pic3Index].vote++;
        }
        console.log('iimg');
        event.preventDefault();
        create_3Img();
    }else{
        img1.removeEventListener('click',imgFun);
        img2.removeEventListener('click',imgFun);
        img3.removeEventListener('click',imgFun);

    var labels = ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon', 'pen' ,'pet-sweep' , 'scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
    var colors1 = ['#965d62', '#965d62', '#965d62', '#965d62','#965d62', '#965d62', '#965d62', '#965d62','#965d62', '#965d62', '#965d62', '#965d62','#965d62', '#965d62', '#965d62', '#965d62','#965d62', '#965d62', '#965d62', '#965d62'];
    var colors2 = ['#534e52', '#534e52', '#534e52', '#534e52','#534e52', '#534e52', '#534e52', '#534e52','#534e52', '#534e52', '#534e52', '#534e52','#534e52', '#534e52', '#534e52', '#534e52','#534e52', '#534e52', '#534e52', '#534e52'];
   
     var data1 = [];
     var data2 = [];
    
     for(var i=0 ; i<Product.prototype.allProduct.length ; i++){
       data1.push(Product.prototype.allProduct[i].vote);
       data2.push(Product.prototype.allProduct[i].timeShown)
     }

     console.log(data1);
     console.log(data2);

    var chart1 = new Chart(myChart1, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [ {
            data: data1,
            label: 'Number of votes',
            backgroundColor: colors1,
          },{
            data: data2,
            label: 'times Shown',
            backgroundColor: colors2
          },
          ]
        },
        options: {
          title: {
            text: 'The Number of votes and times Shown of product',
            display: true
          },
        }
      });

      setData();
}
}

var timeOfCounter= document.getElementById('timeOfCounter');
timeOfCounter.addEventListener('submit' , timeOfCounterFun);

function timeOfCounterFun(event){
    event.preventDefault();

    var counterData = Number(event.target.TimesOfClick.value); 
    counter = counterData ;
    console.log(counterData);
}

function setData(){
 var products = JSON.stringify(Product.prototype.allProduct);
 localStorage.setItem('products', products);
}

function getData(){
 Product.prototype.allProduct = JSON.parse(localStorage.getItem('products'));
}
