function palcoloris(baseColor){
    let funcArr= [getOpposite(baseColor),triadic(baseColor),
        Monochromatic(baseColor),splitComplementary(baseColor)
        ,analogous(baseColor),tetradic(baseColor)]
    let pal = document.querySelectorAll('.pallette-x')

    funcArr.forEach((func,index)=>{
        let color = func
        pal[index].innerHTML=''
        color.forEach(clr=>{
            let src;
            if(couleurContraste(clr)=='#FFFFFF'){
                src='copy-white.png'
            }else{
                src='copie.png'
            }
    
            let div = `
            <div>
            <div style="background-color:${clr} ;">
                <img src="${src}" alt="">
            </div>
            <p>${clr}</p>
        </div> 
            `
            pal[index].innerHTML+=div
            
        })
        

    })
    copyComSec()    
}

//functions
function getOpposite(color){
    const originalColor = tinycolor(color);
    const opposite = originalColor.spin(180);
    const oppositeHex = opposite.toHexString();
    return [color,originalColor];
}

function triadic(baseColor) {
    const baseColorObj = tinycolor(baseColor);
    const accentColor1 = baseColorObj.clone().spin(120);
    const accentColor2 = baseColorObj.clone().spin(240);
    const baseHex = baseColorObj.toHexString();
    const accentHex1 = accentColor1.toHexString();
    const accentHex2 = accentColor2.toHexString();
    return [baseHex, accentHex1, accentHex2];
}

function Monochromatic(baseColor) {
    let baseHSL = tinycolor(baseColor).toHsl();
    let color1 = tinycolor({
        h: baseHSL.h,
        s: baseHSL.s,
        l: baseHSL.l * (Math.random() * 0.5 + 0.75)
    }).toHexString();
    let color2 = tinycolor({
        h: baseHSL.h,
        s: baseHSL.s,
        l: baseHSL.l * (Math.random() * 0.5 + 0.75) 
    }).toHexString();
    return [baseColor, color1, color2];
}
function splitComplementary(baseColor) {
    let baseHSL = tinycolor(baseColor).toHsl();
    let complementHue = (baseHSL.h + 180) % 360;
    let color1 = tinycolor({
        h: (complementHue + 30) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();
    let color2 = tinycolor({
        h: (complementHue - 30 + 360) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    return [baseColor, color1, color2];
}
function analogous(baseColor) {
    let baseHSL = tinycolor(baseColor).toHsl();
    let color1 = tinycolor({
        h: (baseHSL.h + 30) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    let color2 = tinycolor({
        h: (baseHSL.h + 60) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    return [baseColor, color1,  color2];
}
function tetradic(baseColor) {
    let baseHSL = tinycolor(baseColor).toHsl();
    let complementHue = (baseHSL.h + 180) % 360;
    let color1 = tinycolor({
        h: (baseHSL.h + 60) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    let color2 = tinycolor({
        h: (complementHue + 60) % 360,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    let color3 = tinycolor({
        h: complementHue,
        s: baseHSL.s,
        l: baseHSL.l
    }).toHexString();

    return [baseColor, color1, color2, color3];
}
// add copy option for combinaisons color pallates
function copyComSec(){
    let secondDiv = document.querySelectorAll('.pallette-x div div')
    let copImg = document.querySelectorAll('.pallette-x div div img')
    let clrHex = document.querySelectorAll('.pallette-x div p')

    secondDiv.forEach((div,i)=>{
        div.addEventListener('mouseenter',()=>{
            copImg[i].style.display='inline-block'
            clrHex[i].style.display='inline-block' 
        })
        div.addEventListener('mouseleave',()=>{
            copImg[i].style.display='none'
            clrHex[i].style.display='none'
        })
        div.addEventListener('click',()=>{
            navigator.clipboard.writeText(clrHex[i].innerText);
            copyEff()
            
        })
    })
}
document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('resize',()=>{
            document.querySelector('.clr-picker-cont0').style.marginLeft=window.innerWidth/2-120+'px'
            Coloris({
                parent:'.clr-picker-cont',
                inline:true,
            });
    
        })
        document.querySelector('.clr-picker-cont0').style.marginLeft=window.innerWidth/2-120+'px'
        Coloris({
            parent:'.clr-picker-cont',
            inline:true,
        });

});



// func
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
    if (typeof hex == 'string') {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }else{
        return [255, 255, 255];
    }

}



