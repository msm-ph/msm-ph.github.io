if (typeof jQuery !== 'undefined') {
    (function($) {
        $('#spinner').ajaxStart(function() {
            $(this).fadeIn();
        }).ajaxStop(function() {
                $(this).fadeOut();
            });
    })(jQuery);
}

$(function(){
    $(document).on('click', '.news-headlines-year', function(){
        $('.news-headlines-year').next('ul').removeClass('open-year');

        if($(this).next('ul').hasClass('open-year'))
            $(this).next('ul').removeClass('open-year');
        else
            $(this).next('ul').addClass('open-year');
    });

    $(document).on('click', '#news-headlines-months h5.month', function(){
        $('#news-headlines-months h5.month').next('ul').removeClass('open-month');
        if($(this).next('ul').hasClass('open-month')){
            $(this).next('ul').removeClass('open-month');
        }
        else
            $(this).next('ul').addClass('open-month');
    });

    $(document).on('click','.open-news', function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        var newsid = $(this).data('newsid');

        $.post('/news/displayNews',{newsid:newsid}, function(data){

        }).done(function(data){
                $('#display-news-container').html(data);
            });


    });

    $(document).on('click','#addDuties', function(){
        $("<input type='text' name='duties' value='' class='form-control multiple-text' id='duties'>").appendTo('#additionalDuties');
    });

    $(document).on('click', '#view-more', function(){
        $("html, body").animate({scrollTop: $("#display-news")[0].scrollHeight},"slow");
        var counter = $('.hidden').data('counter');
        if (counter == undefined){
            $('.hidden').data('counter',10);
            counter = $('.hidden').data('counter');
        }
        var latestNewsId = $(this).data('latestnewsid');

        $.post('/news/viewMore',{counter:counter, latestNewsId:latestNewsId}, function(data){

        }).done(function(data){
                $('#display-news').html(data);
                $('.hidden').data('counter',counter+2);
            });
    });
    $('#create').hide();

    if($('.first-info').hasClass('active')){
        $('#prev').hide();
    }

    $(document).on('click','#addNewWork', function(){
        var applicantId = $('#id').val();
        var position = $('#position').val();
        var duration = $('#duration').val();
        var company = $('#company').val();
        var location = $('#location').val();
        var jobDescription = $('#jobDescription').val();

        $.post('/applicant/addWorkExperience', {applicantId: applicantId, position: position, duration:duration, company:company, location:location, jobDescription: jobDescription}, function(data){

        }).done(function(data){
                $('#work-experience-div').html(data);
            });

    });

    $('#create').hide();

    var windowWidth = $(window).width();

    $('.services li').hover(function(){
        $(this).addClass('expand');
        $(this).parent().siblings().find('li').removeClass('expand');
    });
});

function verify(){
    var page='first';
    var counter=0;
    if ($('#next-prev').siblings().find('.active').hasClass('first-info')){
        page = 'first';
    }else if($('#next-prev').siblings().find('.active').hasClass('second-info')){
        page = 'second';
    }else{
        page = 'third';
    }

    switch (page)
    {
        case 'first':
            $('.first-info').find('.check').each(function(){
                if($(this).val()==''){
                    alert('Fill the required fields');
                    return false;
                }else{
                    $(this).addClass('filled');
                }
            });
            $('.first-info').find('.filled').each(function(){
                counter++;
            });

            if(counter >= 5){
                next();
            }
            break;
        case 'second':
            $('#next').show();
            $('#prev').show();
            $('.second-info').find('.check').each(function(){
                if($(this).val()==''){
                    alert('Fill the required fields');
                    return false;
                }else{
                    $(this).addClass('filled');
                }
            });
            $('.second-info').find('.filled').each(function(){
                counter++;
            });
            if(counter >= 2){
                next();
            }
            break;
        case 'third':
            $('#next').hide();
            break;
    }
}
function next(){
    if($('.first-info').hasClass('active')){
        $('.first-info').removeClass('active');
        $('.second-info').addClass('active');
        $('#next').show();
        $('#prev').show();
    }else if($('.second-info').hasClass('active')){
        $('.second-info').removeClass('active');
        $('.third-info').addClass('active');
        $('#next').hide();
        $('#create').show();
    }
}

function prevPage(){
    if($('.second-info').hasClass('active')){
        $('.first-info').addClass('active');
        $('.second-info').removeClass('active');
        $('#prev').hide();
    }else if($('.third-info').hasClass('active')){
        $('.second-info').addClass('active');
        $('.third-info').removeClass('active');
        $('#next').show();
        $('#prev').show();
    }
}

function sendMailSpinner(){
    $('#table-div').hide();
    $('#spinner').show();
    $('.notification-div').hide();
}

CKEDITOR.editorConfig = function( config )
{
    config.toolbar_adappToolbar = [
        [ 'Undo' ],
        [ 'Redo' ],
        [ 'Bold' ],
        [ 'Italic' ],
        [ 'Underline' ],
        [ 'Strike' ],
        [ 'TextColor' ],
        [ 'BGColor' ],
        [ 'NumberedList'],
        [ 'BulletedList' ],
        [ 'Indent' ],
        [ 'JustifyLeft' ],
        [ 'JustifyCenter' ],
        [ 'JustifyRight' ],
        [ 'JustifyBlock' ],
        [ 'Font' ],
        [ 'FontSize' ]
    ]
    config.resize_enabled = false;
};

