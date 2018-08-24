/**
 * @description index.js
 * @author Crisyhuang
 */
(function () {
    var index = {
        init: function () {
            console.log('hhh')
            setTimeout(function () {
                document.getElementById('main').innerHTML = 'Hi, gulp!';
            }, 3000);
        }
    };

    window.onload = index.init();
})();