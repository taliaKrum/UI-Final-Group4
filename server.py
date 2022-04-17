from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from itsdangerous import json
app = Flask(__name__)

lessons = {
    "1":{
        "lesson_id": "1",
        "title": "Cupcake Ingredients",
        "ingredients": ["eggs", "milk", "other stuff", "yep yep"],
        "text": "explanation, description, explain",
        "next_lesson": "2"
    },
    "2":{
        "lesson_id": "2",
        "title": "Make Frosting",
        "ingredients": ["heavy cream", "sugar", "other stuff", "yep yep"],
        "text": "explanation, description, explain",
        "next_lesson": "end"
    }
}

quiz_questions = {
    "1":{
        "question": "placeholder"
    }
}

@app.route('/')
def home():
   return render_template('homepage.html') 

@app.route('/learn/<lesson_id>')
def learn(lesson_id):
    lesson = lessons[lesson_id]
    return render_template('learn.html',lesson = lesson)

#-----------------------------
#QUIZ PART OF THE WEBSITE
@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
    question = quiz_questions[quiz_id]
    return render_template('quiz.html', question = question)

if __name__ == '__main__':
   app.run(debug = True)