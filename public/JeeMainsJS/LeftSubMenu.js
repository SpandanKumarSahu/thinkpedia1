/**
 * Created by PSB on 29-05-2016.
 */
var abc=0;
function f2() {
    $("#eligCritSM").slideToggle();
    if(abc%2==0){
        $("#arroww1").attr('src', "Images/ic_keyboard_arrow_up_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(4)").css("background-color","silver");
    }
    else{
        $("#arroww1").attr('src', "Images/ic_keyboard_arrow_down_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(4)").css("background-color","initial");
    }
    abc+=1;
}


var def=0;
function f3() {
    $("#syllabusSM").slideToggle();
    if(def%2==0){
        $("#arroww2").attr('src', "Images/ic_keyboard_arrow_up_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(8)").css("background-color","silver");
    }
    else{
        $("#arroww2").attr('src', "Images/ic_keyboard_arrow_down_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(8)").css("background-color","initial");
    }
    def+=1;
}


var ghi=0;
function f4() {
    $("#examDetailsSM").slideToggle();
    if(ghi%2==0){
        $("#arroww3").attr('src', "Images/ic_keyboard_arrow_up_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(3)").css("background-color","silver");
    }
    else{
        $("#arroww3").attr('src', "Images/ic_keyboard_arrow_down_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(3)").css("background-color","initial");
    }
    ghi+=1;
}

var jkl=0;
function f5() {
    $("#applicationProcedureSM").slideToggle();
    if(jkl%2==0){
        $("#arroww4").attr('src', "Images/ic_keyboard_arrow_up_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(5)").css("background-color","silver");
    }
    else{
        $("#arroww4").attr('src', "Images/ic_keyboard_arrow_down_black_24dp_1x.png");
        $("#ln>ul>li:nth-child(5)").css("background-color","initial");
    }
    jkl+=1;
}
