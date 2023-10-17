teamNumbers = document.querySelectorAll("li");
teamSelected = document.querySelector("#team-selected");
teamName = document.querySelector("#team-name");

teamData = {
    "wins": {},
    "name": {}
};

document.addEventListener('DOMContentLoaded', () => {
    
    let teamName = {}
    teamNumbers.forEach( team => {
        let teamNumber = team.textContent;
        fetch(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}`, {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": "###",
            
            }
        }).then( res => res.json()).then( json => {
            teamName[teamNumber] = json["nickname"];
        }).catch( err => console.log(err));
    });
    teamData["name"] = teamName;
    
    fetch(`https://www.thebluealliance.com/api/v3/event/2023miken/rankings`, {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": "###",
            
            }
        }).then( res => res.json()).then( json => {
            calculateData(json)
        }).catch( err => console.log(err));
});

function calculateData(json){
    wins = {};
    json["rankings"].forEach( team =>{
       let teamNumber = team["team_key"].replace("frc","");
       wins[teamNumber] = team["record"];
    });
    teamData["wins"] = wins;
}


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
    winDict = teamData["wins"][teamNumber];
    teamWinString = `Wins: ${winDict["wins"]} Losses: ${winDict["losses"]} Ties: ${winDict["ties"]}`
    score.textContent = teamWinString;
   
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
    if(e.code == "Enter"){
        for( i = 0; i <  teamNumbers.length; i++){
            if( teamNumbers[i].style.display != "none"){
                selectTeam(teamNumbers[i]);
                break;
            }
        }

    }
}
