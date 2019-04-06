$(document).ready(function () {
    mainSection = $("#mainSection")

    $.ajax({
        type: "GET",
        url: "/csvfiles/indexTopics",
        dataType: "text",
        success: (data)=>{appendDivs(data)}
    });

    function appendDivs(data) {
        // processData = data.split(`\",\"`)[0]
        processData = data.split("\n")
        let p=0
        processData.forEach((arr) => {
            p++;
            if(p%9===0) {
                newDiv = `<div class="card-header"> •
                            ${arr.split(',')[1].toLocaleUpperCase()}
                            </div>`

                mainSection.append(newDiv)
            }
        })

    }

});







