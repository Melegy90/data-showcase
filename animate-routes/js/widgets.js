$(document).ready(function() {

    $("#directionsBtn").click(function () {
        ("#directionsBtn").toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
        $("#directions-panel").toggle("slow");
    });
});