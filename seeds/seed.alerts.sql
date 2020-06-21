INSERT INTO alerts
("current","expired","urgency","datePosted","dateExpire","to","toUserId","from","fromUserId","groupId","alertMessage")
VALUES
    (false,true,'low','12/20/2019','1/1/2020','Bobs, Inc',2,'Monsters, Inc',1,1,'This is an expired low test alert'),
    (true,false,'high','1/1/2020','1/20/2020',null,null,'Monsters, Inc',1,1,'This is an active high test alert');
