<?php

if ( !isset($_COOKIE['debugPrintAmount']) && empty($_SESSION['debugPrintAmount']) ) {
    setcookie('debugPrintAmount', 0, time() + ( 86400 * 3 ) );
}

function pre() {
            $colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

            $args = func_get_args();
            $x = $_COOKIE['debugPrintAmount'];
            
            for ($i=0; $i < count($args, 0) ; $i++) { 

                $class = $colors[$x % 6];
                echo "<pre class='$class'>";

                if ( is_array( $args[$i]) ) {
                    var_dump($args[$i]);
                }
                else {
                    echo $args[$i];
                }

                $x++;

                echo '</pre>';
            }

            setcookie('debugPrintAmount', $x, time() + ( 86400 * 3 ));
        }

setcookie('debug0', 'general skywalker', time() + ( 86400 * 0.5 ));

function my_array_push($array) {

    $args = func_get_args();
    $my_string = '';

    for ($i=0; $i < count($args, 0); $i++) { 
        
        
        if ( $i == 0 && is_array( $default_array = $args[0]) ) {

            for ($y=0; $y < count( $default_array ); $y++) { 
                $my_string = $my_string . $default_array[$y] . ':';
            }
        }
        else {
            
            if ( $i == count($args, 0) -1 ) {
                $my_string = $my_string . $args[$i];                        
            }
            else {
                $my_string = $my_string . $args[$i] . ':';
            }
        }

    }

    print_r ( explode( ':', $my_string) );
    // print_r ( json_encode( (object) explode( ':', $my_string)) );
    return explode( ':', $my_string);

}

function my_array_push2($array) {

    $args = func_get_args();
    $added_value = 0;
    $myarray = [];

    for ($i=0; $i < count($args, 0); $i++) { 
        $x = $i + $added_value;
        
        if ( $i == 0 && is_array( $default_array = $args[0]) ) {

            for ($y=0; $y < count( $default_array ); $y++) { 

                $myarray[$i + $added_value] = $default_array[$y];
                
                $added_value++;
            }

        }
        else {
            $myarray[$x] = $args[$i];
        }

    }
    return $myarray;
}