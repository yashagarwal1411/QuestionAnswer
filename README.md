README.md

Problem
-------

Create a communication server to be used by students and teachers which allows the
to post questions and answers on a given subject. In it, there are two well defined client roles:

● Students asking questions

● Teachers competing to give an answer

Live Demo App
-------------

Check out live demo app at:

https://salty-sands-94357.herokuapp.com/

To easily test out the capability of this app use:

https://salty-sands-94357.herokuapp.com/test.html


Solution
--------

Solution is written using Node.js and Websockets. Node.js was chosen as it can handle short-lived and large number of requests with ease. While Websockets provide the real time experience required so that teachers get questions intantaneously as students post them.

To manually test:

Open the app in two tabs.

tab1: Enter name and type as student. Ask a question.

tab2: Enter name and type as teacher. Answer the question.

Now you can see that answer is automatically updated in tab1.

Open multiple tabs with random roles of teachers and students. Ask questions as students and try to answer them with tabs with teacher roles. Observe that the answers and questions are automatically updated across all the tabs instantenously.

To automatically test:

Open /test.html in multiple tabs.

Enter name and roles as student in some and teacher in some.

tabs with student roles will automatically ask random questions every 3 seconds.

tabs with teacher roles will automatically answer 1 question every 3 seconds.


Deployment
----------

Local -

1) Install nodejs and npm ->

Mac:

brew install node

Ubuntu:

sudo apt-get install nodejs

sudo apt-get install npm

2) Download repo ->

git clone

3) Run app ->

Mac:

npm start

Ubuntu:

npm start

Note: if this does not work try 'nodejs server.js'


Heroku -

(https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

heroku login

heroku create

git push heroku master