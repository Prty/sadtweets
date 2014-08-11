<?php

$id = $_POST['id'];


$link = mysql_connect("localhost","root", "7m76zz23pu");
if (!$link) {
    die('failed' . mysql_error());
}else{
$dbname = "sadtweet";
$tblname="sadtw";


mysql_select_db($dbname,$link);
mysql_query('SET NAMES utf8', $link );



$res_up = mysql_query( "SELECT * FROM sadtw WHERE id = '$id'", $link);

header('Content-type: text/plain; charset=UTF-8');

while ($row = mysql_fetch_array($res_up, MYSQL_ASSOC)) {
    echo "username=".$row['username']."&description=".$row['content'];
}

	mysql_close($link);


}

//echo $id;



?>