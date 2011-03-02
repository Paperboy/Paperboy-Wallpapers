<?php
    //include($_SERVER['DOCUMENT_ROOT'] . "/blacklist.php");

    function toplist($account = 1002396, $items = 10) {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://www.trackyourstats.com/includes/list-".$account.".js");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $tys = curl_exec($ch);
        curl_close($ch);

        if($tys) {
            preg_match_all('/"(http[^"]+)"/i', $tys, $links);
            preg_match_all('/"([a-z0-9- !]+)"/i', $tys, $titles);
            if($links[0] == null) {          
                echo '<p>Looks like this list is empty. :/</p>' . "\n";  
            } else {
                 $links = $links[1];
                 $titles = $titles[1];
                 if(count($links) < $items) {
                    $items = count($links); 
                 }
                 $items--;
                 echo '<ul id="toplist">' . "\n";
                 for ($i=0; $i<=$items; $i++) {
                    echo '   <li><a href="' . $links[$i] . '">' . $titles[$i] . '</a></li>' . "\n";
                 }
                 echo '  </ul>' . "\n";
            }
        } else {
            echo '<p>Damn it! The top referrer list is unreachable at the moment. :/</p>' . "\n";
        }
        
    }