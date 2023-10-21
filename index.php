<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
    <script src="https://cdn.plot.ly/plotly-2.26.0.min.js" charset="utf-8"></script>
    <title>Document</title>
</head>
<body>
    <div class="team-selected-banner-container">
        <div class="team-selected-banner">
            858
        </div>
    </div>
    <div class="body-container">
        <div class="left-header">
            <div class="left-header-container">
            <div class="left-header-header">
                <b id="team-selected">858</b>
            </div>
            <input placeholder="Enter Team Number" type="text" id="team-searcher"></input>
            <div class="team-searcher-container">
                <ul class="team-list">
                    <div id="no-teams">No Team Found</div>
                    <li>27</li>
                    <li>74</li>
                    <li>85</li>
                    <li>107</li>
                    <li>141</li>
                    <li>858</li>
                    <li>904</li>
                    <li>1918</li>
                    <li>2054</li>
                    <li>2075</li>
                    <li>2767</li>
                    <li>2771</li>
                    <li>3357</li>
                    <li>3452</li>
                    <li>3458</li>
                    <li>3538</li>
                    <li>3546</li>
                    <li>3572</li>
                    <li>4004</li>
                    <li>4855</li>
                    <li>4967</li>
                    <li>5927</li>
                    <li>6081</li>
                    <li>6090</li>
                    <li>6114</li>
                    <li>7054</li>
                    <li>7160</li>
                    <li>7211</li>
                    <li>8612</li>
                    <li>9106</li>
                    <li>9176</li>
                    <li>9206</li>
                </ul>
            </div>
        </div>
        
    </div>
    <div class="data-container">
        <div class="small-search-bar">
            <div class="wrapper">
                <input id="team-search-input" type="number">
                <button id="search-button">Enter</button>
            </div>
        </div>
        <div class="team-info-container">
            <p id="team-name-banner">R.O.B.O.T.I.C.S.</p>
        </div>
        <div class="tabs-container">
            <div data-target=".average-stats-tab" class="tab tab-active">Average Stats</div>
            <div data-target=".second" class="tab">Team Comparision</div>
        </div>

        <div class="average-stats-tab tab-content tab-content-active">
            <div class="no-teams-found">No Data </div>
            <div class="average-stats-container">
                <h1>Average Stats:</h1>
                <div class="hits-graph-container">
                    <div class="hits-graph graph"></div>
                    <div id="a" class="phrase">Average Hit Percentage: 50%</div>
                    <div id="e" class="phrase">Total Scores: 100</div>
                    (Scored in a single match)
                    <div id="f" class="phrase">Average Scores: 10</div>
                    <div id="g" class="phrase">Highest Score: 100</div>
                    <div id="h" class="phrase">Lowest Score: 10</div>
                </div>
                <br><br>
                <hr class="divider">
                <div class="star-ratings-graph-container">
                   <div class="star-ratings-graph graph"></div>
                </div>
                <br><br>
                <hr class="divider">
                <div class="primary-driving-graph-container">
                    <div class="primary-driving-graph graph"></div>
                    <div id="b" class="phrase">Average Mobility: 100%</div>
                </div>
                <br><br>
                <hr class="divider">
                <div class="endgame-Qual-driving-graph-container">
                    <div class="endgame-Qual-driving-graph graph"></div>
                </div>
                <br><br>
                <hr class="divider">
                <div class="comments-container">
                    <div class="phrase">Comments:</div>
                    <div class="comment-holder">

                    </div>
                </div>
                <br><br>
                <hr class="divider">
                <div id="c" class="phrase">Sample Size: 4</div>
                <div id="d">From: </div>
            </div>
        </div>

        <div class="second tab-content">
            <p class="phrase">Current Ranking (based on total scored)</p>
            <p class="phrase">***This is completely based on our own scouting***</p>
           <ul class="ranking-container">
                <li class="rank">858a: 10 points</li>
                <li class="rank">3357a: 9 points</li>
                <li class="rank">2771a: 5 points</li>
                <li class="rank">1a: 1points</li>
            </ul> 
        </div>
    </div>

    <?php
        $conn = new mysqli("###", "###","###", "###");
        
        $sth = mysqli_query($conn, "SELECT * FROM WMRI");
            $rows = array();
            while($r = mysqli_fetch_assoc($sth)) {
                $rows[] = $r;
            }
        $json_array = json_encode($rows);

        $conn->close();
    ?>

    <script>
    arrayObjects = <?php echo $json_array; ?>
    </script>

</body>
</html>
