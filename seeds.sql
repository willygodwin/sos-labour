USE project2_development;

INSERT INTO users (user_type,username,password) VALUES
('company','zorzi@zorzi.com.au','zorzihomes'),
('company','summithomes@summithomes.com.au','summithomes'),
('labourer','vincent@gmail.com','vincentsumargo'),
('labourer','will@gmail.com','willgodwin'),
('labourer','naresh@gmail.com','naresh1234'),
('labourer','ayshaa@gmail.com','ayshaa6789'),


INSERT INTO companies (company_name,abn,UserId) VALUES
('zorzi homes','40066571426',1),
('summit homes','62579898646',2);


INSERT INTO labourers (first_name,last_name,dob,driver_license,whitecard,skills_experience,UserId) VALUES
('vincent','sumargo','16-04-1992','123456789','10001000','bricklaying for 5 years',3),
('william','godwin','01-01-1992','987654321','10002000','roofing and tiling for 5 years',4),
('naresh','rajmandu','02-02-1975','112233445','10003000','gypsum and plasterboard for 5 years',5),
('ayshaa','jacintha','03-03-1988','667788990','10004000','electrical and plumbing for 5 years',6);

INSERT INTO jobs (address,site_manager,start_date,end_date,number_of_labourers,CompanyId) VALUES
('27 macleod road, applecross,WA,6153','cameron smith','15-03-2021','16-03-2021',1,1),
('29 macleod road, applecross,WA,6153','collin max','18-03-2021','25-03-2021',2,1),
('81 ardross street, applecross,WA,6153','rory mcilroy','10-03-2021','11-03-2021',3,2),
('99 ardross street, applecross,WA,6153','kevin na','10-03-2021','11-03-2021',4,2);

INSERT INTO applieds (JobId,UserId) VALUES
(1,3),
(1,4),
(2,3),
(2,4),
(2,5),
(2,6),
(3,3),
(3,4),
(3,5),
(3,6),
(4,3),
(4,4),
(4,5),
(4,6);
