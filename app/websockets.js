//websockets.js

module.exports = function(wss) {

  //Object to hold of connected clients
  var clients = {};
  var clientId = 0;

  //Object to hold all the questions
  var questions = {};
  var questionId = 0;

  wss.on("connection", function(ws) {

    var currentClientId = clientId;
    clientId ++;

    console.log("Websocket connection open for client with id: " + currentClientId);
    clients[currentClientId] = ws;

    /* When a new connection is opened send the user all the existing questions */
    for (var i in questions) {
      var message = questions[i];
      message.event = "AddQuestion";
      ws.send(JSON.stringify(message));
    }

    ws.on('message', function(message) {

      if (message.event == "AddQuestion") {

        console.log("Student: " + message.student.name + " has asked a new question with id: " + questionId);

        message.id = questionId;
        questions[questionId] = message;
        questionId ++;

        /* If a new question is added notify all the connected clients
         * about this new question */
        for(var i in clients) {
          clients[i].send(JSON.stringify(message));
        }

      } else if (message.event == "QuestionAnswered") {

        console.log("Teacher " + message.teacher.name + " has answered question with id: " + message.id);

        for (var i in questions) {
          if (i == message.id) {
            var question = questions[i];
            if (message.teacher.name != "" && message.answer != "" && question.teacher.name == "") {

              //Update data on server about the question
              question.answer = message.answer;
              question.teacher = message.teacher;

              //Notify all connected clients about the updated answer
              for(var i in clients) {
                clients[i].send(JSON.stringify(message));
              }

            } else {
              console.error("Error: Missing teacher name or answer while updating question with id: " + question.id);
            }
          }
        }

      } else {

        console.error("Unrecognised event: " + message.event + " sent in message");

      }

    });

    ws.on("close", function() {
      delete clients[currentClientId];
      console.log("Websocket connection close for client: " + currentClientId);
    });

  });

};