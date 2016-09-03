/**
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1;}
    x[slideIndex-1].style.display = "block";

    document.getElementById("b1").onclick= function(){
        var x = document.getElementsByClassName("mySlides");
        clearTimeout(b);
        slideIndex -=2;
        if(slideIndex<1){
            slideIndex+=x.length;
        }
        x[slideIndex-1].style.display="block";
        carousel();
    };
    document.getElementById("b2").onclick= function(){
        var x = document.getElementsByClassName("mySlides");
        clearTimeout(b);
        x[slideIndex-1].style.display="block";
        carousel();
    };


    var b = setTimeout(carousel, 2000); // Change image every 2 seconds


}
**/
var imggrp=[{image:"Images/Admin_Block_IIT-R.JPG",link:"http://www.iitr.ac.in"},
    {image:"Images/iit_delhi.jpg",link:"http://www.iitd.ac.in/"},
    {image:"Images/kgp.jpg",link:"http://www.iitkgp.ac.in"},
    {image:"Images/iitmadras.jpg",link:"http://www.iitm.ac.in/"}];
var indexx=-1;
SS();
function SS() {

    indexx+=1;
    if(indexx>=imggrp.length){
        indexx=0;
    }
    document.getElementById("photoo").src=imggrp[indexx]["image"];
    document.getElementById("slideshowPhotoLink").href=imggrp[indexx]["link"];
    if(indexx==0){
        document.getElementById("b1").src=imggrp[imggrp.length-1]["image"];
        document.getElementById("b2").src=imggrp[indexx+1]["image"];
    }
    else if(indexx==imggrp.length-1){
        document.getElementById("b1").src=imggrp[indexx-1]["image"];
        document.getElementById("b2").src=imggrp[0]["image"];
    }
    else{
        document.getElementById("b1").src=imggrp[indexx-1]["image"];
        document.getElementById("b2").src=imggrp[indexx+1]["image"];
    }

    document.getElementById("bb1").onclick=function () {
        clearTimeout(b);
        indexx-=2;
        if(indexx<0){indexx+=imggrp.length;}
        document.getElementById("photoo").src=imggrp[indexx]["image"];
        document.getElementById("slideshowPhotoLink").href=imggrp[indexx]["link"];
        if(indexx==0){
            document.getElementById("b1").src=imggrp[imggrp.length-1];
            document.getElementById("b2").src=imggrp[indexx+1];
        }
        else if(indexx==imggrp.length-1){
            document.getElementById("b1").src=imggrp[indexx-1];
            document.getElementById("b2").src=imggrp[0];
        }
        else{
            document.getElementById("b1").src=imggrp[indexx-1];
            document.getElementById("b2").src=imggrp[indexx+1];
        }
        SS();
    };


    document.getElementById("bb2").onclick=function () {
        clearTimeout(b);
        if(indexx<0){indexx+=imggrp.length;}
        document.getElementById("photoo").src=imggrp[indexx]["image"];
        document.getElementById("slideshowPhotoLink").href=imggrp[indexx]["link"];
        if(indexx==0){
            document.getElementById("b1").src=imggrp[imggrp.length-1];
            document.getElementById("b2").src=imggrp[indexx+1];
        }
        else if(indexx==imggrp.length-1){
            document.getElementById("b1").src=imggrp[indexx-1];
            document.getElementById("b2").src=imggrp[0];
        }
        else{
            document.getElementById("b1").src=imggrp[indexx-1];
            document.getElementById("b2").src=imggrp[indexx+1];
        }
        SS();
    };



    var b = setTimeout(SS,4000);
}