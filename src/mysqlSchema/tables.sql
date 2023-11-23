CREATE TABLE organization (
    orgid INT PRIMARY KEY NOT NULL,
    orgName VARCHAR(255) NOT NULL,
    orgaddress VARCHAR(255)
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255),
    age INT,
    address VARCHAR(255),
    orgId INT,
    gender VARCHAR(10),
    email VARCHAR(255),
    userType  VARCHAR(10) CHECK(userType IN ('admin', 'user')),
    password VARCHAR(255),
    FOREIGN KEY (orgId) REFERENCES organization(orgid)
);
