const fs = require('fs');
const path = require('path');

module.exports = function (gulp) {
    fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file.indexOf('task_') === 0);
    }).forEach(function (file) {
        require(path.join(__dirname, file))(gulp);
    });
}