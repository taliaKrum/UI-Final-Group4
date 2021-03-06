from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
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
        "extra_images": ["../static/flour.jpeg", "../static/eggs.png", "../static/milk.png", "../static/bakingPowder.png", "../static/salt.png", "../static/butter.jpeg", "../static/sugar.png", "../static/vanilla.png"]
    },
    "2":{
        "lesson_id": "2",
        "title": "Step 1 - Mix Ingredients",
        "items": ["<b>Bowl 1:</b> Flour, baking powder, and salt.", "<b>Bowl 2:</b> Butter and sugar."],
        "text": "Note: <b>Beat with an electric mixer</b> on medium-high speed for <b>5 minutes</b> until thick and fluffy.",
        "image":"https://www.wseetonline.com/rs/wp-content/uploads/2022/02/0764612a67bae5342d7f57abda5c78b0.jpg",
        "next_lesson": "3",
        "prev_lesson": "1",
        "extra_images": ["../static/flour.jpeg", "../static/bakingPowder.png", "../static/salt.png",  "../static/butter.jpeg", "../static/sugar.png"]
    },
    "3":{
        "lesson_id": "3",
        "title": "Step 2 - Beat  other ingredients",
        "items": ["1. <b>Bowl 1</b> from last step","2. <b>Bowl 2</b> from last step","3. Add <b>3 eggs</b> to Bowl 2", "4. Add <b>2 tsp vanilla</b> to Bowl 2","5. Pour Bowl 1 into Bowl 2", "6. Add <b>½ cup milk</b>"],
        "text": "Note: Beat well between additions.",
        "image":"https://www.orange.nsw.gov.au/gallery/wp-content/uploads/2021/12/SUNDAY-STASH-APRIL-Pancake-Mix-process-1-100419-dL2vyi.tmp_.jpg",
        "next_lesson": "4",
        "prev_lesson": "2",
        "extra_images": ["../static/step1-bowl.png", "../static/step2-bowl.png", "../static/eggs-bowl.png", "../static/vanilla-bowl.png", "../static/flour-bowl.png", "../static/milk-bowl.png"]
    },
    "4":{
        "lesson_id": "4",
        "title": "Step 3 - Baking time! ",
        "items": ["1. Pour butter into tins", "2. Filling ⅔ full", "3. 350˚F 20-23 mins", "4. Remove to rack to cool"],
        "text": "Note: Don't Overfill - Fill cupcake liners 2/3 full or they will overflow and cause a muffin top.",
        "image":"https://thumbs.dreamstime.com/b/freshly-baked-cupcakes-oven-freshly-baked-cupcakes-oven-103971786.jpg",
        "next_lesson": "5",
        "prev_lesson": "3",
        "extra_images": []
    },
    "5":{
        "lesson_id": "5",
        "title": "How to decorate your cupcake? - Cupcake Frosting",
        "items": ["Heavy Whipping Cream (1 1/2 cups)", "Cream Cheese (8 oz)", "Sugar (2 cups)"],
        "text": "Your shopping list: ",
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
        "title": "Drag ingredients into the right bowl!",
        "Bowl1":["Flour", "Baking powder", "Salt"],
        "Bowl2": ["Butter", "Sugar"],
        "image":"https://www.wseetonline.com/rs/wp-content/uploads/2022/02/0764612a67bae5342d7f57abda5c78b0.jpg",
        "next_quiz": "2",
        "prev_quiz": "1"
    },
    "2":{
        "question_id": "2",
        "title": "What to NOT beat in making cupcake frosting?",
        "items":["Beat the cold heavy cream.", "Beat cream cheese and powdered sugar.", "Beat whipped cream and cream cheese mix."],
        "text": "",
        "image": "https://www.thespruceeats.com/thmb/42NhT-_5EuXlkGyZ4cW82VwbwX4=/3042x2028/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-cream-cheese-frosting-recipe-3378246-step-06-7dab8ba1580342ccbcb0032f76b6fe9f.jpg",
        "next_quiz": "3",
        "prev_quiz": "1"
    },
    "3":{
        "question_id": "3",
        "title": "Write correct ingredients for cupcakes",
        "items":["Mixed flours", "Milk", "Eggs", "Vanilla extract", "Pepper", "Cheese", "Rice", "Potatoes", "Basil", "Starch", "Onion"],
        "text": "",
        "image": "https://natashaskitchen.com/wp-content/uploads/2020/05/Vanilla-Cupcakes-728x485.jpg",
        "next_quiz": "4",
        "prev_quiz": "2"
    },
    "4":{
        "question_id": "4",
        "title": "Question 4: What's the required temperature and baking time for cupcake?",
        "items":["400˚F, 15-20 minutes","375˚F, 10-15 minutes", "350˚F, 20-23 minutes"],
        "text": "",
        "image": "https://thumbs.dreamstime.com/b/freshly-baked-cupcakes-oven-freshly-baked-cupcakes-oven-103971786.jpg",
        "next_quiz": "5",
        "prev_quiz": "3"
    },
    "5":{
        "question_id": "5",
        "title": "End of Quiz",
        "items":[],
        "text": "",
        "image": "https://hips.hearstapps.com/del.h-cdn.co/assets/18/07/1518475314-vanilla-cupcake-horizontal-.jpg",
        "next_quiz": "6",
        "prev_quiz": "3"
    },
}
counting_tracker = [
    {  "quiz": 1,
       "url": '/learn/2',
       "name": "Mixing of ingredients"
    },
    {  "quiz": 2,
       "url": '/learn/6',
       "name": "Correct ingredients for cupcakes"

    },
    {  "quiz": 3,
       "url": '/learn/1',
       "name": "Correct ingredients for cupcakes"

    },
    {  "quiz": 4,
       "url": '/learn/4',
       "name": "Required temperature and baking time for cupcake"
    }
]



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
    return render_template('quiz.html', question = question, counting_tracker=counting_tracker)

@app.route('/add_correct', methods=['GET', 'POST'])

def add_correct():
    json_data = request.get_json()
    quiz = json_data["quiz"]
    for i in range(len(counting_tracker)):
        if counting_tracker[i]["quiz"] == quiz:
            counting_tracker.pop(i)
            break
    return {"data": (4 - len(counting_tracker))}

@app.route('/reset_tracker', methods=['GET', 'POST'])

def reset_tracker():
    counting_tracker.clear()
    counting_tracker.append(
    {  "quiz": 1,
       "url": '/learn/2',
       "name": "Mixing of ingredients"
    })
    counting_tracker.append(
    {  "quiz": 2,
       "url": '/learn/6',
       "name": "Correct ingredients for cupcakes"
    })
    counting_tracker.append(
   {  "quiz": 3,
       "url": '/learn/1',
       "name": "Correct ingredients for cupcakes"
    })
    counting_tracker.append(
      {  "quiz": 4,
       "url": '/learn/4',
       "name": "Required temperature and baking time for cupcake"
    }
  )
  
    return {"data": (4 - len(counting_tracker))}

if __name__ == '__main__':
   app.run(debug = True)