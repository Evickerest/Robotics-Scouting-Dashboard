teamNumbers = document.querySelectorAll("li");
teamSelected = document.querySelector("#team-selected");
teamName = document.querySelector("#team-name-banner");

teamData = {
    "name": {}
};

document.addEventListener('DOMContentLoaded', () => {
    
    let teamName = {}
    teamNumbers.forEach( team => {
        let teamNumber = team.textContent;
        fetch(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}`, {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": "####",
            
            }
        }).then( res => res.json()).then( json => {
            teamName[teamNumber] = json["nickname"];
        }).catch( err => console.log(err));
    });
    teamData["name"] = teamName;
    
});

//when selected, add the "active-button" class
teamNumbers.forEach( team => {
    team.addEventListener( "click", ()=> {
        selectTeam( team);
    });
});


function selectTeam( team ){
    teamNumbers.forEach( team => team.classList.remove("active-button"));
    team.classList.add("active-button"); 
    teamSelected.textContent = team.textContent;
    changeTeamName( team.textContent);
}

score = document.querySelector("#average-score");

function changeTeamName(teamNumber){
    teamName.textContent = teamData["name"][teamNumber];
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

const PrimaryDrivingGraph = document.querySelector(".primary-driving-graph");
const SecondaryDrivingGraph = document.querySelector(".secondary-driving-graph");
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
        text: percent(NonePer)}
];
const PrimaryDrivingLayout = {
    barmode: 'stack', 
    yaxis: {'tickformat':'0.1%'}, 
    xaxis: {'title': {
        text: 'Charge Station Scoring', 
        font: {
            size: 18
        }
    }},
    xaxis: { title: {
        text: 'Charge Station Status in AUTO and ENDGAME',
        font: {
            size: 18
        }
        },
    },
};
const SecondaryDrivingData = [
    {
      x: ['Mobility', 'Parked'],
      y: [0.5, 0.8],
      type: 'bar',
      text:percent( [0.5, 0.8])
    }
];
const SecondaryDrivingLayout = {
    yaxis: {'tickformat':'0.1%'},
    xaxis: {
        title: {
          text: 'Parked and Mobility Average Percentage',
          font: {
            size: 18
          }
        },
      }
};
const StarRatingsData = [{
    type: 'bar',
    x: [3.4,4.5,2.3,4.5],
    y: ['Cycle Speed', 'Manuverability', 'Defensive Ability','Overall Rating'],
    orientation: 'h',
    text: [3.4,4.5,2.3,4.5].map(x => x+ "★")}
];
const StarRatingsLayout = {
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
        type: 'bar'
    },
    {
        x: ['AUTO', 'TELEOP'],
        y: [12, 18],
        name: 'Misses',
        type: 'bar'
    }
];
const HitsLayout = {barmode: 'group'};

const Graphs = [
    {
        "element": PrimaryDrivingGraph,
        "data": PrimaryDrivingData,
        "layout": PrimaryDrivingLayout
    },
    {
        "element": SecondaryDrivingGraph,
        "data": SecondaryDrivingData,
        "layout": SecondaryDrivingLayout
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

Graphs.forEach( graphContent => {
    Plotly.newPlot( graphContent["element"], graphContent["data"], graphContent["layout"]);
})
  

function update(){
    console.log("hello");
    StarRatingsData[0]['x'] = [1,2,3,2];
    Plotly.newPlot(StarRatingsGraph, StarRatingsData, StarRatingsLayout);
}

