## SOFTWARE REQUIREMENTS

**Vision:**  
The vision for this product is to give the user easy, concise information, about specific characters in media. This addresses a pain point of keeping track of characters in a single TV show, video game, movie, or book.  

This product ultimately helps answer a question we’ve all asked;  
**“Who was that person from the thing with that guy in it?”**

## SCOPE  
**In Scope**:  
The app will provide a single search bar to quickly search a name across major media platforms - TV, movies, video games, comics, and books.
The app will allow users to save selected characters and write their own note.
Users will be able to add and remove saved characters and edit their notes as they see fit.

**Out of Scope**:  
This app will not give you detailed information about characters or their stories
Users won’t be protected from possible spoilers.

**MVP:**  
- Take in a name
- Call APIs
- Return every instance of the search
- Display to front end
- Writing to a DB
- Style to aesthetically please

**Stretch Goal:**  
1. Give users the ability to create their own files for their saved items.
2. Give users a photo stream of iterations of that character.
3. Do some fancy styling probably. 

**Functional Requirements:**  
- Users can search, save, and delete a character reference.
- Users can quickly see bullet information of a character reference.

**Data Flow:**  
	“T-800 was in all the Terminator films”  
	“No they weren’t.”  
	“Look it up on that cheshire cat web app that uses multiple APIs - Who Are You”  
	*types in “T-800”  
	“See - T-800 was only in Terminator, Judgement Day, Rise of….oh yes they were in all the Terminator films - I concede my argument.”  
	“I’m happy with this outcome and use of this web app”  


- A user will make a search request by typing in the characters name into the search bar. 
- That request will be sent out to the APIs we're using to search for a reference to that character's name across multiple storylines/multiverse.
- The app will return a list of appearances of the characters
- Users will then be able to add notes and save that character information for later reference.
- Users can delete saved character data when that character dies or they don’t care anymore.

**Non-Functional Requirements:**  
Mobile Responsive: this app will need to be functional and viewable on many device sizes.
Accessibility: This had will be accessible and use alt-text.
