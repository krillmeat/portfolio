class ProjectManager{
    constructor(){
        console.log("%cProject Manager Loaded...","color:#999");

        // this.wrapperElem = document.querySelector(".big-wrapper");
        this.projectsSection = document.getElementById("projects");
        this.projectButtons = this.projectsSection.querySelectorAll(".projects-list button");
        this.status = "main";
        this.projectReturnButtons = this.projectsSection.querySelectorAll("button.project-return");

        for(let i = 0; i < this.projectButtons.length; i++){
            this.projectButtons[i].addEventListener("click",this.buttonHandler.bind(this));
        }

        for(let i = 0; i < this.projectReturnButtons.length; i++){
            this.projectReturnButtons[i].addEventListener("click",this.returnFromProjects.bind(this));
        }
    }

    buttonHandler(e){
        let t = e.currentTarget;

        this.switchToProject(t.parentElement.dataset.value);
    }

    returnFromProjects(e){
        let t = e.currentTarget;
        
        this.status = "main";
        document.getElementsByTagName("body")[0].dataset.status = "main-view";
        document.querySelector(".project-process .process[data-status='active']").dataset.status = "inactive";
    }

    /**
    * SWITCH TO PROJECT
    * ----------------------------------------------------------------------------------
    * Switches the screen to Project View
    * ----------------------------------------------------------------------------------
    * @param {String}   projectName   The name of the Project to pull up when switching
    * --------------------------------------------------------------------------------*/
    switchToProject(projectName){
        console.log("Switch to Project : ",projectName);
        if(this.status == "main"){
            this.status = "project";
            let currentProject = document.querySelector(`.project-process .process[value='${projectName}']`);
            // Scroll Properly to Projects
            window.scrollTo(0,document.getElementById("projects").getBoundingClientRect().top + window.scrollY);

            // Wait a half-second then set the body to overflow: hidden to allow from internal scrolling on projects
            setTimeout(function(){
                document.getElementsByTagName("body")[0].dataset.status = "project-view";
                if(document.querySelector(".project-process .process[data-status='active']")) document.querySelector(".project-process .process[data-status='active']").dataset.status = "inactive";
                document.querySelector(`.project-process .process[value='${projectName}']`).dataset.status = "active";
                document.querySelector(".project-process").style.height = ( window.innerHeight - 180 ) + "px";

            }, 500);
        }
    }
}