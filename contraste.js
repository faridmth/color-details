let clrBtn = document.querySelectorAll('.inp-container div')
let rationStars = document.querySelector('.ration-stars')
let rationDes = document.querySelector('.ration-des')
let smallTextStars = document.querySelector('.small-text-stars')
let bigTextStars = document.querySelector('.big-text-stars')
let colorGenCont = document.querySelector('.color-gen-cont')
let colorsChangeBtn = document.querySelector('.colors-change')
let textColorChangeBtn = document.querySelector('.text-change')
let backColorChangeBtn = document.querySelector('.back-change')
let bothColorChangeBtn = document.querySelector('.both-change')


$(document).ready(function () {
  const pickr = Pickr.create({
    container: ".inp-container",
    el:'.picker1',
    theme: "nano",
    default: '#42445a',
    components: {
      hue: true,
      interaction: {
        input: true,
      }
    }
  });
  const pickr2 = Pickr.create({
    container: ".inp-container",
    el:'.picker2',
    theme: "nano",
    default: '#42445a',
    components: {
      hue: true,
      interaction: {
        input: true,
      }
    }
  });
  
  pickr.on("change", function (e) {
    clrBtn[0].style.setProperty('--var',e.toRGBA())
    color1 = e.toHEXA()
    hexclr1 = '#'+color1[0]+color1[1]+color1[2]
    $('#inp1').val(hexclr1)
    $('.color-contraste-left p').css('color',color1)
    $('.ration-resg').text(getContrastRatio(hexToRgb(hexclr1),hexToRgb( $('#inp2').val())))
    ratioStars($('.ration-resg').text())
    
  });    
  pickr2.on("change", function (e) {
    clrBtn[2].style.setProperty('--var2',e.toRGBA())
    let color2 = e.toHEXA()
    hexclr2 = '#'+color2[0]+color2[1]+color2[2]
    $('#inp2').val('#'+color2[0]+color2[1]+color2[2])
    $('.color-contraste-left').css('backgroundColor',color2)
    $('.ration-resg').text(getContrastRatio(hexToRgb(hexclr2),hexToRgb( $('#inp1').val())))
    ratioStars($('.ration-resg').text())

  });  
  textColorChangeBtn.addEventListener('click',()=>{
    pickr.setColor(getComplementaryColorHex($('#inp2').val()))
  })  
  backColorChangeBtn.addEventListener('click',()=>{
    pickr2.setColor(getComplementaryColorHex($('#inp1').val()))
  }) 
  bothColorChangeBtn.addEventListener('click',()=>{
    pickr.setColor(getComplementaryColorHex(generateRandomColorHex()))
    pickr2.setColor(getComplementaryColorHex($('#inp1').val()))

  })
  let chango = setInterval(()=>{
    if($('#inp1')){
      pickr.setColor(getComplementaryColorHex(generateRandomColorHex()))
      pickr2.setColor(getComplementaryColorHex($('#inp1').val()))
      clearInterval(chango)
  
    }
  },100)
});

clrBtn[0].addEventListener('click',()=>{
    let clrBtn = document.querySelector('.inp-container div')
    let picker = document.querySelector('.inp-container .pcr-app[data-theme="nano"]')
    picker.style.position='absolute'
    picker.style.top=clrBtn.offsetTop+35+'px'
    picker.style.left=clrBtn.offsetLeft-100+'px'
    picker.click()
})
clrBtn[2].addEventListener('click',()=>{
    let clrBtn1 = document.querySelector('#btn2 div')
    let picker = document.querySelectorAll('.inp-container .pcr-app[data-theme="nano"]')
    picker[1].style.position='absolute'
    picker[1].style.top=clrBtn1.offsetTop+35+'px'
    picker[1].style.left=clrBtn1.offsetLeft-100+'px'
    picker[1].click()
})

//functions

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }
  //ratio calculate
  function getContrastRatio(color1, color2) {
    function getLuminance(color) {
      const gammaCorrected = color / 255.0;
      return gammaCorrected <= 0.03928 ? gammaCorrected / 12.92 : Math.pow((gammaCorrected + 0.055) / 1.055, 2.4);
    }
    const luminance1 = getLuminance(color1[0]) * 0.2126 + getLuminance(color1[1]) * 0.7152 + getLuminance(color1[2]) * 0.0722;
    const luminance2 = getLuminance(color2[0]) * 0.2126 + getLuminance(color2[1]) * 0.7152 + getLuminance(color2[2]) * 0.0722;
    let result =  (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return result.toFixed(2);
}

//ratio stars
function ratioStars(ratio){
  let starsNum; 
  let stStarsNum;
  let bgStarsNum;
  let des;
  switch(true) {
    case ratio < 3:
      starsNum = 1;
      stStarsNum=1
      bgStarsNum=1
      des = "Très faible";
      break;
    case ratio < 4.5:
      starsNum = 2;
      stStarsNum=1
      bgStarsNum=2
      des = "Pauvre";
      break;
    case ratio < 7:
      starsNum = 3;
      stStarsNum=2
      bgStarsNum=3
      des = "Bon";
      break;
    case ratio < 12:
      starsNum = 4;
      stStarsNum=3
      bgStarsNum=3
      des = "Très bien";
      break;
    default:
      starsNum = 5;
      stStarsNum=3
      bgStarsNum=3
      des = "Super";
  }
  //main ratio stars and des
  rationStars.innerHTML=""
  rationDes.innerText=""
  for(i=0;i<starsNum;i++){
    rationStars.innerHTML+='<img src="star.png" alt="" srcset="">'
  }
  for(i=0;i<5-starsNum;i++){
    rationStars.innerHTML+='<img src="star-vide.png" alt="" srcset="">'
  }

  //small text ratio stars
  smallTextStars.innerHTML=""
  for(i=0;i<stStarsNum;i++){
    smallTextStars.innerHTML+='<img src="star.png" alt="" srcset="">'
  }
  for(i=0;i<3-stStarsNum;i++){
    smallTextStars.innerHTML+='<img src="star-vide.png" alt="" srcset="">'
  }
    //big text ratio stars
    bigTextStars.innerHTML=""
    for(i=0;i<bgStarsNum;i++){
      bigTextStars.innerHTML+='<img src="star.png" alt="" srcset="">'
    }
    for(i=0;i<3-bgStarsNum;i++){
      bigTextStars.innerHTML+='<img src="star-vide.png" alt="" srcset="">'
    }

    //backgrounds color 
    let smCont = document.querySelector('.small-text')
    let bgCont = document.querySelector('.big-text')
    let topPart = document.querySelector('.top-part')
    if(stStarsNum==3){
      smCont.style.backgroundColor='#8be98c'
    }else if(stStarsNum==2){
      smCont.style.backgroundColor='#edd785'
    }else if(stStarsNum==1){
      smCont.style.backgroundColor='#ea99a2'
    }
    if(bgStarsNum==3){
      bgCont.style.backgroundColor='#8be98c'
    }else if(bgStarsNum==2){
      bgCont.style.backgroundColor='#edd785'
    }else if(bgStarsNum==1){
      bgCont.style.backgroundColor='#ea99a2'
    }
    if(starsNum>3){
      topPart.style.backgroundColor='#8be98c'
    }else if(starsNum==3){
      topPart.style.backgroundColor='#edd785'
    }else if(starsNum<3){
      topPart.style.backgroundColor='#ea99a2'
    }
  rationDes.innerText=des
}

colorsChangeBtn.addEventListener('mouseenter',()=>{
  document.querySelector('.color-gen-cont div').style.display='flex'
})
colorGenCont.addEventListener('mouseleave',()=>{
  document.querySelector('.color-gen-cont div').style.display='none'
})

function getComplementaryColorHex(hexColor) {
  const rgbColor = [
    parseInt(hexColor.substring(1, 3), 16),
    parseInt(hexColor.substring(3, 5), 16),
    parseInt(hexColor.substring(5), 16)
  ];
  const complementaryColor = rgbColor.map(value => 255 - value);
  const hexComplementaryColor = `#${complementaryColor.map(value => value.toString(16).padStart(2, '0')).join('')}`;
  return hexComplementaryColor;
}


function generateRandomColorHex() {
 do{
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); 
  color = `#${randomColor.padStart(6, '0')}`; 

 }while(getContrastRatio(hexToRgb(color),hexToRgb(getComplementaryColorHex(color)))<8)
  return color
}
