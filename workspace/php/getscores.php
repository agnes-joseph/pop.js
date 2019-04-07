
<?php
    
    $servername = getenv('IP');
    $username = 'agnes_joseph';
    $password = "";
    $database = "c9";
    $dbport = 3306;

    // Create connection
    $db = new mysqli($servername, $username, $password, $database, $dbport);
    
     
   $query = 'select * from board order by score desc';
   $result = mysqli_query($db,$query);

   
   while($row = $result->fetch_assoc()) {
       echo $row['name']. '/' .$row['score']. '/';
   }
       

    
   
    
?>
