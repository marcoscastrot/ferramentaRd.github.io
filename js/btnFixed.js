jQuery(document).ready(function($) {

    var $btnScroll = $('.btn-fixed'),
        $offset = $('header').outerHeight( true ) + $('#grade').outerHeight( true ) + $('#actionsResult').outerHeight( true );

    function showBtnScroll() {
        var $scrollTop = $(window).scrollTop();

        if( $scrollTop >= $offset ){
            $btnScroll.addClass('btn-show');
        } else {
            $btnScroll.removeClass('btn-show');
        }
    }

    showBtnScroll();

    $(window).scroll(function(){
        showBtnScroll();
    });
});
