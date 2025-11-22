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
| Phone Number: (country code) phone number                                           |
| Date of Birth:  -- -- ----                                                          |
| Gender: (X) female () male () other                                                 |
| Country:  [ select -> dropdown button ]                                             |
| Postal Code:  --- ---    (only if country is UK)                                    |
| Terms and Conditions:  [ checkbox ] I agree to T&C.                                 |
|-------------------------------------------------------------------------------------|
|---------------------------------[ SUBMIT ]------------------------------------------|
---------------------------------------------------------------------------------------




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
- Completed: Not all, but completed all fields and they all passed unit tests.
- Tomorrow: Add new input fields.

Day 7
- Goals: Add phone number and gender input fields.
- Completed:
- Tomorrow:



## Ideas
- Make sure accents are allowed.
- Add validation logic for testing hyphens only "- -, -- --" 
- Add extra fields like phone number, gender, etc. Make sure I test all sorts of input types.
- Improve UI and UX.
- Create a file for Bibliography only for better organisation.



## Bibliography
Article on Format Validation -
https://techdocs.akamai.com/identity-cloud/docs/the-format-validation#:~:text=To%20pass%20validation%2C%20a%20value%20must%20contain,blank%20spaces%2C%20results%20in%20a%20validation%20failure.


