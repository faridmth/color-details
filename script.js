import './color-combinations.js'
import rgb  from './color-space/rgb.js'
import cmyk  from './color-space/cmyk.js'
import lab  from './color-space/lab.js'
import hsl  from './color-space/hsl.js'
import luv  from './color-space/luv.js'
import xyz  from './color-space/xyz.js'
import hwb  from './color-space/hwb.js'
const colorInp = document.querySelector('#color-inp');
let clrcn = document.querySelector('.clrcn')
let choosedClr = document.querySelector('.choosed-color')
let choosedClrName = document.querySelector('.color-name')
let colorsConvert = document.querySelector('.colors-convert')
let shades = document.querySelector('.shades')
let tints = document.querySelector('.tints')
let clrPickCont = document.querySelector('.clr-picker-cont0')


document.addEventListener('coloris:pick', event => {
    onInput(event.detail.color)
  });



onInput('#aadbcb')



// functions 
function rgbVersHex(r, g, b) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}
function couleurContraste(hex) {
    const [r, g, b] = hexVersRGB(hex);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance > 128) {
        return '#000000';
    } else {
        return '#FFFFFF'; 
    }
}
function hexVersRGB(hex) {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}


function onInput(clr){
    tints.innerHTML=''
    colorsConvert.innerHTML=''
    shades.innerHTML=''
    clrcn.style.backgroundColor = clr
    choosedClr.innerText=clr
    var n_match  = ntc.name(clr);
    choosedClrName.innerText= "≈ "+n_match[1]
    //changer les couleurs des text 
    choosedClr.style.color=couleurContraste(clr)
    choosedClrName.style.color=couleurContraste(clr)
    //color converter color : #472828
    let colors = []
    let rgbClr = hexVersRGB(clr)
    let xyzClr = rgb.xyz(rgbClr)
    colors.push({'name':'RGB','code': rgbClr})
    colors.push({'name':'CMYK','code': rgb.cmyk(rgbClr)})
    colors.push({'name':'XYZ','code': rgb.xyz(rgbClr)})
    colors.push({'name':'LAB','code': xyz.lab(xyzClr)})
    colors.push({'name':'HSL','code': rgb.hsl(rgbClr)})
    colors.push({'name':'LUV','code': xyz.luv(xyzClr)})
    colors.push({'name':'HWB','code': rgb.hwb(rgbClr)})
    //disp colors 
    colorsConvert.innerHTML+=`
            <div class="inp">
                <p>HEX :</p>
                <input type="text"value='${clr}' readonly>
                <img src="copie.png" alt="" srcset="">
            </div>
    `
    colors.forEach(color=>{
        colorsConvert.innerHTML+=`
                <div class="inp">
                    <p>${color.name} :</p>
                    <input type="text" value='${Math.round(color.code[0])},${Math.round(color.code[1])},${Math.round(color.code[2])}' readonly>
                    <img src="copie.png" alt="" srcset="">
                </div>
        `
    })
    document.querySelectorAll('.inp').forEach(inp=>{
        inp.querySelector('img').addEventListener('click',()=>{
            inp.querySelector('input').select();
            inp.querySelector('input').setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(inp.querySelector('input').value);        
            copyEff()
        })
    })

    let shadesColors = createShades(clr)
    let per =0;
    shadesColors.forEach(color=>{
        let src;
        if(couleurContraste(color)=='#FFFFFF'){
            src='copy-white.png'
        }else{
            src='copie.png'
        }
        shades.innerHTML+=`
            <div>
            <p>${per}%</p>
            <div style='background-color:${color}'>
            <img src="${src}" alt="">
            </div>
            <h6>${color}</h6>
            </div>
        `
        per+=10
    })
    shadesEffects()
    let tintsColors = createTints(clr)
    let per2 =0;
    tintsColors.forEach(color=>{
        let src;
        if(couleurContraste(color)=='#FFFFFF'){
            src='copy-white.png'
        }else{
            src='copie.png'
        }
        tints.innerHTML+=`
        <div>
        <p>${per2}%</p>
        <div style='background-color:${color}'>
            <img src="${src}" alt="">
        </div>
        <h6>${color}</h6>
        </div>
    `
    per2+=10
    })
    tintsEffects()
    palcoloris(clr)

}
//on input endes
//create shades 
function createShades(baseColor) {
    // Parse the base color from hex format (#RRGGBB)
    let r = parseInt(baseColor.substring(1, 3), 16);
    let g = parseInt(baseColor.substring(3, 5), 16);
    let b = parseInt(baseColor.substring(5, 7), 16);
    let shades = [];
    for (let i = 0; i <= 100; i += 10) {
        let shadeR = Math.round((1 - i/100) * r);
        let shadeG = Math.round((1 - i/100) * g);
        let shadeB = Math.round((1 - i/100) * b);
        let shadeHex = `#${shadeR.toString(16).padStart(2, '0')}${shadeG.toString(16).padStart(2, '0')}${shadeB.toString(16).padStart(2, '0')}`;
        shades.push(shadeHex);
    }
    return shades;
}


// create Tints 
function createTints(baseColor) {
    // Parse the base color from hex format (#RRGGBB)
    let r = parseInt(baseColor.substring(1, 3), 16);
    let g = parseInt(baseColor.substring(3, 5), 16);
    let b = parseInt(baseColor.substring(5, 7), 16);

    let tints = [];

    for (let i = 0; i <= 100; i += 10) {
        let tintR = Math.round((i/100) * r + (1 - i/100) * 255);
        let tintG = Math.round((i/100) * g + (1 - i/100) * 255);
        let tintB = Math.round((i/100) * b + (1 - i/100) * 255);

        let tintHex = `#${tintR.toString(16).padStart(2, '0')}${tintG.toString(16).padStart(2, '0')}${tintB.toString(16).padStart(2, '0')}`;
        tints.push(tintHex);
    }

    return tints;
}


// shades copy and hover effect
function shadesEffects(){
        let shadesColorDivs = document.querySelectorAll('.shades div');
    
        shadesColorDivs.forEach((div, index) => {
            let imgElement = div.querySelector('div img');
            let h6Element = div.querySelector('h6');
    
            if (imgElement && h6Element) {
                div.addEventListener('mouseenter', () => {
                    imgElement.style.display = 'inline-block';
                    if(document.body.clientWidth>750){
                        h6Element.style.display = 'inline-block';
                    }
                    
                });
    
                div.addEventListener('mouseleave', () => {
                    imgElement.style.display = 'none';
                    h6Element.style.display = 'none';
                });
                div.addEventListener('click',()=>{
                    navigator.clipboard.writeText(h6Element.innerText);
                    copyEff()
                })
            }
        });
    }
    

// tints copy and hover effect
function tintsEffects() {
    let tintsColorDivs = document.querySelectorAll('.tints div');

    tintsColorDivs.forEach((div, index) => {
        let imgElement = div.querySelector('div img');
        let h6Element = div.querySelector('h6');

        if (imgElement && h6Element) {
            div.addEventListener('mouseenter', () => {
                imgElement.style.display = 'inline-block';
                if(document.body.clientWidth>750){
                    h6Element.style.display = 'inline-block';
                }
            });

            div.addEventListener('mouseleave', () => {
                imgElement.style.display = 'none';
                h6Element.style.display = 'none';
            });
            div.addEventListener('click',()=>{
                navigator.clipboard.writeText(h6Element.innerText);
                copyEff()
            })
        }
    });
}

















