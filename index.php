<?php

// INIT AND CONFIG LOAD
// ----------------------------------------------

    include('antie/php/antieframework.php');
    
    // set up application ID and path to antie config, create an AntieFramework instance
    $application_id = "sampleapp";
    $antie_config_path = 'antie/config';
    $antie = new AntieFramework($antie_config_path);
    
    // Get device config name from url parameter, or use html.
    // Determine the path to the device config file.
    $device_configuration_key = isset($_GET['config']) ? $_GET['config'] : 'html5';
    $device_configuration_file_path = $antie_config_path . "/devices/$device_configuration_key.json";
    
    // Load device configuration file
    try {
        $device_configuration = @file_get_contents($device_configuration_file_path);
        if (!$device_configuration)
            throw new Exception("Device ($device_configuration_key) not supported");
    } catch (Exception $e) {
        echo $e->getMessage();
        exit;
    }

    // Substitute appid wherever /%applicaion%/ is present in device configuration
    $device_configuration = preg_replace('/%application%/m', $application_id, $device_configuration);
    
    // Decode to php object
    $device_configuration_decoded = json_decode($device_configuration);

    
// PAGE GENERATION
// ----------------------------------------------

    // Set document mime type
    header("Content-Type: " . $antie->getMimeType($device_configuration_decoded));

    // set doctype and opening html tag
    echo $antie->getDocType($device_configuration_decoded);
    echo $antie->getRootHtmlTag($device_configuration_decoded);
?>


<!-- <head> Block -->
<!-- ---------------------------------------------- -->
<head>

<!-- Device specific head block (API loading etc) -->
<?php
    echo $antie->getDeviceHeaders($device_configuration_decoded);
?>

<!-- Set up require aliases -->
<script type ="text/javascript" >
    var require = {
        baseUrl: "",
        paths: {
            <?php echo $application_id ?>: 'static/script',
            antie: "antie/static/script"         
        },
        priority: [],
        callback: function() {}
    };
</script >

<!-- Load require.js -->
<script type="text/javascript" src="antie/static/script/lib/require.js"></script>

<!-- Load application base style sheet -->
<link rel="stylesheet" href="static/style/base.css" />

<!-- Expose device config to framework -->
<script>
    var antie = {
        framework: {
            deviceConfiguration: <?php echo $device_configuration ?>
        }
    }
</script>

</head>


<!-- <body> Block -->
<!-- ---------------------------------------------- -->

<body>

<!-- Create a loading message -->
<div id="static-loading-screen" style="position: absolute; width: 100%; height: 100%;">
    Application is loading
</div>

<!-- Add in device specific body (Plugins etc) -->
<?php 
    echo $antie->getDeviceBody($device_configuration_decoded);
?>

<!-- Create a div to house the app -->
<div id="app" class="display-none"></div>

<!-- Load the application and launch, remove loadingscreen via callback -->
<script type='text/javascript'>
    require( 
        [
            'sampleapp/appui/sampleapp'
        ],
        function(SampleApp) {
        
            require.ready(function() {
            
                function onReady() {
                    var staticLoadingScreen = document.getElementById('static-loading-screen'); 
                    staticLoadingScreen.parentNode.removeChild(staticLoadingScreen); 
                };
                                    
                new SampleApp(
                        document.getElementById('app'), 
                        'static/style/', 
                        'static/img/',
                        onReady
                ); 
            });
        }
    ); 
</script>

</body>
</html>