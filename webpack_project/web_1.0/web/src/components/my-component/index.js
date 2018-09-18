import _ from 'lodash';
import './style.css';

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    element.classList.add('hello');

    console.log('hjjx')
    return element;
}

document.body.appendChild(component());