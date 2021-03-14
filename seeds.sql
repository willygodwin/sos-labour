USE project2_development;

INSERT INTO users (user_type,email,password) VALUES
('company','zorzi@zorzi.com.au','$2a$10$g92sB9YAdqUhha5uJcfTpOcST5g30y2lzLWsDL3a/4rWT8qtxsy.K'), -- password: zorzihomes
('company','summithomes@summithomes.com.au','$2a$10$etuJLD29Ws9VYMyXAdoT5u8OIZTpqW74xUluXvYzDBWWK5oN3uOLC'), -- password: summithomes
('labourer','vincent@gmail.com','$2a$10$s1rwa7y3s0Yojnnb9dz4Fuwp1qTh.at..6TmJpIsAG.3K9r5Ywk6S'), -- password: vince
('labourer','will@gmail.com','$2a$10$B6B8bpbtEwGvdymEbQ7xdeKXw/FRTl9xs9thBss4rtAJi7idvJgaS'), -- password: will
('labourer','naresh@gmail.com','$2a$10$TFrvxvL3Vtbt4IRvianc4.pbbvMvj50u76RESOsKhhPAFrBDhbqmy'), -- password: naresh
('labourer','ayshaa@gmail.com','$2a$10$Tevp.DcxsdAQ4MUN546EouY4lBDbIO2o2evt8UhTPq5sLV3XBOnPi'); -- password: aysha


INSERT INTO companies (company_name,abn,UserId) VALUES
('zorzi homes','40066571426',1),
('summit homes','62579898646',2);


INSERT INTO labourers (first_name,last_name,dob,driver_license,whitecard,skills_experience,UserId, img_reference) VALUES
('vincent','sumargo','16-04-1992','123456789','10001000','bricklaying for 5 years',3, "burger.jpg"),
('william','godwin','01-01-1992','987654321','10002000','roofing and tiling for 5 years',4, 'IMG-0476.jpg'),
('naresh','rajmandu','02-02-1975','112233445','10003000','gypsum and plasterboard for 5 years',5, "burger.jpg"),
('ayshaa','jacintha','03-03-1988','667788990','10004000','electrical and plumbing for 5 years',6, 'IMG-0476.jpg');

INSERT INTO jobs (address,suburb,city,state,postcode,site_manager,start_date,end_date,number_of_labourers,CompanyId) VALUES
('27 macleod road', 'applecross', 'perth','WA','6153','cameron smith','2021-03-15','2021-03-16',1,1),
('29 macleod road', 'applecross','perth','WA','6153','collin max','2021-03-21','2021-03-25',2,1),
('81 ardross street', 'applecross','perth','WA','6153','rory mcilroy','2021-03-10','2021-03-11',3,2),
('99 ardross street', 'applecross','perth','WA','6153','kevin na','2021-04-10','2021-04-11',4,2);

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
