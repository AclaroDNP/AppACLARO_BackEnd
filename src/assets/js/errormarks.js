Cookies.defaults = {
    expires: 60 * 60 * 24 * 30
};

$(document).ready(function () {
    $('#content').on('click', '#fbut', function () {
        var textUi = $('#text-ui');

        // remove error markers
        $(textUi).find('.tt-hide-wrap').remove();

        // fix the contenteditable div instead of newline proble
        var html = $(textUi).html();
        //html = html.replaceAll("\r", "");
        var html = $(textUi).html();
        html = replaceAll('<div>', "\n<div>", html);
        //html = replaceAll('<br>', "<br>\n", html);
        //html = replaceAll('<br/>', "<br>\n", html);
        $("#text-for-post").html(html);       // put this into an invisible div, so we do not see the additional newlines poping up.

        // finally get the text without html tags
        var submitText = $("#text-for-post").text();
        $('#hidden-text').val(submitText);
        $('#appform').submit();
    });

    // create error tooltips
    createErrorTooltips();  // for home situation
    $('#result').on('change', function() {  // for ajax loaded content
        createErrorTooltips();
    });


    // make tabs, also for ajax loaded tabs
    tabize();
    $('#content').on('change', "#result", function() {
        tabize();
    });

    // ignore list
    $("#content").on( "click", "#remove-all-ignore-words", function() {
        if (Cookies.enabled) {
            Cookies.set('ignores',"");
            $(".remove-ignore-word").remove();
        }
    });
    $("#content").on( "click", ".remove-ignore-word", function() {
        if (Cookies.enabled) {
            var removeWord = $(this).text();
            // remove from cookie
            if (Cookies.enabled) {
                var newArray = Cookies.get('ignores').split('|').filter(function(elem){
                    return elem != removeWord;
                });
                Cookies.set('ignores', newArray.join('|') );
            }
            // remove from ui lists
            $(".remove-ignore-word:contains("+removeWord+")").remove();
        }
    });

    $(".clear-on-click").on("click", function() {
        $(this)
            .html("")
            .off("click");

    });



    $("#text-ui").focus();
});

$(this).on('paste',function(e) {
    e.preventDefault();
    if ((e.originalEvent || e).clipboardData) {     // chrome and firefox

        var content = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, content);
    }
    else if (window.clipboardData) {   // for IE
        var content = window.clipboardData.getData('Text');

        //if ( document.selection ) {
        //    document.selection.createRange().pasteHTML(content);    // IE <=10
        //}
        //else {
        //    document.getSelection().pasteHTML(content); // IE>=11
        //}


        // IE <= 10
        if (document.selection){
            var range = document.selection.createRange();
            range.pasteHTML(content);

// IE 11 && Firefox, Opera .....
        }else if(document.getSelection){
            var range = document.getSelection().getRangeAt(0);
            var nnode = document.createElement("p");
            range.surroundContents(nnode);
            nnode.innerHTML = content;
        };

    }
});

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function createErrorTooltips() {
    $('#text-ui .error-span').each( function() {
        $(this).tooltipster({
            content: $( 'div.tt-wrap', this),
            autoClose: false,
            interactive: true,
            contentCloning: false,
            delay: 100,
            functionBefore: function( origin, continueTooltip) {
                $('.tooltipstered').tooltipster('hide');
                continueTooltip();
            },
            functionReady: function(origin, tooltip) {
                $('.replace-option').mousedown( function() {
                    var replaceText = $(this).find('a').text();
                    var replaceId = $(this).find('a').data('targetid');
                    $('#'+replaceId).replaceWith( replaceText );
                });
                $('.add-ignore').mousedown( function() {
                    var ignoreWord = $(this).data('ignoreword');
                    // replace all marked occurences with the plain word
                    $("#text-ui").find("[data-errorword='"+ignoreWord+"']").replaceWith( decodeURI(ignoreWord ) );
                    // add to cookie
                    if (Cookies.enabled) {
                        var currentWords = [];
                        if (typeof Cookies.get('ignores') != "undefined" && Cookies.get('ignores') != "" ) {
                            currentWords = Cookies.get('ignores').split('|');
                        }

                        if ( $.inArray(ignoreWord, currentWords) == -1 ) {
                            currentWords.push(ignoreWord);
                            Cookies.set('ignores', currentWords.join('|'));
                        }
                    }
                });
                //$('.tt-close').on( 'click', function(){
                $(tooltip).on( 'click', '.tt-close', function(){
                    $(origin).tooltipster('hide');
                });
            }
        });
    })
}


function tabize() {
    if ( $('ul.tabs li').length ) {
        $('ul.tabs').each(function () {
            var $active, $content, $links = $(this).find('a');
            $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
            $active.addClass('active');
            $content = $($active[0].hash);
            $links.not($active).each(function () {
                $(this.hash).hide();
            });
            $(this).on('click', 'a', function (e) {
                $active.removeClass('active');
                $content.hide();
                $active = $(this);
                $content = $(this.hash);
                $active.addClass('active');
                $content.show();
                e.preventDefault();
            });
        });
    }
}