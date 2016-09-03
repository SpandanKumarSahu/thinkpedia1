/**
 * Created by PSB on 18-05-2016.
 */

$(document).ready(function(){
    $("#divContent:not(#ln)").click(function(){
        $("#ln").css({"display": "none"});
    });

    
    $("#menu1").click(function(){
        var z=$("#ln").css("display");
        if(z=="none") {
            $("#ln").css({"display": "initial"});
            if($(window).width()>1120) {
                $("#center").css({"margin-left": "19em"});
            }
            else{
                $("#center").css({"opacity": "0.2"});
            }
        }
        else{

            $("#ln").css({"display": "none"});
            $("#center").css({"margin-left": "1em"});
            if($(window).width()<1120){
                $("#center").css({"opacity": "1"});
            }
        }
    });
});


