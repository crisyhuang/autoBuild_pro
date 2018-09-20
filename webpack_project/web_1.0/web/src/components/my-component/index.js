import _ from 'lodash';
import './style.css';
// import Print from './print.js';

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    element.classList.add('hello');

    console.log('hjjxdddd')
    // Print('hjj')

    // import("./module").then(module => {
    //     return module.default;
    // }).catch(err => {
    //     console.log("Chunk loading failed");
    // });

    return element;
}

document.body.appendChild(component());