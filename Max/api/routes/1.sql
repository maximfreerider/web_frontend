delimiter //
DROP PROCEDURE IF EXISTS `join_table` //

CREATE PROCEDURE join_table()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE done1 INT DEFAULT FALSE;
  DECLARE field1, field2 int;  //декларуй свої поля 
  DECLARE query1, s1 varchar(100);
  DECLARE colum int;
  DECLARE cur1 CURSOR FOR SELECT var1, var2 FROM table3;
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  OPEN cur1;

  read_loop: LOOP
    FETCH cur1 INTO field1 ....; //задекларовані поля
    IF done THEN LEAVE read_loop;
    END IF;
    Set @colum = 7; // введи кількість ствопців
    Set @cc=0;

    Set @s = concat('create table1 ( id int PRIMARY KEY'+var)ж
    Set @s1 = concat('create table1 ( id int PRIMARY KEY'+var)
    While (@cc <@colum ) do
        Set @s=concat();
        Set @rand = round(Rand()*10);\
        if (@rand <=5) THEN
            SET @s = concat(@query, @s); 
        end if else
            SET @s = concat(@query, @s); 

        SET @cc = @cc - 1;
	END while;
	END LOOP;
	
  CLOSE cur1;
  
END //
call join_table;
Delimiter ;

