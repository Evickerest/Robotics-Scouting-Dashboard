teamNumbers = document.querySelectorAll("li");

//when selected, add the "active-button" class
teamNumbers.forEach( team => {
    team.addEventListener( "click", ()=> {
        //removes the active-button class from every other team button first
        teamNumbers.forEach( team => team.classList.remove("active-button"));
        team.classList.add("active-button"); 
    });
});

teamSearcher = document.querySelector("#team-searcher");
noTeamFoundText = document.querySelector("#no-teams");

//once a key is done, filter the search
teamSearcher.onkeyup = filterTeamSearch;

console.log(teamSearcher);


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
