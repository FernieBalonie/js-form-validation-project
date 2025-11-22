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
|Invalid     |"Fern@anda |Red border + error: "Name|                                |
|characters  |  Mauri"   |can only contain letters,|                                |
|            |           |spaces, or hyphens"      |                                |
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
