const formEl = document.getElementById('form-El')
const colorEl = document.querySelector('#color')
const modeEl = document.querySelector('#mode')
const containerEl = document.querySelector('#container')


//render default color on page load
render()

function render() {
    let color = colorEl.value.slice(1);
    let mode = modeEl.value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=6`)
    .then(response => response.json())
    .then(data => {
        console.log(data.colors)
         containerEl.innerHTML = data.colors.map((color) => {
            return `<div class="color-container">
                        <div class="bg-color" style="background:${color.hex.value}"></div>
                        <p class="color-name">
                        <span class="tooltiptext" id="myTooltip">Copy</span>
                        <span class="name-El">${color.hex.value}</span></p>
                    </div>`
        }).join('')
        copyToClipboard()
    })
}    

//render on color selection
formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    render()
})

//copy the color when clicked with tooltip 
function copyToClipboard() {
    const nameEl = document.getElementsByClassName('name-El')
    const tooltipEl = document.getElementsByClassName('tooltiptext')
    for(let i=0; i < nameEl.length; i++){
        nameEl[i].addEventListener('click', function(){
            navigator.clipboard.writeText(nameEl[i].textContent)
            tooltipEl[i].textContent = `copied`
        })
        nameEl[i].addEventListener('mouseout', function(){
            tooltipEl[i].textContent = 'copy'
        })
    }
}