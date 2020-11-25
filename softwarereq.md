## SOFTWARE REQUIREMENTS

**Vision:**  
The vision of this app is to provide users a way to remember moments from their favorite TV show or movie by quizzing their knowledge of memorable quotes. 

## SCOPE  
**In Scope**:  
- This app will provide the user with a simple 5 question quiz where they are asked to correctly guess who said that quote. 
- Users will be given multiple choices for the quiz.
- Users can save their favorite quotes, as well as remove them.

**Out of Scope**:  
This app will not give users the option to pick which specific films/movies they are quizzed on.

## MVP:  
- Call APIs to generate quotes 
- Display quotes to the user in the form of a quiz
- Have a save quote feature that saves a quote to a Saved page (DB)
- Allow the user to write any notes on the Save page (note-taking feature)
- Provide a score to the user and display the score on the High Score page
- Style to aesthetically please


**Stretch Goal:**  
1. Give users a photo stream of characters
2. Do some fancy styling probably. 

## Functional Requirements:
- Users are given a quote from one of various APIs
- Users can guess multiple choice who said it.
- Users can save their favorite quotes.

## Non-Functional Requirements:
Mobile Responsive: this app will need to be functional and viewable on many device sizes.
Accessibility: This had will be accessible and use alt-text.

## Data Flow:
- Users will hit a landing page, where they can chose to take a quiz, or view saved quotes.
- Upon selecting to take the quiz, they'll be given a series of 10 quotes and asked to correctly guess the character name that said the quote. 
- Quotes will be pulled from a number of APIs and displayed to the user at a random order.
- Users will select their choice and will be given their final result at the end of their quiz.
- Users can save their favorite quotes and those quotes will be saved in a database.
