teamNumbers = document.querySelectorAll("li:not(.rank)");
teamSelected = document.querySelector("#team-selected");
teamName = document.querySelector("#team-name-banner");

teamNames = {
    "name": {},
};



document.addEventListener('DOMContentLoaded', () => {
    
    let teamTag = {}
    teamNumbers.forEach( team => {
        let a = team.textContent;
       
        fetch(`https://www.thebluealliance.com/api/v3/team/frc${a}`, {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": "m5P7AuXVQQGMqr1mO1S71tAjBaXnqLZmTusR4pEHy6aT1UloPhO2NyPjDRflK8fJ",
            
            }
        }).then( res => res.json()).then( json => {
            teamTag[a] = json["nickname"];
        }).catch( err => console.log(err));
      
    });
    teamNames["name"] = teamTag;
    
});

//when selected, add the "active-button" class
teamNumbers.forEach( team => {
    team.addEventListener( "click", ()=> {
        selectTeam( team);
    });
});

teamSearchButton = document.querySelector("#search-button");
teamSearchInput = document.querySelector("#team-search-input");

teamSearchButton.addEventListener( "click", ()=> {
    changeTeamName( teamSearchInput.value );
});

function selectTeam( team ){
    teamNumbers.forEach( team => team.classList.remove("active-button"));
    team.classList.add("active-button"); 
    teamSelected.textContent = team.textContent;
    changeTeamName( team.textContent);
}

score = document.querySelector("#average-score");

function changeTeamName(teamNumber){
    if( teamNames["name"][teamNumber] === undefined ){
        teamName.textContent = "Team Not Found";
    } else {
        teamName.textContent = teamNames["name"][teamNumber];
        updateGraphs(teamNumber);
    }
}

teamSearcher = document.querySelector("#team-searcher");
noTeamFoundText = document.querySelector("#no-teams");

//once a key is done, filter the search
teamSearcher.onkeyup = filterTeamSearch;

function filterTeamSearch(){
    let numberFilter = teamSearcher.value;
    let atleastOneTeam = false;

    //loops through all the team numbers, if a "numberFilter", which is the search key,
    //isn't located in the team number, the display is set to none.
    for( i = 0; i < teamNumbers.length; i++){
        const team = teamNumbers[i];

        if(team.textContent.indexOf(numberFilter) == 0){
           team.style.display = "";
           atleastOneTeam = true;
        } else {
           team.style.display = "none";
        }

        //if no teams are found, display "No team Found"
        if(!atleastOneTeam) {
            noTeamFoundText.style.display = "block";
        } else {
            noTeamFoundText.style.display = "none";
        }
    }
}

document.onkeydown = function(e){
    if(e.code != "Enter") return;
    for( i = 0; i <  teamNumbers.length; i++){
        if( teamNumbers[i].style.display != "none"){
            selectTeam(teamNumbers[i]);
            break;
        }
    }
}

tabs = document.querySelectorAll(".tab");
tabContents = document.querySelectorAll(".tab-content");

tabs.forEach( tab => {
    tab.addEventListener("click", () => {
        tabs.forEach( tab => tab.classList.remove("tab-active"));
        tabContents.forEach( tabContent => tabContent.classList.remove("tab-content-active"));

        tab.classList.add("tab-active");
        document.querySelector(tab.dataset.target).classList.add("tab-content-active");
    })
})

const EngagedPer = [0.1,0.2];
const DockedPer = [0.2,0.4];
const NonePer = [0.7,0.4];
const Labels = ['AUTO', 'TELEOP'];

const percent = (x) => x.map(y => y*100 + "%");
const star = (x) => x.map(y => y + '★');

const PrimaryDrivingGraph = document.querySelector(".primary-driving-graph");
const EndgameQualDrivingGraph = document.querySelector(".endgame-Qual-driving-graph");
const StarRatingsGraph = document.querySelector(".star-ratings-graph");
const HitsGraph = document.querySelector(".hits-graph");
const PrimaryDrivingData = [
    {
        x: Labels,
        y: EngagedPer,
        name: 'Engaged',
        type: 'bar',
        text: percent(EngagedPer)
    },
    {
        x: Labels,
        y: DockedPer,
        name: 'Docked',
        type: 'bar',
        text: percent(DockedPer)
    },
    {
        x: Labels,
        y: NonePer,
        name: 'None',
        type: 'bar',
        text: percent(NonePer)
    },
    {
        x: ["TELEOP"],
        y: [0.25],
        name: 'Parked',
        type: 'bar',
        text: [0.25]
    }
];
const PrimaryDrivingLayout = {
    width: '400',
    height: '450',
    barmode: 'stack', 
    yaxis: {'tickformat':'0.1%'}, 
    xaxis: {'title': {
        text: 'Charge Station Scoring', 
        font: {
            size: 18
        }
    }},
    xaxis: { title: {
        text: 'Charge Station Status',
        font: {
            size: 18
        }
        },
    },
};


const EndgameQualData = [{
    values: [33,33,34],
    labels: ['Attempted Double/Triple', 'Double Engage', 'Triple Engage'],
    type: 'pie'
  }];
  
const EndgameQualLayout = {
    height: 450,
    width: 400,
    title: 'Endgame Engaging w/ Robots'
};
  


const StarRatingsData = [{
    type: 'bar',
    x: [3.4,4.5,2.3,4.5],
    y: ['Cycle Speed', 'Manuverability', 'Defensive Ability','Overall Rating'],
    orientation: 'h',
    text: [3.4,4.5,2.3,4.5].map(x => x+ "")}
];
const StarRatingsLayout = {
    width: '400',
    height: '450',
    xaxis: {
    title: {
      text: 'Average Ratings',
      font: {
        size: 18
      }
    },
  },
  yaxis: {
    tickangle: 45
  }
}

const HitsData = [
    {
        x: ['AUTO', 'TELEOP'],
        y: [20, 14],
        name: 'Hits',
        text: [20,14],
        type: 'bar'
    },
    {
        x: ['AUTO', 'TELEOP'],
        y: [12, 18],
        text: [12,18],
        name: 'Misses',
        type: 'bar'
    }
];
const HitsLayout = {  
    width: '400',
    height: '450',
    barmode: 'group',
    xaxis: {
        title: {
          text: 'Total Hits and Misses',
          font: {
            size: 18
          }
        },
      },
};

const Graphs = [
    {
        "element": PrimaryDrivingGraph,
        "data": PrimaryDrivingData,
        "layout": PrimaryDrivingLayout
    },
    {
        "element": EndgameQualDrivingGraph,
        "data": EndgameQualData,
        "layout": EndgameQualLayout
    },
    {
        "element": StarRatingsGraph,
        "data": StarRatingsData,
        "layout": StarRatingsLayout
    },
    {
        "element": HitsGraph,
        "data": HitsData,
        "layout": HitsLayout
    }
]

teamData = {
    27: [],
    74: [],
    85: [],
    107: [],
    141: [],
    858: [],
    904: [],
    1918: [],
    2054: [],
    2075: [],
    2767: [],
    2771: [],
    3357: [],
    3452: [],
    3458: [],
    3538: [],
    3546: [],
    3572: [],
    4004: [],
    4855: [],
    4967: [],
    5927: [],
    6081: [],
    6090: [],
    6114: [],
    7054: [],
    7160: [],
    7211: [],
    8612: [],
    9106: [],
    9176: [],
    9206: []
}

function addSQLData(){
    for( i = 0; i < arrayObjects.length; i++){
        let teamNumbera = arrayObjects[i]["teamNumber"];
        teamData[teamNumbera].push(arrayObjects[i]);
    }
    calculateTeamScore()
}

document.addEventListener("DOMContentLoaded", addSQLData);
averageHit = document.querySelector("#a");

noTeamsData = document.querySelector(".no-teams-found");
averageMobility = document.querySelector("#b");
commentHolder = document.querySelector(".comment-holder");

sampleSizeText = document.querySelector("#c");
scouterNames = document.querySelector("#d");

totalScore = document.querySelector("#e");
averageScore = document.querySelector("#f");

highestScore = document.querySelector("#g");
lowestScore = document.querySelector("#h");



function updateGraphs( teamNumber ){
    if( teamData[teamNumber] === undefined || teamData[teamNumber].length == 0){
        noTeamsData.style.display = "block";
        document.querySelector(".average-stats-container").style.display = "none";
        return;
    } 
    noTeamsData.style.display = "none";
    document.querySelector(".average-stats-container").style.display = "block";

    const sampleSize = teamData[teamNumber].length;
    const teamDatas = teamData[teamNumber];

    tempStarRating = [0,0,0,0];
    teamDatas.forEach( data => {
        tempStarRating[0] += data['starCycleSpeedRating'] / sampleSize;
        tempStarRating[1] += data['starManeuverabilityRating'] / sampleSize;
        tempStarRating[2] += data['starDefensiveAbilityRating'] / sampleSize;
        tempStarRating[3] += data['starOverallRating'] / sampleSize;
    });

    StarRatingsData[0]['x'] = tempStarRating;
    StarRatingsData[0]['text'] = star(tempStarRating);


    var totalAutoMisses = 0;
    var totalTeleopMisses = 0;
    var totalAutoHits = 0;
    var totalTeleopHits = 0;

    teamDatas.forEach( data => {
        totalAutoMisses += parseInt(data["autoHighMisses"]) + parseInt(data["autoMidMisses"]) + parseInt(data["autoLowMisses"]);
        totalAutoHits += parseInt(data["autoHighHits"]) + parseInt(data["autoMidHits"]) + parseInt(data["autoLowHits"]);
        totalTeleopMisses += parseInt(data["teleopHighMisses"]) + parseInt(data["teleopMidMisses"]) + parseInt(data["teleopLowMisses"]);
        totalTeleopHits += parseInt(data["teleopHighHits"]) +parseInt(data["teleopMidHits"]) + parseInt(data["teleopLowHits"]);
    });

    HitsData[0]['y'] = [
        totalAutoHits, totalTeleopHits
    ];
    HitsData[1]['y'] = [
        totalAutoMisses, totalTeleopMisses
    ];
    HitsData[0]['text'] = [
        totalAutoHits, totalTeleopHits
    ];
    HitsData[1]['text'] = [
        totalAutoMisses, totalTeleopMisses
    ]
    var totalAuto = (totalAutoHits+totalAutoMisses);
    var totalTeleop = (totalTeleopHits + totalTeleopMisses);
    var hitPercent = 0;
   
    if( totalAuto != 0){
        hitPercent += totalAutoHits / totalAuto;
    } 
    if( totalTeleop != 0){
        hitPercent += totalTeleopHits / totalTeleop;
    }
    hitPercent /= 2;
   
    averageHit.textContent = "Average Hit Percentage: " + Math.round(10000*hitPercent)/100 + "%";

    
    var totalMobility = 0;

    teamDatas.forEach( data => {
        if( data["autoMobility"] == "Mobility"){
            totalMobility += 1 / sampleSize;
        }
    });

    averageMobility.textContent = "Average Mobility: " + Math.round(10000*totalMobility)/100 + "%";


    var autoEngaged = 0;
    var autoDocked = 0;
    var autoNone = 0;
    var endgameEngaged = 0;
    var endgameDocked = 0;
    var endgameNone = 0;
    var endgameParked = 0;

    teamDatas.forEach( data => {
        switch( data['autoDriving'] ){
            case 'Engaged':
                autoEngaged += 1;
                break;
            case 'Docked':
                autoDocked += 1;
                break;
            case 'None':
                autoNone += 1;
                break;
            default:
                console.log("uh oh ");
                break;
        }
        switch( data['endgameDriving'] ){
            case 'Engaged':
                endgameEngaged += 1;
                break;
            case 'Docked':
                endgameDocked += 1;
                break;
            case 'None':
                endgameNone += 1;
                break;
            case 'Parked':
                endgameParked += 1;
                break;
            default:
                console.log("uh oh ");
                break;
        }
    });

    nonePercent = [autoNone / sampleSize, endgameNone / sampleSize];
    dockedPercent = [autoDocked / sampleSize, endgameDocked / sampleSize];
    engagedPercent = [autoEngaged / sampleSize, endgameEngaged / sampleSize];
    parkedPercent = [endgameParked / sampleSize];

    PrimaryDrivingData[0]['y'] = engagedPercent;
    PrimaryDrivingData[0]['text'] = percent(engagedPercent);
    PrimaryDrivingData[1]['y'] = dockedPercent;
    PrimaryDrivingData[1]['text'] = percent(dockedPercent);
    PrimaryDrivingData[2]['y'] = nonePercent;
    PrimaryDrivingData[2]['text'] = percent(nonePercent);
    PrimaryDrivingData[3]['y'] = parkedPercent;
    PrimaryDrivingData[3]['text'] = percent(parkedPercent);

    endgameQual = [0,0,0];

    teamDatas.forEach( data => {
        x = data['endgameClimb'];
        if(  x == 'Attempted'){
            endgameQual[0] += (100 / sampleSize);
        } else if(x == 'Double'){
            endgameQual[1] += (100 / sampleSize);
        } else if(x == "Triple"){
            endgameQual[2] += (100 / sampleSize);
        }
    });

    EndgameQualData[0]['values'] = endgameQual;

    var comments = [];
    teamDatas.forEach( data => {
        comments.push( data["comments"]);
    })

   commentHolder.innerHTML = "";

    comments.forEach( comment => {
        newElement = document.createElement('p');
        newElement.textContent = comment;
        commentHolder.appendChild(newElement);
    });

    sampleSizeText.textContent = "Sample Size: " + sampleSize;

    scouters = '';
    teamDatas.forEach( data => {
        scouters += data['scouterName'] + ",";
    });

    scouterNames.textContent = "From: " + scouters;

    totalScore.textContent = "Total Score: " + teamScores[teamNumber]["totalScore"];
    averageScore.textContent = "Average Score: " + teamScores[teamNumber]["averageScore"];
    highestScore.textContent = "Highest Score: " + teamScores[teamNumber]["highestScore"];
    lowestScore.textContent = "Lowest Score: " + teamScores[teamNumber]["lowestScore"];
    
    drawGraphs();
}

function drawGraphs(){
    Graphs.forEach( graphContent => {
        Plotly.newPlot( graphContent["element"], graphContent["data"], graphContent["layout"], {staticPlot: true});
    });
}

drawGraphs();
  



teamScores = {};

function calculateTeamScore(){

    teamNumbers.forEach( team => {
        var score = 0;
        var highestScore = 0;
        var lowestScore = 0;
        teamNumber = team.textContent;
        teamDatas2 = teamData[teamNumber];

        if( teamDatas2 === undefined) return;
        teamDatas2.forEach( data => {
            var score2 = 0;
            if(data["autoMobility"] == 'Mobility') score2 += 3;
            if(data["autoDriving"] == "Docked") score2 += 8;
            if(data["autoDriving"] == "Engaged") score2 += 12;

            score += parseInt(data["autoHighHits"]) * 6;
            score += parseInt(data["autoMidHits"]) * 4;
            score += parseInt(data["autoLowHits"]) * 3;
            score += parseInt(data["teleopHighHits"]) * 5;
            score += parseInt(data["teleopMidHits"]) * 3;
            score += parseInt(data["teleopLowHits"]) * 2;

            //I forgot link and supercharged points. Oops!!! :)

            if(data["endgameDriving"] == "Docked") score2 += 6;
            if(data["endgameDriving"] == "Engaged") score2 += 10;
            if(data["autoDriving"] == "Parked") score2 += 2;

            if(score2 > highestScore) highestScore = score2;
            if(score2 < lowestScore || lowestScore == 0) lowestScore = score2;

            score += score2;
        });

        var avgScore = 0;
        if( teamDatas2.length != 0){
            avgScore = score / teamDatas2.length;
        }
        teamScores[teamNumber] = {
            'totalScore': score,
            'averageScore': avgScore,
            'highestScore': highestScore,
            'lowestScore': lowestScore
        };
    });
}
