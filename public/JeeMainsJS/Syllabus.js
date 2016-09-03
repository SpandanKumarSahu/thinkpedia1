/**
 * Created by PSB on 04-06-2016.
 */
$(".syllabi").not("#Phy").hide();
$("#phyButton").click(function(){
    $("#Phy").slideToggle();
});
$("#chemButton").click(function(){
    $("#Chem").slideToggle();
});
$("#mathsButton").click(function(){
    $("#Maths").slideToggle();
});
$("#ln ul:nth-child(2) li:first-child a").click(function () {
    $("#Phy").slideDown();
    $(".syllabi").not("#Phy").hide();
});
$("#ln ul:nth-child(2) li:nth-child(2) a").click(function () {
    $("#Chem").slideDown();
    $(".syllabi").not("#Chem").hide();
});
$("#ln ul:nth-child(2) li:nth-child(3) a").click(function () {
    $("#Maths").slideDown();
    $(".syllabi").not("#Maths").hide();
});