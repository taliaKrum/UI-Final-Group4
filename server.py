from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from itsdangerous import json
app = Flask(__name__)

lessons = {
    "1":{
        "lesson_id": "1",
        "title": "First, Let's Pick The Cupcake Ingredients We Need!",
        "items": ["all-purpose flour", "eggs", "milk", "baking powder", "salt", "unsalted butter", "sugar", "vanilla extract"],
        "text": "",
        "image":"https://natashaskitchen.com/wp-content/uploads/2020/05/Vanilla-Cupcakes-728x485.jpg",
        "next_lesson": "2",
        "prev_lesson": "1",
        "extra_images": []
    },
    "2":{
        "lesson_id": "2",
        "title": "Step 1 - Mix Ingredients",
        "items": ["Bowl 1: Flour, baking powder, and salt.", "Bowl 2: Butter and sugar."],
        "text": "Beat with an electric mixer on medium-high speed 5 minutes until thick and fluffy.",
        "image":"https://www.wseetonline.com/rs/wp-content/uploads/2022/02/0764612a67bae5342d7f57abda5c78b0.jpg",
        "next_lesson": "3",
        "prev_lesson": "1",
        "extra_images": ["../static/flour.jpeg", "../static/bakingPowder.png", "../static/salt.png",  "../static/butter.jpeg", "../static/sugar.png"]
    },
    "3":{
        "lesson_id": "3",
        "title": "Step 2 - Beat  other ingredients",
        "items": ["1. Bowl 1 from last step","2. Bowl 2 from last step","3. Add 3 eggs", "4. Add 2 tsp vanilla","5. Add flours in bowl 1", "6. Add ½ cup milk"],
        "text": "Beat well between additions.",
        "image":"https://www.orange.nsw.gov.au/gallery/wp-content/uploads/2021/12/SUNDAY-STASH-APRIL-Pancake-Mix-process-1-100419-dL2vyi.tmp_.jpg",
        "next_lesson": "4",
        "prev_lesson": "2",
        "extra_images": []
    },
    "4":{
        "lesson_id": "4",
        "title": "Step 3 - Baking time! ",
        "items": ["1. Pour butter into tins", "2. Filling ⅔ full", "3. 350˚F 20 mins", "4. Remove to rack to cool"],
        "text": "Note: Don't Overfill - Fill cupcake liners 2/3 full or they will overflow and cause a muffin top.",
        "image":"https://thumbs.dreamstime.com/b/freshly-baked-cupcakes-oven-freshly-baked-cupcakes-oven-103971786.jpg",
        "next_lesson": "5",
        "prev_lesson": "3",
        "extra_images": []
    },
    "5":{
        "lesson_id": "5",
        "title": "How to decorate your cupcake? - Cupcake Frosting",
        "items": ["8 oz cream cheese", "2 cups sugar", "1 1/2 cups heavy whipping cream"],
        "text": "",
        "image":"https://www.thespruceeats.com/thmb/42NhT-_5EuXlkGyZ4cW82VwbwX4=/3042x2028/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-cream-cheese-frosting-recipe-3378246-step-06-7dab8ba1580342ccbcb0032f76b6fe9f.jpg",
        "next_lesson": "6",
        "prev_lesson": "4",
        "extra_images": []
    },
    "6":{
        "lesson_id": "6",
        "title": "3 Steps to make cupcake frosting",
        "items": ["Beat the cold heavy cream.", "Beat cream cheese and powdered sugar", "Gently fold the whipped cream into the cream cheese mix."],
        "text": "",
        "image":"https://blog.wilton.com/wp-content/uploads/2020/02/how-to-make-cupcakes-from-scratch.jpg",
        "next_lesson": "7",
        "prev_lesson": "5",
        "extra_images": []
    },
    "7":{
        "lesson_id": "7",
        "title": "Now it's time to decorate your cupcake in your way!",
        "items": [],
        "text": "",
        "image":"https://images-gmi-pmc.edge-generalmills.com/72d522ef-cf29-47e6-81cf-74c7486d24f5.jpg",
        "next_lesson": "7",
        "prev_lesson": "6",
        "extra_images": []
    }
}

quiz_questions = {
    "1":{
        "question_id": "1",
        "title": "Step 1: Drag ingredients into the right bowl!",
        "Bowl1":["Flour", "Baking powder", "Salt"],
        "Bowl2": ["butter", "sugar"],
        "image":"https://www.wseetonline.com/rs/wp-content/uploads/2022/02/0764612a67bae5342d7f57abda5c78b0.jpg",
        "next_quiz": "2",
        "prev_quiz": "1"
    },
    "2":{
        "question_id": "2",
        "title": "What to do with butter?",
        "items":["Butter can be directly used after taking out from refrigerator.", "Use microwave to melt butter to liquid.", "Beat the butter until thick and fluffy."],
        "text": "",
        "image": "https://www.orange.nsw.gov.au/gallery/wp-content/uploads/2021/12/SUNDAY-STASH-APRIL-Pancake-Mix-process-1-100419-dL2vyi.tmp_.jpg",
        "next_quiz": "3",
        "prev_quiz": "1"
    },
    "3":{
        "question_id": "3",
        "title": "End of Quiz",
        "items":[],
        "text": "",
        "image": "https://thumbs.dreamstime.com/b/freshly-baked-cupcakes-oven-freshly-baked-cupcakes-oven-103971786.jpg",
        "next_quiz": "4",
        "prev_quiz": "2"
    },
    "4":{
        "question_id": "4",
        "title": "First question",
        "items":[],
        "text": "",
        "image": "",
        "next_quiz": "5",
        "prev_quiz": "3"
    },
    "5":{
        "question_id": "5",
        "title": "First question",
        "items":[],
        "text": "",
        "image": "",
        "next_quiz": "6",
        "prev_quiz": "3"
    },
}

#user quiz answer tracker 
tracker = 0

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
    return render_template('quiz.html', question = question, tracker=tracker)

@app.route('/add_correct', methods=['GET', 'POST'])

def add_correct():
    global tracker 
    tracker += 1
    return tracker

@app.route('/reset_tracker', methods=['GET', 'POST'])

def reset_tracker():
    global tracker 
    tracker = 0
    return tracker

if __name__ == '__main__':
   app.run(debug = True)