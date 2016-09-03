/**
 * Created by PSB on 28-05-2016.
 */
var ImpDateInt= 0;
function f1() {
    $('#demo').collapse("toggle");
    if (ImpDateInt%2 == 0){
        document.getElementById("bDates").innerHTML = "<img src='Images/ic_keyboard_arrow_up_black_24dp_1x.png' />";
    }
    else {
        document.getElementById("bDates").innerHTML = "<img src='Images/ic_keyboard_arrow_down_black_24dp_1x.png' />";

    }
    ImpDateInt +=1;
};
