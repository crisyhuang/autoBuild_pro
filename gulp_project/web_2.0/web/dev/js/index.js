/**
 * @description index.js
 * @author Crisyhuang
 */
(function () {
    var index = {
        init: function () {
            console.log('hjj')
            setTimeout(function () {
                document.getElementById('main').children[1].innerHTML = 'Hi, gulp!';
            }, 3000);
        }
    };

    window.onload = index.init();
})();