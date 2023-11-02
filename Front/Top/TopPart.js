import { Achievement } from "./Achievement.js";

export class TopPart {
    constructor() {
        this.top = null;
    }

    drawTopPart(host) {
        this.top = document.createElement("div");
        this.top.className = "top";
        host.appendChild(this.top);

        //top part-----------------------------------------------------------------------------|
        var logoCard = document.createElement("div");
        logoCard.className = "logoCard";
        this.top.appendChild(logoCard);

        var logoPic = document.createElement("img");
        logoPic.className = "logoPic";
        logoPic.src = `Pictures/${"Logo.png"}`;
        logoCard.appendChild(logoPic);

        // Pratite broj klikova na sliku
        let clickCount = 0;

        // Pronađite svoju sliku po selektoru
        //const logoPic = document.querySelector(".logoPic"); // Zamijenite ".logoPic" sa odgovarajućim selektorom za vašu sliku

        // Dodajte događaj na klik slike
        logoCard.addEventListener("click", () => {
            clickCount++;

            if (clickCount === 10) {
                // Ako je korisnik kliknuo 10 puta, izvršite željeni kod
                var ach = new Achievement();
                ach.drawAchievement(3);
                // Ovde možete dodati više koda koji želite da se izvrši nakon 10 klikova.
                clickCount = 0;
            }
        });



        const messages = [
            "Imagine, this whole thing was build by one dev living in a shoe box, who would have thought ~(˘▾˘~)",
            "Everything seems in to be working, just try not to break it too much k",
            "Well well well this text thing works",
            "hey you ... yea you, try and make something",
            "Did you know that in terms of funding we have ... no funding lol"

        ];

        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container";

        const messageParagraph = document.createElement("p");
        messageParagraph.id = "typed-message";
        messageContainer.appendChild(messageParagraph);

        this.top.appendChild(messageContainer);

        let currentIndex = 0;

        function typeMessage() {
            if (currentIndex < messages.length) {
                const messageText = messages[currentIndex];
                let charIndex = 0;

                function addChar() {
                    if (charIndex < messageText.length) {
                        messageParagraph.textContent += messageText.charAt(charIndex);
                        charIndex++;
                        setTimeout(addChar, 50);
                    } else {
                        // Postavi tajmer za promenu poruke nakon 2 minuta
                        setTimeout(changeMessage, 1 * 60 * 1000);
                    }
                }

                addChar();
            }
        }

        function changeMessage() {
            messageParagraph.textContent = ''; // Emptys curent messege

            currentIndex = (currentIndex + 1) % messages.length; // Goes to next messege
            typeMessage(); // Pokreni otkucavanje nove poruke
        }

        // Inicijalno pokreni funkciju da prikaže prvu poruku
        typeMessage();
    }
}