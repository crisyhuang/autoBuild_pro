import '../css/common.less';
import Icon from '../images/lovely.jpg'

(function () {
    var index = {
        init: function () {
            console.log('hjj')
            setTimeout(function () {
                var icon = new Image();
                icon.src = Icon;
                document.getElementById('testPara').appendChild(icon);
                // document.getElementById('main').children[1].innerHTML = 'Hi, gulp!';
            }, 3000);
        }
    };

    window.onload = index.init();
})();