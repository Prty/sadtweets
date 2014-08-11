<?php

$id = $_POST['id'];
$name = $_POST['name'];
$desc = $_POST['desc'];
//$desc = '1234567890';


$link = mysql_connect("localhost","root", "7m76zz23pu");
if (!$link) {
    die('failed' . mysql_error());
}else{
$dbname = "sadtweet";
$tblname="sadtw";


mysql_select_db($dbname,$link);
mysql_query('SET NAMES utf8', $link );


$res_up = mysql_query( "DELETE FROM sadtw WHERE id = '$id'", $link);
	



$res_m = mysql_query( "INSERT INTO sadtw(id,username,content) VALUES ('$id','$name','$desc')", $link);


	mysql_close($link);


}

print $id;



?>