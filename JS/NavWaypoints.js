class NavWaypoints{
    constructor(elem){
        console.log("%cAttaching Nav Waypoints","color:#999");
        
        this.elem = elem;
        this.points = elem.querySelectorAll("li");
        this.current;
        this.showing = false;
    }


    clearSelected(){
        let currSelectedNav = this.elem.querySelector("li[data-status='active']");
        if(currSelectedNav) currSelectedNav.dataset.status = 'inactive';

        this.current.dataset.status = 'inactive';
    }


    setCurrent(elem){
        if(elem){
            if(this.current) this.clearSelected(); // Clear existing, but only if set
            this.current = elem;
            this.current.dataset.status = 'active';
            let connectedNav = this.elem.querySelector(`li[value='${this.current.id}']`);
            if(connectedNav){ 
                if(!this.showing){
                    this.showing = true;
                    this.elem.dataset.showing = "yes";
                    document.getElementsByTagName("body")[0].dataset.status = this.current.id;
                    document.querySelector("nav.top-nav .hero-list").dataset.status = 'inactive';
                    document.querySelector("nav.top-nav .body-list").dataset.status = 'active';
                }
                connectedNav.dataset.status = 'active';
            } else{ // Inside the HERO
                this.showing = false;
                this.elem.dataset.showing = "no";
                document.getElementsByTagName("body")[0].dataset.status = "hero";

                // Top NAV switcheroo
                document.querySelector("nav.top-nav .hero-list").dataset.status = 'active';
                document.querySelector("nav.top-nav .body-list").dataset.status = 'inactive';
            }
        } else{
            console.log("ELEMENT MISMATCH ERROR")
        }
    }
}