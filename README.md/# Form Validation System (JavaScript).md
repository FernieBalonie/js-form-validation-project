# Form Validation System (JavaScript)
A custom front-end validation system built in JavaScript.
This project demonstrates real-world validation logic used in modern web applications.

## Features
- Field-specific validation (name, email, dob, country, postal code, terms).
- Real-time feedback.
- Cross-field validation (e.g., country -> postal code, dob -> age confirmation)
- Error message handling system.

## Project Goals
- Learn and apply JavaScript validation methods.
- Structure and document code professionally.

## Wireframe

---------------------------------------------------------------------------------------
|                            JavaScript Form Validation                               |
|-------------------------------------------------------------------------------------|
| Full Name:  ------- ----------                                                      |
| Email:  -------@------.com                                                          |
| Date of Birth:  -- -- ----                                                          |
| Country:  [ select -> dropdown button ]                                             |
| Postal Code:  --- ---                                                               |
| Terms and Conditions:  [ checkbox ] I agree to T&C.                                 |
|-------------------------------------------------------------------------------------|
|------------------------------------[ SUBMIT ]---------------------------------------|
---------------------------------------------------------------------------------------

## Manual Testing Control and Metrics Tables

-------------------------------------------------------------------------------------
|                                    Full Name                                      |
|-----------------------------------------------------------------------------------|
| Test Case  |   Input   |   Expected Result   |             Pass/Fail              |  
|------------|-----------|---------------------|------------------------------------|  
|  Empty     |    ""     | Red border + error:   |                                  |
|  Input     |           |"Full name is required"|                                  |
|------------|-----------|-----------------------|----------------------------------|
|   Single   |"Fernanda" | Red border + error: |                                    |
|    word    |           | "Please enter your  |                                    |
|            |           | first and last name"|                                    |
|------------|-----------|---------------------|------------------------------------|
| Valid      |"Fernanda  |  Green border +     |                                    |
| Full Name  | Mauri"    |  error disappears   |                                    |
|------------|-----------|---------------------|------------------------------------|
|Extra Spaces|"Fernanda  Mauri"|Green border + error disappears|                    |
|------------|-----------|---------------------|------------------------------------|          
|Invalid     |"Fern@anda |Red can only contain letters,|                            |
|characters  |  Mauri"   |spaces, or hyphens"          |                            |
|------------|-----------|---------------------|------------------------------------|  
|Hyphenated name|"Fernanda-Lima O'Connor"|Green border + error disappears|          |
|------------|-----------|---------------------|------------------------------------|  
| Corrects   |User types valid name| Error disappears immediately |                 |
| error      |after invalid        | + green border               |                 | 
-------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------
|                                    Email                                          |
|-----------------------------------------------------------------------------------|
| Test Case  |   Input   |   Expected Result   |             Pass/Fail              |  
|------------|-----------|---------------------|------------------------------------|  
|  Empty     |    ""     | Red border + error: |                                    |
|  Input     |           | "Email is required" |                                    |
|------------|-----------|---------------------|------------------------------------|
|  Invalid   |"user.com" | Red border + error: |                                    |
|  format    |           |  "Please enter a    |                                    |
|            |           |    valid input"     |                                    |
|------------|-----------|---------------------|------------------------------------|
|  Missing @ |"userdomain.com"|Red error + same error|                              |
|------------|-----------|---------------------|------------------------------------|
| Valid Email|"email@example.com"|Green border + error disappears|                  |
|------------|-----------|---------------------|------------------------------------|          
|Invalid     |"Fern@anda |Red can only contain letters,|                            |
|characters  |  Mauri"   |spaces, or hyphens"          |                            |
|------------|-----------|---------------------|------------------------------------|  
|Hyphenated name|"Fernanda-Lima O'Connor"|Green border + error disappears|          |
|------------|-----------|---------------------|------------------------------------|  
| Corrects   |User fixes invalid| Error disappears immediately |                    |
| error      |email             | + green border               |                    | 
-------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------
|                              Country and Postcode                                 |
|-----------------------------------------------------------------------------------|
| Test Case  |   Input   |   Expected Result   |             Pass/Fail              |  
|------------|-----------|---------------------|------------------------------------|  
|  Empty     |    ""     | Red border + error: |                                    |
|  Input     |           |"Please select a country"|                                |
|------------|-----------|---------------------|------------------------------------|
|  Valid     | "Brazil"  |Green border + error |                                    |
|  country   |           |disappears           |                                    |
|------------|-----------|---------------------|------------------------------------|
|Conditional        |""  |                     |                                    |
|field - Postcode   |    |Red error + same error|                                   |
|empty when required|    |                     |                                    |
|------------|-----------|---------------------|------------------------------------|         
|Conditional field - |   |                     |                                    |
|Post Code filled |123 ABC|                    |                                    |
|when required    |       |                    |                                    |
|------------|------------|--------------------|------------------------------------|  
|Hyphenated name|"Fernanda-Lima O'Connor"|Green border + error disappears|          |
|------------|------------|--------------------|------------------------------------|  
| Corrects   |User fixes invalid| Error disappears immediately |                    |
| error      |email             | + green border               |                    | 
-------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------
|                                       T&C                                         |
|-----------------------------------------------------------------------------------|
| Test Case  |   Input   |   Expected Result   |             Pass/Fail              |  
|------------|-----------|---------------------|------------------------------------|  
| Unchecked  |    ""     |Red border + error:" |                                    |
|            |           |You must accept T&C."|                                    |
|------------|-----------|---------------------|------------------------------------|
|  Checked   |checked field box|Error disappears|                                   |
-------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------
|                                 Date of Birth                                     |
|-----------------------------------------------------------------------------------|
| Test Case  |   Input   |   Expected Result   |             Pass/Fail              |  
|------------|-----------|---------------------|------------------------------------|  
|  Empty     |    ""     | Error:              |                                    |
|  Input     |           |"Please enter your dob"|                                  |
|------------|-----------|---------------------|------------------------------------|
|  Future    |"02/06/2028"|Error: "Please enter|                                    |
|  Date      |           |a valid dob" + no checkbox.|                              |
|------------|-----------|---------------------|------------------------------------|
|Over 100 years old|Error: "You must be younger than 100 years old."|               |
|------------|-----------|---------------------|------------------------------------|         
|            |Select a date|Error: "You must be|                                    |
|  Underage  |less than 16 |at least 16 years old."|                                |
|            |years ago.   |No checkbox appears.|                                   |
|------------|------------|--------------------|------------------------------------|  
| Valid date |Select a date more than |No error + checkbox     |                    |
|            |16 years old and no more|appears "Can you confirm|                    |
|            |than 100 years old.     |you are X years old?"   |                    |
|------------|------------|--------------------|------------------------------------|  
| Exatctly 16|Select a date exactly|No error + Checkbox appears |                   |
| years old. |16 years old today.  |with correct age.           |                   | 
|------------|-----------|---------------------|------------------------------------|
|Change valid|Select a valid DOB ->        |Error message appears.|                 |               
|DOB to      |checkbox appears ->          |Checkbox disappears   |                 | 
|invalid     |change to future or underage.|automatically.        |                 |
|------------|-----------|---------------------|------------------------------------|
|Attempt to  |Valid DOB selected but|Error message: "Please confirm|                |
|submit without|checkbox not ticked.|your age before continuing."  |                |
|confirming. |                      |                              |                |
|------------|-----------|---------------------|------------------------------------|
|Modify DOB      |Tick checkbox, then change|Checkbox resets and |                  |
|after confirming|DOB to another valid date.|updates with new age|                  |
|------------|-----------|---------------------|------------------------------------|
|System date |Temporarily change system date|Age calculation adjusts|               |
|dependency  |to test boundary cases.       |according to system date|              |         
-------------------------------------------------------------------------------------











## Notes
Day 1
- Goals: Start project planning, write features, conditions and goals on README.md, commit changes to github
- Completed: All.
- Tomorrow: start HTML layout and form structure.

Day 2
- Goals: Wireframe, HTML skeleton, validation-ready structure.
- Completed: All.
- Tomorrow: Focus on JavaScript validation logic and test name field.

Day 3
- Goals: Build a JavaScript validation function for name input field.
- Completed: Yes, now need to run manual and unit tests.
- Tomorrow: Add extra fields like contact number, level of education, etc.

Day 4
- Goals: Organise test plan and run first unit tests for name field.
- Completed: No, need to convert files to be able to run unit tests.
- Tomorrow: Convert files and run validation test for name field. Add validation logic for the following input fields.
- Notes: Updated Jest. Found an unexpected error: "File is a CommonJS module; it may be converted to an ES module". 

Day 5
- Goals: Finish organising test plan and run first unit test case with jest for name field. 
- Completed: Yes, also add screenshots of gitbash to README folder. Also organised tests into different files.
- Tomorrow: Start using TDD (Test-Driven Development) - Follow RED - GREEN - REFACTOR cycle - to write unit tests and validation logic for email and dob/age input fields. Apply Mocks and Stubs to DOM handlers.

Day 6
- Goals: Start using TDD (Test-Driven Development) - Follow RED - GREEN - REFACTOR cycle - to write unit tests followed by the validation logic and finally DOM hadlers for input fields. Apply Mocks and Stubs to DOM handlers. Add some of the articles and tutorials I've been reading to bibliography.
- Completed:
- Tomorrow: 


## Ideas
- Make sure accents are allowed.
- Add validation logic for testing hyphens only "- -, -- --" 
- Add extra fields like phone number, right to work, etc.
- Improve UI.


## Bibliography
Article on Format Validation -
https://techdocs.akamai.com/identity-cloud/docs/the-format-validation#:~:text=To%20pass%20validation%2C%20a%20value%20must%20contain,blank%20spaces%2C%20results%20in%20a%20validation%20failure.


