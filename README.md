# TLX

### Table of Contents

- [Live](#Live)
- [Description](#Description)
- [Endpoints](#Endpoints)
- [Technologies](#Technologies)
- [Author](#Author)

---

## Live

[Live Site] - https://tlxs.herokuapp.com/

#### Login
   - To log in click demo on sign in screen.

---

## Description

This app was created to give tenants and property managers a single place to exchange.
Specifically, tenants and property managers can converse through messages, as well as manage billing
and account information. Communications are saved in the database for record preservation.

---

## Endpoints

#### Endpoint
    https://boiling-dawn-55684.herokuapp.com
    
#### Endpoint Example
    https://boiling-dawn-55684.herokuapp.com/bills/:user

#### /bills/:user
   - All endpoints require JWT Authorization
   - Get Endpoint 
        - Accepts a user id, searches database and returns all bills for user.
        
        ##### Returns JSON :
            {
                "userBills": [
                    {
                        "billId": 1,
                        "tenant": "Bob Builders, Inc",
                        "tenantId": 2,
                        "manager": "Monsters, Inc",
                        "managerId": 1,
                        "rentFor": "May 2020",
                        "dueDate": "April 15, 2020",
                        "totalDue": 2500,
                        "pastDue": 200,
                        "basicRent": 1800,
                        "water": 200,
                        "maintenance": 300,
                        "amountPaid": 0,
                        "paidDate": "April 1, 2020",
                        "status": "Outstanding",
                        "paidWith": "null",
                        "groupId": 1
                    }
                ],
                "status": 200
            } 
               
#### /contacts/:user
   - All endpoints require JWT Authorization
   - Get Endpoint
        - Accepts a user id and return all contact information for property manager and user.
            
        ##### Returns JSON :
            {
                "userContactInfo": [
                    {
                        "userid": 2,
                        "company": "Bob Builders, Inc",
                        "street": "1234 W. South St. #120",
                        "city": "Phoenix",
                        "state": "AZ",
                        "zip": "80000",
                        "email": "Bob@BobTheBuilder.com",
                        "phone": "602-123-1232",
                        "password": "$2a$12$STa4F/trWEj4BisKbAN3W.Iv1ioOeeleQOBihI0r1YTu.TT4IvVUW",
                        "role": "tenant",
                        "managerName": "Monsters, Inc",
                        "managerId": 1,
                        "groupId": 1
                    }
                ],
                "userManagerInfo": [
                    {
                        "userid": 1,
                        "company": "Monsters, Inc",
                        "street": "1234 W. South St. #100",
                        "city": "Phoenix",
                        "state": "AZ",
                        "zip": "85032",
                        "email": "Sully@MonstersInc.com",
                        "phone": "602-123-7894",
                        "password": "$2a$12$iYNlzEDG.9Uhywca3Pc4me6PBvU1cuwqKppREMgr.Hl89xQArfxLS",
                        "role": "manager",
                        "managerName": "Monsters, Inc",
                        "managerId": 1,
                        "groupId": 1
                    }
                ],
                "status": 200
            }
    
   - Put Endpoint
        - Updates all user information except for password. Returns updated information to front end.  
        
        ##### Accepts JSON :
            {
                "company": "Bobs, Inc",
                "street": "1234 W. South St. #130",
                "city": "Phoenix",
                "state": "AZ",
                "zip": "81111",
                "email": "Bob@BobTheBuilder.com",
                "phone": "602-123-4567",
                "role": "Tenant",
                "managerName": "Monsters, Inc",
                "managerId": 1,
                "groupId": 1
            }
            
        ##### Returns JSON :
            {
                "userContactInfo": [
                    {
                        "userid": 2,
                        "company": "Bobs, Inc",
                        "street": "1234 W. South St. #130",
                        "city": "Phoenix",
                        "state": "AZ",
                        "zip": "81111",
                        "email": "Bob@BobTheBuilder.com",
                        "phone": "602-123-4567",
                        "password": "$2a$12$STa4F/trWEj4BisKbAN3W.Iv1ioOeeleQOBihI0r1YTu.TT4IvVUW",
                        "role": "tenant",
                        "managerName": "Monsters, Inc",
                        "managerId": 1,
                        "groupId": 1
                    }
                ],
                "status": 200,
                "message": "Contact information updated successfully."
            }

#### /contacts/pass/:user
   - All endpoints require JWT Authorization
   - Put Endpoint 
        - Accepts a user id and updates password for user.
        
        ##### Accepts JSON :
            {
                "password": "test"
            }
            
#### /messages/:user
   - All endpoints require JWT Authorization
   - Get EndPoint
        - Gets all message for a given user. Will separate between all message, sent and received.
        
        ##### Returns JSON :
            {
                "inboxMessages": [
                    {
                        "messageid": 2,
                        "date": "March 20, 2020",
                        "to": "Bob Builders, Inc",
                        "toUserId": 2,
                        "from": "Monsters, Inc",
                        "fromUserId": 1,
                        "subject": "Build out",
                        "subjectId": 1,
                        "messageContent": "Hi Bob, No.",
                        "groupId": 1
                    },
                ],
                "sentMessages": [
                    {
                        "messageid": 1,
                        "date": "March 19, 2020",
                        "to": "Monsters, Inc",
                        "toUserId": 1,
                        "from": "Bob Builders, Inc",
                        "fromUserId": 2,
                        "subject": "Build out",
                        "subjectId": 1,
                        "messageContent": "Hi Sully, We wanted to know if its ok to knock down the wall?",
                        "groupId": 1
                    }
                ],
                "allMessages": [
                    {
                        "messageid": 2,
                        "date": "March 20, 2020",
                        "to": "Bob Builders, Inc",
                        "toUserId": 2,
                        "from": "Monsters, Inc",
                        "fromUserId": 1,
                        "subject": "Build out",
                        "subjectId": 1,
                        "messageContent": "Hi Bob, No.",
                        "groupId": 1
                    },
                    {
                        "messageid": 1,
                        "date": "March 19, 2020",
                        "to": "Monsters, Inc",
                        "toUserId": 1,
                        "from": "Bob Builders, Inc",
                        "fromUserId": 2,
                        "subject": "Build out",
                        "subjectId": 1,
                        "messageContent": "Hi Sully, We wanted to know if its ok to knock down the wall?",
                        "groupId": 1
                    }
                ],
                "status": 200
            }
            
   - Post Endpoint
        - Posts a new message to DB 
        
        ##### Accepts JSON :
            {
                "date": "4/4/2020",
                "to": "Bob Builders, Inc",
                "toUserId": 2,
                "from": "Monsters, Inc",
                "fromUserId": 1,
                "subject": "Question on rent",
                "subjectId": 1,
                "messageContent": "dah dah dah dah",
                "groupId": 1
            }

#### /registration/new
   - Get EndPoint
        - searches db and returns all property managers.
            
        ##### Returns JSON :
            {
                "managerList": [
                    {
                        "userid": 4,
                        "company": "Lighting McQueen, LLC",
                        "street": "1 W. North St. #1",
                        "city": "Radiator Springs",
                        "state": "AZ",
                        "zip": "85032",
                        "email": "DocHudson@LightingMcQueen.com",
                        "phone": "480-745-1278",
                        "password": "slingshot",
                        "role": "manager",
                        "managerName": "Lighting McQueen, LLC",
                        "managerId": 4,
                        "groupId": 2
                    }
                ],
                "status": 200
            }
            
   - Post Endpoint
        - Creates a new user. 
        
        ##### Accepts JSON :
            
            {
                "company": "Bob Builders, Inc",
                "street": "1234 W. South St. #120",
                "city": "Phoenix",
                "state": "AZ",
                "zip": "85302",
                "email": "Bob@BobTheBuilder.com",
                "phone": "602-789-1234",
                "password": "aPassW0rd",
                "role": "tenant",
                "managerName": "Monsters, Inc",
                "managerId": 1,
                "groupId": 1
            }
            
#### /auth/login
   - Post Endpoint 
        - Used in order to login and accepts a username and password. The password is a hashed JWT token. Returns the 
        user id and JWT session token.
        
        ##### Accepts JSON :
            {
            "email": "Bob@BobTheBuilder.com",
            "password": "aPassW0rd"
            }
            
        ##### Returns JSON :
            {
                "dbUser": {
                    "userid": 2,
                    "company": "Bobs, Inc",
                    "street": "1234 W. South St. #130",
                    "city": "Phoenix",
                    "state": "AZ",
                    "zip": "81111",
                    "email": "Bob@BobTheBuilder.com",
                    "phone": "602-123-4567",
                    "password": "$2a$12$STa4F/trWEj4BisKbAN3W.Iv1ioOeeleQOBihI0r1YTu.TT4IvVUW",
                    "role": "tenant",
                    "managerName": "Monsters, Inc",
                    "managerId": 1,
                    "groupId": 1
                },
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODc5NDEwNzksImV4cCI6MTU4Nzk0Mjg3OSwic3ViIjoiQm9iQEJvYlRoZUJ1aWxkZXIuY29tIn0.XHi3LweC4B3amt-i1LRdyuiydKWcGFo_SBtE0ocDa1w",
                "message": 200
            }

---

## Technologies

#### Front-End

- React.js
- RESTful api
- Context
- React-Router

#### Back-End

- Node.js
- Express
- KNEX
- PostgreSQL

#### Testing

- Jest
- Mocha
- Chai
- Chai-http

## Author

- Jon Kimmel - Front and Back-End
- Website - www.JonathonKimmel.com

[Back To Top](#TLX)
