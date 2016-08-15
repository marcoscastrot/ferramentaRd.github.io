app.service('QuestionsService', function () {
    this.Score = function (Questions) {
    	var obj = { score: 0, result: '' };
    	for (var i = 0; i < Questions.length; i++) {
    		for (var j = 0; j < Questions[i].Alternatives.length; j++) {
    			if (Questions[i].Answer == Questions[i].Alternatives[j].Id){
    				obj.score += Questions[i].Alternatives[j].Score;
    				j = Questions[i].Alternatives.length;
    			}
    		};	
    	};

    	obj.score = parseFloat(obj.score.toFixed(2))

    	obj.result = this.ResultByScore(obj.score);

        return obj;
    };

    this.ResultByScore = function(Score){
		if (Score >= 9){
    		return 'Parabéns! Parece que sua empresa está trilhando um caminho de sucesso e certamente tem tudo para crescer. Como marketing e vendas precisam buscar melhorias continuas, abaixo apresentamos algumas indicações de materiais mais avançados para que você veja como alavancar ainda mais os seus resultados.';
    	} else if (Score >= 7 && Score < 9){
			return 'Muito bom! O nível de maturidade da sua empresa em marketing e vendas está acima da média. Contudo, ainda existem alguns pontos de melhoria que podem trazer um impacto muito benéfico em seu negócio. Veja abaixo os materiais que indicamos a partir de cada uma das suas respostas.';
    	} else if (Score >= 4 && Score < 7){
    		return 'Sua empresa ainda tem muitas oportunidades de crescimento e alavancagem em marketing e vendas! Veja abaixo nossos comentários sobre cada uma das suas respostas e a indicação de um material que vai ajudar você a entender qual caminho seguir.';
    	} else{
    		return 'Você ainda pode melhorar muito a estratégia de marketing e vendas na sua empresa para gerar um crescimento sustentável. Veja abaixo nossos comentários sobre cada uma das suas respostas e a indicação de um material que vai ajudar você a entender qual caminho seguir.';
    	}
    };

    this.ObjectToHash = function (Questions, Email, Name, Score){
    	var hash = 'name=' + Name + '&email=' + Email + '&score=' + Score;

    	for (var i = 0; i < Questions.length; i++) {
    		hash += '&' + Questions[i].Id + '=' + Questions[i].Answer;
    	}

    	return encodeURIComponent(hash);
    };

    this.HashToObject = function (url){
    	var ret = {
    		Name: '',
    		Email: '',
    		Score: '',
    		Result: '',
    		Answers: []
    	}

    	var listValues = decodeURIComponent(url.split('?')[1]).split('&');

    	for (var i = 0; i < listValues.length; i++) {
    		if (listValues[i].indexOf('name') != -1){
    			ret.Name = listValues[i].split('=')[1];
    		}
    		else if (listValues[i].indexOf('email') != -1){
    			ret.Email = listValues[i].split('=')[1];
    		}
    		else if (listValues[i].indexOf('score') != -1){
    			ret.Score = listValues[i].split('=')[1];
    			ret.Result = this.ResultByScore(ret.Score);
    		}
    		else{
    			var value = listValues[i].split('=');

    			ret.Answers.push({
    				Question: value[0],
    				Answer: value[1]
    			});
    		}
    	};

    	return ret;
    };

    this.SetAnswers = function(Questions, Answers){
    	for (var i = 0; i < Questions.length; i++) {
    		for (var j = 0; j < Answers.length; j++) {
    			if (Questions[i].Id == Answers[j].Question){
    				Questions[i].Answer = Answers[j].Answer;
    				j = Answers.length; 
    			}
    		}
    	}

    	return Questions;
    };

    this.CreateAnswerObj = function(Questions){
    	var answers = [];
		for (var i = 0; i < Questions.length; i++) {
    		for (var j = 0; j < Questions[i].Alternatives.length; j++) {
    			if (Questions[i].Answer == Questions[i].Alternatives[j].Id){
    				answers.push({
    					Question: Questions[i].Id + ') ' + Questions[i].Question,
    					Answer: 'R:' + Questions[i].Alternatives[j].Alternative
    				});

    				j = Questions[i].Alternatives.length;
    			}
    		};	
    	};

    	return answers;
    };
});