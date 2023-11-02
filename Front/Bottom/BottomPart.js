import { Achievement } from "../Top/Achievement.js";

export class BottomPart{
    constructor(){
        this.bottom = null;
    }

    drawBottomPart(host){
        //Bottom part-----------------------------------------------------------------------------|
        this.bottom = document.createElement("div");
        this.bottom.className = "bottom";
        host.appendChild(this.bottom);

        var bottomSubject = document.createElement("div");
        bottomSubject.className  = "bottomSubject";
        this.bottom.appendChild(bottomSubject);

        var bottomSubjectLab = document.createElement("label");
        bottomSubjectLab.className = "bottomSubjectLab";
        bottomSubjectLab.innerHTML = "Select subject: ";
        bottomSubject.appendChild(bottomSubjectLab);

        var bottomSubjectSelect = document.createElement("select");
        bottomSubjectSelect.className = "bottomSubjectSelect";
        bottomSubject.appendChild(bottomSubjectSelect);

        // Custom added atribute for selection of subjects

        // Tehnical issue
        const option1 = document.createElement("option");
        option1.value = "Technical issue";
        option1.text = "Technical issue";
        bottomSubjectSelect.appendChild(option1);

        // Bug
        const option2 = document.createElement("option");
        option2.value = "Bug";
        option2.text = "Bug";
        bottomSubjectSelect.appendChild(option2);

        // Feature idea
        const option3 = document.createElement("option");
        option3.value = "New feature or idea";
        option3.text = "New feature or idea";
        bottomSubjectSelect.appendChild(option3);

        var bottomMessage = document.createElement("div");
        bottomMessage.className = "bottomMessage";
        this.bottom.appendChild(bottomMessage);

        var bottomMessageLab = document.createElement("label");
        bottomMessageLab.className = "bottomMessageLab";
        bottomMessageLab.innerHTML = "Message: ";
        bottomMessage.appendChild(bottomMessageLab);

        var bottomMessageInput = document.createElement("textarea");
        bottomMessageInput.className = "bottomMessageInput";
        bottomMessage.appendChild(bottomMessageInput);

        var bottomBtn = document.createElement("button");
        bottomBtn.className = "bottomBtn";
        bottomBtn.innerHTML = "Send";
        this.bottom.appendChild(bottomBtn);

        bottomBtn.addEventListener("click", (ev) => {
            sendFeedback();
            alert("Your message has been sent, thank you for your feedback");
        });

        const sendFeedback = async () => {
            var ach = new Achievement();
            ach.drawAchievement(4);
            
            var type = this.bottom.querySelector(".bottomSubjectSelect").value;
            var description = this.bottom.querySelector(".bottomMessageInput").value;

            var response = await fetch(`http://localhost:5063/UserFeedback/ManuallyInsertUserFeedback/${type}/${description}`, {
                method : "POST"
            });
            this.bottom.querySelector(".bottomMessageInput").value = '';
            var data = await response.json();

            
        }
    }
}