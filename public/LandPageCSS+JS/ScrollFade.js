$("#navBar").css({'width': ($("#divMain").width() + 'px')});
$("#navShadow").css({'width': ($("#divMain").width() + 'px')});
window.onresize=function() {
    $("#navBar").css({'width': ($("#divMain").width() + 'px')});
    $("#navShadow").css({'width': ($("#divMain").width() + 'px')});
};

$('#inp').addClass('inp1');
$("#divContent").on('scroll', function () {

    var scrollTop = $(this).scrollTop();
    var calc = (scrollTop) / 700;

    $('#navShadow').css({ 'opacity': calc });
    if( calc > '0.2'){
        $('#logoName').css('color','#6ab344');
        $('#signin').css('color','#6ab344');
        $('#signup').css('color','#6ab344');
        $('#inp').css('border-color','#6ab344');
        $('#inp').addClass('inpGreen');
        $('#inp').removeClass('inp1');
    }
    else if(calc<'0.2'){
        $('#logoName').css('color','white');
        $('#signin').css('color','white');
        $('#signup').css('color','white');
        $('#inp').css('border-color','white');
        $('#inp').addClass('inp1');
        $('#inp').removeClass('inpGreen');
    }

    if ( calc > '0.9' ) {
        $('#navShadow').css({ 'opacity': 0.9 });
    } else if ( calc < '0' ) {
        $('#navShadow').css({ 'opacity': 0 });
    }

});