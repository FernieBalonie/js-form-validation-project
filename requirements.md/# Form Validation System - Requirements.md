# Form Validation System - Requirements

This project implements a front-end validation system for a registration form.
It checks that each field input is valid before the form can be submitted.
Validation is done entirely in JavaScript to simulate how a web app would verify user data.

1. Full Name
2. Email Address
3. Date of Birth
4. Country
5. Postal Code
6. Accept Terms and Conditions (checkbox)

-------------------------------------------------------------------------------------------------------------------------------------

  |  Field   |  Type  |  Example (Valid)  |  Example (Invalid)  |                   Validation Rules                                |
  |----------|--------|-------------------|---------------------|-------------------------------------------------------------------| 
  |Full Name |  text  |    "Ben Ward"     |       "Ben"         |         Must contain at least two words (first + last name)       |
  |  Email   | email  |"benward@gmail.com"|    "benward@com"    |           Must match email pattern with '@' and domain            |
  |   DOB    |  date  |    "09/07/1998"   |"12/15/2000" or "20/04/2015"  | Must be a valid date or Must be over 16 years old        |
  | Country  | select |       "UK"        |         ""          |                     Required Selection                            |
  |Postal Code| text  |     "NR1 2AB"     |         "123"       |               Required only if Country = "UK"                     |
  |  Terms   |checkbox|     checked       |       unchecked     |              Must be checked before submission                    |

-------------------------------------------------------------------------------------------------------------------------------------
Validation Logic Notes
- Full Name: split by space -> must have at least two parts.
- Email: use regex to verify pattern.
- DOB: must be a valid date and age must be over 16 (calculate age from date data).
- Country: must not be empty.
- Postal Code: only required if Country == "UK".
- Terms: must be checked.


#Notes

Day 1
- Completed: field list and rules.
- Tomorrow: start HTML layout and form structure.
