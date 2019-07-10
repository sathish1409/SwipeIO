##############################################################################################################################################|
drop database if exists swipeio;
create database swipeio;
use swipeio;
drop table if exists Employee;
drop table  if exists Main_swipe;
drop table if exists Cards;
drop table if exists Temp_card_log;
drop table if exists Gate;
drop table if exists Leave_description;
drop table if exists Leave_log;
drop table if exists incharge_log;
drop table if exists swipeio_config;


CREATE TABLE Cards (
    card_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    card_number VARCHAR(8) UNIQUE,
    updated_on DATETIME,
    created_on DATETIME,
    is_delete BIT DEFAULT 0
);
                    
CREATE TABLE Employee (
    emp_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    emp_number VARCHAR(10) UNIQUE NOT NULL,
    emp_name VARCHAR(25),
    email VARCHAR(50) NOT NULL,
    card_id INT,
    is_admin BIT,
    is_contract BIT,
    pass_word VARCHAR(20),
    created_on DATETIME,
    updated_on DATETIME,
    is_delete BIT DEFAULT 0,
    FOREIGN KEY (card_id)
        REFERENCES Cards (card_id)
);
                        
CREATE TABLE Gate (
    gate_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gate_name VARCHAR(20),
    updated_on DATETIME,
    created_on DATETIME,
    is_delete BIT DEFAULT 0
);
                    
CREATE TABLE Main_swipe (
    date_log DATE,
    time_log TIME,
    inorout BIT,
    emp_id INT,
    gate_id INT,
    card_id INT,
    remarks VARCHAR(50),
    PRIMARY KEY (date_log , time_log , emp_id),
    FOREIGN KEY (emp_id)
        REFERENCES Employee (emp_id),
    FOREIGN KEY (gate_id)
        REFERENCES Gate (gate_id),
    FOREIGN KEY (card_id)
        REFERENCES Cards (card_id)
);
                        
CREATE TABLE Temp_card_log (
    temp_card_log_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    date_of_usage DATE,
    emp_id INT,
    card_id INT,
    FOREIGN KEY (emp_id)
        REFERENCES Employee (emp_id),
    FOREIGN KEY (card_id)
        REFERENCES Cards (card_id)
);
                            
CREATE TABLE Leave_description (
    leave_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    leave_name VARCHAR(25),
    updated_on DATETIME,
    created_on DATETIME,
    is_delete BIT DEFAULT 0
);
                                
CREATE TABLE Leave_log (
    leave_log_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    from_date DATE,
    to_date DATE,
    emp_id INT,
    leave_id INT,
    FOREIGN KEY (emp_id)
        REFERENCES Employee (emp_id),
    FOREIGN KEY (leave_id)
        REFERENCES Leave_description (leave_id)
);
                        
CREATE TABLE Incharge_log (
    incharge_log_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    emp_id INT,
    incharge_id INT,
    is_delete BIT DEFAULT 0
);
                            
CREATE TABLE swipeio_config (
    config_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR(50),
    value VARCHAR(100)
);

CREATE TABLE auto_import_logs (
    auto_import_log_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    auto_import_log VARCHAR(30),
    log_date_time datetime
);

############################################################################################################
########################################       Auto Import Log      ########################################
############################################################################################################

drop procedure insert_auto_import_log;
delimiter //
create procedure insert_auto_import_log	(
									in auto_import_log1 VARCHAR(30)
								)
	begin
		insert into auto_import_logs (auto_import_log,log_date_time) 
					values (auto_import_log1,now());
	end //
delimiter ;

#call insert_auto_import_log('File Imported');

#select * from auto_import_logs;
                 
############################################################################################################
########################################       Configurations        #######################################
############################################################################################################

##drop procedure get_config;
delimiter //
create procedure get_config	(
									in description1 varchar(50)
								)
	begin
		select * from swipeio_config where description=description1;
	end //
delimiter ;

call get_config('auto_import_path');


############################################################################################################
######################################## Cards Stored Procedures ###########################################
############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure insert_card;
delimiter //
create procedure insert_card	(
									in card_number1 varchar(8)
								)
	begin
		insert into Cards (card_number,created_on) 
					values (card_number1,now());
	end //
delimiter ;


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

##drop procedure delete_cards;
delimiter //
create procedure delete_cards	(
									in card_id1 int
								)
	begin
		UPDATE Cards SET is_delete=1 where card_id=card_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call delete_cards(64);
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get all Cards <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure get_cards
delimiter //
create procedure get_cards()
	begin
		select * from Cards where is_delete=0;
	end//
delimiter ;
#----------------- <Calls> -----------------#
#call get_cards();
#----------------- </Calls> -----------------#



##drop procedure get_cards
delimiter //
create procedure get_card(in card_id1 int)
	begin
		select * from Cards where card_id=card_id1;
	end//
delimiter ;
#----------------- <Calls> -----------------#
#call get_card(1);
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure update_card;
delimiter //
create procedure update_card(in card_id1 int,in card_number1 varchar(8))
	begin
		UPDATE Cards SET card_number=card_number1,updated_on=now() where card_id=card_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call update_card(65,'01010101');
#----------------- </Calls> -----------------#





############################################################################################################
######################################## Gate Stored Procedures ############################################
############################################################################################################



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a gate <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

#drop procedure insert_gate;
delimiter //
create procedure insert_gate	(
									in gate_name1 varchar(20)
								)
	begin
		insert into Gate (gate_name,created_on) values (gate_name1,now());
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_gate('Entrance');
#call insert_gate('Server Room');
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a gate <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure delete_gate;
delimiter //
create procedure delete_gate	(
									in gate_id1 int
								)
	begin
		update Gate set is_delete=1 where gate_id=gate_id1;
	end //
delimiter ;

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Restore a gate <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
delimiter //
create procedure restore_gate	(
									in gate_id1 int
								)
	begin
		update Gate set is_delete=0 where gate_id=gate_id1;
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call restore_gate(2);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Gates <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure get_gates;
delimiter //
create procedure get_gates	()
	begin
		select * from gate where is_delete=0;
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call get_gates();
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Gate<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure update_gate;
delimiter //
create procedure update_gate	(	
									in gate_id1 int,
                                    in gate_name1 varchar(10)
								)
	begin
		update Gate set gate_name=gate_name1,updated_on=now() where gate_id=gate_id1;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call update_gate(3,'Pantry');
#----------------- </Calls> -----------------#



############################################################################################################
################################# Leave Description Stored Procedures ######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

##drop procedure insert_leave_description;
delimiter //
create procedure insert_leave_description	(
												in leave_name1 varchar(25)
											)
	begin
		insert into Leave_description (leave_name,created_on) values (leave_name1,now());
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_leave_description('Casual');
#call insert_leave_description('Privilege');
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure delete_leave_description;
delimiter //
create procedure delete_leave_description	(
												in leave_id1 int
											)
	begin
		update Leave_description set is_delete=1 where leave_id=leave_id1;
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call delete_leave_description(5);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Leave Descriptons <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure get_leave_descriptions	;
delimiter //
create procedure get_leave_descriptions	()
	begin
		select * from Leave_description where is_delete=0;
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call get_leave_descriptions();
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure update_leave_description;
delimiter //
create procedure update_leave_description	(
												in leave_id1 int,
												in leave_name1 varchar(25)
											)
	begin
		update Leave_description set leave_name=leave_name1,updated_on=now() where leave_id=leave_id1;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call update_leave_description(1,'privilege');
#----------------- </Calls> -----------------#



############################################################################################################
###################################### Employee Stored Procedures ##########################################
############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Insert an Employee  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#


##drop procedure insert_employee;
delimiter //
create procedure insert_employee(	
									in emp_number1 varchar(10),
									in emp_name1 varchar(25),
                                    in email1 varchar(50),
                                    in pass_word1 varchar(20),
                                    in is_admin1 bit,
                                    in is_contract1 bit,
                                    in card_id1 varchar(20)
								)
	begin
		select card_id 	into @new_card_id 
						from Cards where card_number=card_id1;
    
	insert into Employee	(
								emp_number,
                                emp_name,
                                email,
                                pass_word,
                                is_contract,
                                is_admin,
                                created_on,
                                card_id
							) 
				values		(
								emp_number1,
                                emp_name1,
                                email1,
                                pass_word1,
                                is_contract1,
                                is_admin1,
                                now(),
                                @new_card_id
							); 
	select * from Employee where emp_number=emp_number1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_employee('000000C4','Manimozhiyal','mani@gmail.com','123456',0,0,'08876880');
#----------------- </Calls> -----------------#





#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Delete an Employee  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#


##drop procedure delete_employee;
delimiter //
create procedure delete_employee	(
										in emp_id1 int
									)
	begin
		call clear_incharge_log(emp_id1);
		update Employee set is_delete=1 where emp_id=emp_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call delete_employee(2);
#----------------- </Calls> -----------------#




#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Employees <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_employees;
delimiter //
create procedure get_employees()
	begin
		select * from Employee where is_delete=0;
	end //
delimiter ;

#----------------- <Calls> -----------------#
call get_employees;
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Check for email existance <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure is_employee;
delimiter //
create procedure is_employee(in email1 varchar(50))
	begin
		select * from Employee where email=email1 and is_delete=0;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call is_employee('jagg@gmail.com');
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Employees <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_employee;
delimiter //
create procedure get_employee(in emp_id1 int)
	begin
		select * from Employee where emp_id=emp_id1 and is_delete=0;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call get_employee(5);
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update an Employee <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure update_employee;
delimiter //
create procedure update_employee	(	
										in emp_id1 int,
										in emp_name1 varchar(25),
										in email1 varchar(50),
										in pass_word1 varchar(20),
										in is_admin1 bit,
										in is_contract1 bit,
										in card_id1 varchar(10)
									)
	begin
		select card_id 	into @new_card_id 
						from Cards where card_number=card_id1;
		update Employee set 
                                emp_name=emp_name1,
								email=email1, 
								pass_word=pass_word1,
                                is_admin=is_admin1,
                                is_contract=is_contract1,
                                card_id=@new_card_id,
                                updated_on=now()
						where 
								emp_id=emp_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call update_employee(5,'Mani','mani1@gmail.com',123456,1,1,'00110554');
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Validate an Employee <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure Validate;
delimiter //
	create procedure Validate(in email1 varchar(50),in pass_word1 varchar(10))
	begin
		select * from Employee where email=email1 and pass_word=pass_word1 and is_delete=0;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call Validate('sathish@gmail.com','123456');
#----------------- </Calls> ----------------#





############################################################################################################
###################################### Leave Log Stored Procedures #########################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a leave log <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure insert_leave_log;
delimiter //
create procedure insert_leave_log	(
										in from_date1 date,
										in to_date1 date,
                                        in emp_id1 int,
                                        in leave_id1 int
									)
	begin
		insert into Leave_log	(
									from_date,
                                    to_date,
                                    emp_id,
                                    leave_id
								) 
						values 	(
									from_date1,
                                    to_date1,
                                    emp_id1,
                                    leave_id1
								);
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_leave_log('2019/5/6','2019/5/8',1,1);
#----------------- </Calls> -----------------#



############################################################################################################
#################################### Temp Card Log Stored Procedures #######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a temp card log <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure insert_temp_card_log;
delimiter //
create procedure insert_temp_card_log	(
											in date_of_usage1 date,
                                            in emp_id1 int,
                                            in card_id1 int
										)
	begin
		insert into Temp_card_log	(
                                        date_of_usage,
                                        emp_id,
                                        card_id
									) 
							values 	(
										date_of_usage1,
										emp_id1,
                                        card_id1
									);
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call insert_temp_card_log('2019/04/09',1,36);
#----------------- </Calls> -----------------#



############################################################################################################
##################################### Incharge Log Stored Procedures #######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a incharge maps <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure insert_incharge_log;
delimiter //
create procedure insert_incharge_log(in emp_id1 int,in incharge_id1 int)
	begin
		if(not emp_id1 = incharge_id1) then
		insert into Incharge_log (emp_id,incharge_id) values (emp_id1,incharge_id1);
        end if;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_incharge_log(2,1);
#----------------- </Calls> -----------------#

###################################

##drop procedure insert_incharge_log;
delimiter //
create procedure clear_incharge_log(in emp_id1 int)
	begin
		SET SQL_SAFE_UPDATES = 0;
		delete from Incharge_log where emp_id=emp_id1;
	end //
delimiter ;


#call clear_incharge_log(48);
#----------------- <Calls> -----------------#
#call insert_incharge_log(2,1);
#----------------- </Calls> -----------------#


##drop procedure get_reporting_employees;
delimiter //
create procedure get_reporting_employees(in incharge_id1 int)
	begin
		select * from Incharge_log where incharge_id=incharge_id1;
	end //
delimiter ;
call get_reporting_employees(7);


delimiter //
create procedure get_incharges(in emp_id1 int)
	begin
		select * from Incharge_log where emp_id=emp_id1;
	end //
delimiter ;
#call get_incharges(4);




#############################################################################################################
######################################## Import Stored Procedures ###########################################
#############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import data to main swipe <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure import_to_swipe;
delimiter //
create procedure import_to_swipe	(
										in date1 date,
                                        in time1 varchar(10),
                                        in card_number1 varchar(10),
                                        in emp_number1 varchar(10),
                                        in gate_name1 varchar(20),
                                        in inorout1 varchar(5),
                                        in remark1 varchar(50)
									)
	begin
		set @is_exist_employee=0;
        set @is_exist_card=0;
        set @new_emp_id=0;
        set @lesscount=0;
        
        select count(card_id) into @is_exist_card from Cards where card_number=card_number1;
        if(@is_exist_card=0)then
			call insert_card(card_number1);
        end if;
		select count(emp_id) into @is_exist_employee from Employee where emp_number=emp_number1;
        if(@is_exist_employee=0)then
			set @new_email=concat(emp_number1,"@congruentglobal.com") ;
			call insert_employee(emp_number1,'N/A',@new_email,'12345678',0,0,card_number1);
        end if;
		select emp_id into @new_emp_id from Employee where emp_number=emp_number1;
		select card_id into @new_card_id from Cards where card_number=card_number1;
		select gate_id into @new_gate_id from Gate where gate_name=gate_name1;
		if(inorout1="In") then
			set @io=1;
		else
			set @io=0;
		end if;

		insert into Main_swipe	(
									date_log,
									time_log,
									inorout,
									emp_id,
									gate_id,
									card_id,
									remarks
								)  
						values 	(
									date1,
									time1,
									@io,
									@new_emp_id,
									@new_gate_id,
									@new_card_id,
									remark1
								)
			ON DUPLICATE KEY UPDATE inorout=@io,gate_id=@new_gate_id,remarks=remark1,card_id=@new_card_id;

	end //
delimiter ;


#----------------- <Calls> -----------------#
#call import_to_swipe('2019/07/04','11:52:01','00103100','000000i1','Entrance','In','Successful');
#----------------- </Calls> -----------------#

#select * from Main_swipe order by date_log DESC, time_log DESC limit 5 ;
#select count(*) from Main_swipe where date_log >= '2019/01/22' and time_log<'21:54:01' and emp_id=2;
#select @count;

#select count(*) from Main_swipe;
#truncate Main_swipe;


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get swipe log for a given date and emp id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure get_swipe_log;
#delimiter //
#create procedure get_swipe_log	(
#									in emp_id1 int,
#                                    in date1 varchar(30)
#								)
#begin
#    select * from Main_swipe where emp_id=emp_id1 and gate_id=1 and date_log=date1 and time_log > '07:00:00';
#end //
#delimiter ;

#----------------- <Calls> -----------------#
#call get_swipe_log(2,"2019/05/15");
#----------------- </Calls> -----------------#
#delete from Main_swipe where log_id=120;

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get Dates between the given range <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
##drop procedure get_dates;
delimiter //
create procedure get_dates(in emp_id1 int,in from_date varchar(20),in to_date varchar(20),in gate_id1 int)
begin
    select * from Main_swipe where emp_id=emp_id1 and gate_id=gate_id1 and date_log between from_date and to_date group by date_log;
end //
delimiter ;

#----------------- <Calls> -----------------#
#call get_dates(1,"2019/04/15","2019/05/30",1);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get swipe log for a given date and emp id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_swipe_log_ref;
delimiter //
create procedure get_swipe_log_ref	(
									in emp_id1 int,
                                    in today1 varchar(30),
                                    in tomorrow1 varchar(30),
                                    in gate_id1 int
								)
begin
	select DISTINCTROW value into @day_cons from swipeio_config where description='day_consideration';
   ( select * from Main_swipe where emp_id=emp_id1 and remarks="Successful" and gate_id=gate_id1 and date_log=today1 and time_log>@day_cons)union
    (select * from Main_swipe where emp_id=emp_id1 and remarks="Successful" and gate_id=gate_id1 and date_log=tomorrow1 and time_log<@day_cons);
end //
delimiter ;

#----------------- <Calls> -----------------#
#call get_swipe_log_ref(11,"2019/04/22","2019/04/23",1);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get Last logs <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
delimiter //
create procedure get_last_dates_of_employee(in emp_id1 int, in limit1 int)
begin
    SELECT * FROM Main_swipe  where emp_id=emp_id1 and remarks="Successful"  group by date_log
	ORDER BY date_log DESC
	LIMIT limit1;
end //
delimiter ;
#call get_last_dates_of_employee(1,7);
#select * from Main_swipe;
#select count(*) from  Main_swipe;
##drop procedure get_last_dates_of_employee;



delimiter //
create procedure get_last_date()
begin
    SELECT * FROM Main_swipe group by date_log	ORDER BY date_log DESC LIMIT 1;
end //
delimiter ;

#call get_last_date();
