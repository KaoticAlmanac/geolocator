

$(window).bind("load", function() {
    $('.post-date').each(function (index) {
        let postedStr = "Posted at ";
        let datePostedText=$(this).text().trim();
        let dateString = datePostedText.substring(postedStr.length);
        console.log(dateString);
        console.log(postedStr.length);
        console.log(datePostedText);

        let currentDate = new Date(dateString);
        $(this).text(postedStr+currentDate.toLocaleDateString(langCode,{
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        }));
    });

});

