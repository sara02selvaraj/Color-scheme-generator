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
                        <span class="tooltiptext" id="myTooltip">Copy</span>${color.hex.value}</p>
                    </div>`
        }).join('')
        test()
    })
}    

//render on color selection
formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    render()
})

function test() {
    const colorNameEl = document.getElementsByClassName('color-name')
    for(let i=0; i < colorNameEl.length; i++){
        colorNameEl[i].addEventListener('click', function(){
            navigator.clipboard.writeText(colorNameEl[i].textContent)
            console.log(colorNameEl[i].textContent)
            alert(colorNameEl[i].textContent)
        })
    }
}

// function copyText(item) {
//     item.select();
//     item.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(item.textContent)
//     console.log(item.textContent)
//     alert(item.textContent)
// }