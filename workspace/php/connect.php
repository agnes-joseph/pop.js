<html>
    <body>
<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    
    $servername = getenv('IP');
    $username = 'agnes_joseph';
    $password = "";
    $database = "c9";
    $dbport = 3306;

    // Create connection
    $db = new mysqli($servername, $username, $password, $database, $dbport);

    // Check connection
   
   $query = $db->prepare("insert into board (name,score) values (?,?)");
   $query->bind_param('si',$name , $score);
   $nam
   
   e = $_POST['name'];
   $score = $_POST['score'];
   $query->execute();

    
   
    
?>
</body>
</html>
