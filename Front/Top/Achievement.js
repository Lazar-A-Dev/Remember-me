export class Achievement {
    constructor() {

    }

    async drawAchievement(id) {
        var audioElement = new Audio("Pictures/Achievements/Ach-sound.mp3");

        var response = await fetch(`http://localhost:5063/Achievement/ReturnOneAchievements/${id}`);
        var data = await response.json();

        //If the achievement wasent ever used it will activate
        if (data.used == false) {

            var popup = document.createElement("div");
            popup.className = "achievement-popup";

            var achImg = document.createElement("img");
            achImg.src = `Pictures/Achievements/${data.picture}.jpg`;

            if(data.picture == "Ach3")//temp solution
            achImg.src = `Pictures/Achievements/${data.picture}.gif`;

            popup.appendChild(achImg);

            var popupInfo = document.createElement("div");
            popupInfo.className = "popupInfo";
            popup.appendChild(popupInfo);

            var achName = document.createElement("div");
            achName.className = "achName"; // Dodajte klasu za stilizaciju
            achName.innerText = data.name;
            popupInfo.appendChild(achName);

            var achDes = document.createElement("div");
            achDes.className = "achDes"; // Dodajte klasu za stilizaciju
            achDes.innerText = data.description;
            popupInfo.appendChild(achDes);

            document.body.appendChild(popup);

            audioElement.play();

            setTimeout(() => {
                popup.style.display = "none";
                // Ili možete koristiti `popup.remove();` da biste potpuno uklonili popup iz DOM-a.
            }, 5000); // Sakri popup nakon 5 sekundi (5000 ms).
        }
    }


}