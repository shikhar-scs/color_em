$(document).ready(function () {
    mainSection = $("#mainSection")

    $.ajax({
        type: "GET",
        url: "/csvfiles/customSearch",
        dataType: "text",
        success: (data)=>{appendDivs(data)}
    });

    function appendDivs(data) {
        processData = data.split(`\",\"`)

        processData.forEach((str) => {
            arr = str.split('\'');
            // if(arr[1] && arr[5].split('-')[1] && arr[7] && arr[3].split("+").join(" ")){
                newDiv = `<div class="card-header">
                            Analogy Between ${arr[1].toUpperCase()} and ${arr[3].split("+").join(" ").toUpperCase()}
                            </div>
                            <div class="card-body">
                            <h5 class="card-title">${arr[5].split('-')[1]}</h5>
                            <p class="card-text" id="">${arr[7]}</p>
                            <a href="" id="" class="btn btn-primary">Know More</a>
                            </div>
                            <div class="card-footer text-muted">
                            </div>`
                mainSection.append(newDiv)
            // }
        }

        )

    }

});







