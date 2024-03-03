

function copyEff(){
    let copyEffect = document.querySelector('.copy-effect')
        copyEffect.style.display='inline-block'
        copyEffect.style.opacity = '1';
        copyEffect.style.transition = 'transform 0.3s'; 
        copyEffect.style.transform = 'translateY(-20px)';
    setTimeout(()=>{
        copyEffect.style.transition = 'transform 0.3s'; 
        copyEffect.style.transform = 'translateY(-30px)';
        copyEffect.style.opacity = '0.3';
    },2000)
    setTimeout(()=>{
        copyEffect.style.display = 'none'
        copyEffect.style.bottom = '-10px';
    },2020)
}
