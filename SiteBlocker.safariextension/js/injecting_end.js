/* Code
---------------------------------------------------------------------- */

// Replace 'document.***'
var $id  = function(id)  { return document.getElementById(id); };
var $cn  = function(cn)  { return document.getElementsByClassName(cn); };
var $tag = function(tag) { return document.getElementsByTagName(tag); };
var $qsa = function(qsa) { return document.querySelectorAll(qsa); };


if (window.top === window) {


    (function() {
        var pageURL = location.hostname;
        safari.self.tab.dispatchMessage('checkUrlList', pageURL); // to global
    }());


    safari.self.tab.dispatchMessage('requestAlertValue'); // to global


    var receiveMessage = function(event) {
        switch (event.name) {

            // from popover
            case 'requestURL' :
                var href = location.href;
                var pageURL = href.match(/https?:\/\/[^\/]+\//);
                safari.self.tab.dispatchMessage('showPopoverURL', pageURL); // to global
                break;


            // from global
            case 'showListData' :
                // var element = document.createElement('div');
                // element.id = 'injecting__url';
                // element.innerHTML = event.message;
                // element.style.opacity = 0;
                // $tag('body').item(0).appendChild(element);
                break;


            // from popover
            case 'showMessage' :
                var element = document.createElement('div');
                element.id = 'injecting__url';
                element.innerHTML = event.message;
                // element.style.opacity = 0;
                $tag('body').item(0).appendChild(element);
                break;


            // from global
            case 'stopPageLoad' :
                var delay = event.message || 0;

                // create mask
                var delayValue = delay/1000;
                var element = document.createElement('div');
                element.id = 'injecting__mask';
                $tag('body').item(0).appendChild(element);

                if (0 !== delay){
                    var hideMask = function() { element.parentNode.removeChild(element); }
                    var countDown = function() {
                        delayValue--;
                        element.innerHTML = delayValue;
                    }
                    element.innerHTML = delayValue;

                    setInterval(countDown, 1000)
                    setTimeout(hideMask, delay);
                }

                // stop();
                break;


            // from global
            case 'jumpPage' :
                document.location = event.message;
                break;


            // from global
            case 'jumpDummyPage' :
                // var htmlPath = 'html/dummy.html';
                // var jumpURL = safari.extension.baseURI + htmlPath;
                // document.location = jumpURL;
                break;


            // from global
            case 'countDonwPageLoad' :
                break;


            // from global
            case 'consoleLog' :
                console.log(event.message); // e.g.) event.target.page.dispatchMessage('consoleLog', value);
                break;


            default:
                break;
        }
    };
    safari.self.addEventListener('message', receiveMessage, false);


    // // keydown 'D' show URL
    // var keyDown = function(event) {
    //     if (68 === event.keyCode) {
    //         var elementOpacity = parseInt($id('injecting__url').style.opacity, 10);
    //         if (0 === elementOpacity) {
    //             $id('injecting__url').style.opacity = 1;
    //         } else {
    //             $id('injecting__url').style.opacity = 0;
    //         }
    //     }
    // };
    // document.addEventListener('keydown', keyDown);


}