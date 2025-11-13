# Form Validation System - Requirements

This project implement multiple validation approaches for a registration form.
It checks that each field input is valid before the form can be submitted following TDD principles.


## Test Plan

List of test requirements:
- Manual Static Testing (Check OOP principles, naming conventions, modularity, comments and documentation; and reviewing logic) []
- Manual Dynamic Testing (Manually simulate user behaviour on a webpage in different browsers) []
- Integration Testing (Dynamic Testing) []
- Unit Testing with Jest (Automated Functional and Dynamic Testing) []
- Usability Testing using Google Lighthouse, and a few friends (Evaluate usability, clarity and user experience) []
- Regression Testing (Ensures that new code changes do not break existing functionality) []
- E2E Testing using Cypress (Dynamic Testing) []
- White Box Testing Application (Ensure every part of the code is there for a reason and is functional) []
- System Testing (Dynamic Testing) - after completing the project []
- Acceptance Testing (Following Project Rubric) []
- IF I HAVE ENOUGH TIME - Mutation Testing (Checks if unit tests are strong enough by intentionally breaking the code) []



1. Full Name
2. Email Address
3. Date of Birth
4. Country
5. Postal Code
6. Accept Terms and Conditions (checkbox)

-------------------------------------------------------------------------------------------------------------------------------------

  |  Field   |  Type  |  Example (Valid)  |  Example (Invalid)  |                   Validation Rules                                |
  |----------|--------|-------------------|---------------------|-------------------------------------------------------------------| 
  |Full Name |  text  |    "Ben Ward"     |       "Ben"         |        Musn't be empty.                                           |
  |          |        |                   |                     |        Must contain at least two words (first + last name),       |
  |          |        |                   |                     |        Musn't contain non-alphanumeric characters (except - and ')| 
  |          |        |                   |                     |        numbers.                                                   |
  |          |        |                   |                     |        Must contain at least one whitespace space character.      |
  |          |        |                   |                     |                                                                   |
  |  Email   | email  |"benward@gmail.com"|    "benward@com"    |        Musn't be empty.                                           |
  |          |        |                   |                     |        Must match email pattern with '@' and domain.              |
  |          |        |                   |                     |                                                                   |
  |   DOB    |  date  |    "09/07/1998"   |   "12/15/2000" or   |        Musn't be empty.                                           |
  |          |        |                   |     "20/04/2015"    |        Must be a valid date or Must be over 16 years old          |
  |          |        |                   |                     |                                                                   |
  | Country  | select |       "UK"        |          ""         |        Required Selection. (Musn't be empty.)                     |
  |          |        |                   |                     |                                                                   |
  |Postal Code| text  |     "NR1 2AB"     |         "123"       |               Required only if Country = "UK".                    |
  |          |        |                   |                     |                                                                   |
  |  Terms   |checkbox|     checked       |       unchecked     |              Must be checked before submission.                   |

-------------------------------------------------------------------------------------------------------------------------------------

List of test requirements:
- Manual Testing []
- Unit testing with Jest []
- 



