let dataString = localStorage.getItem('Save')

const data = dataString ? JSON.parse(dataString) : {
    id: 0,
    list: []
}

function save() {
    localStorage.setItem('Save', JSON.stringify(data));
}

window.addEventListener('load', e => render());