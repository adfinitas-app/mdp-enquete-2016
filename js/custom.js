$(document).foundation();

function startQuiz() {
    $('.container').animate({
        scrollTop: $('.quiz0').offset().top
    });
}

function nextQuestion(question) {
    $('.error', $('.quiz' + (question-1))).html('').css('display', 'none');
    
    // On vérifie que la personne a répondu à la question
    if($('input[type=radio]:checked', $('.quiz' + (question-1))).length == 0) {
        $('.error', $('.quiz' + (question-1))).html('Merci de cocher une réponse à la question').css('display', 'block');
    }
    else {
        $('.quiz').animate({
            scrollTop: $('.quiz' + question).parent().scrollTop() + $('.quiz' + question).offset().top - $('.quiz' + question).parent().offset().top
        });
    }
}

function checkAnswer(question, el, radioIndex) {
    $('.' + question).attr('src', 'img/checkbox-off.png');
    $(el).attr('src', 'img/checkbox-on.png');
    $(el).parents('.quiz-question').find('input[type=radio]').eq(radioIndex).prop('checked', true);
}



function endQuiz() {
    $('.qtip').each(function(){
        $(this).data('qtip').destroy();
    });
    
    // On vérifie la validité des champs
    var error = false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if($('#nom').val() == '') {
        error = true; 
        $('#nom').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: (screen.width <= 641) ? 'top center' : 'bottom center',
                at: (screen.width <= 641) ? 'bottom center' : 'top center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if($('#prenom').val() == '') {
        error = true; 
        $('#prenom').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: (screen.width <= 641) ? 'top center' : 'bottom center',
                at: (screen.width <= 641) ? 'bottom center' : 'top center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if($('#email').val() == '') {
        error = true; 
        $('#email').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    else if(!re.test($('#email').val())) {
        error = true; 
        $('#email').qtip({
            content: 'Ce champ doit être un e-mail valide',
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if(!error) {
        var today = new Date();
        data = {
            schema : "mdp-enquete2016",
            db : {
                "firstname" : $('#prenom').val(),
                "lastname" : $('#nom').val(),
                "email" : $('#email').val(),
                "phone" : $('#tel').val(),
                "q1" : $('input[type=radio]:checked', $('.quiz0')).val(),
                "q2" : $('input[type=radio]:checked', $('.quiz1')).val(),
                "q3" : $('input[type=radio]:checked', $('.quiz2')).val(),
                "q4" : $('input[type=radio]:checked', $('.quiz3')).val(),
                "q5" : $('input[type=radio]:checked', $('.quiz4')).val(),
                "date": today.toString()
            }
        }
        
        function success() {
            $('.container').animate({
                scrollTop: $('.finish').offset().top + $('.container').scrollTop()
            });
        }

        function error() {
            alert('Une erreur est survenue lors de l\'enregistrement de vos réponses. Veuillez réessayer ultérieurement.');
        }

        makeCorsRequest(data, success, error);
    }
}

$(function(){
	// Remplacement des radios
    $('.quiz-question').each(function() {
        var i = 0;
        $('input[type=radio]', $(this)).each(function() {
            var that = this;
            $(that).prop('checked', false).css('display', 'none').after($('<img src="img/checkbox-off.png" class="custom-checkbox radio-' + $(that).attr('name') + '" onclick="checkAnswer(\'radio-' + $(that).attr('name') + '\', this, ' + i + ');" />'));
            i++;
        });
    });
    
    if(screen.width <= 769) {
        $('.finish').css('height', screen.height + 'px !important');
    }
    else {
        $('.finish').css('height', '100%');
    }
});