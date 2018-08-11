<template>
    <div id="notebook-customizer">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div id="notes" :class="[{'page-first':currentPage == 0},{'page-last':currentPage == totalPages},notebook.corners,view]">
                    <div class="spine" :class="notebook.spine" :style="{'background-color':notebook.spineColor}"></div>
                    <div class="side-printing" ></div>
                    <div class="mods">
                        <template v-for="(page,key,index) in notebook.pages">
                            <div class="mod" :class="[{'otwarta':index < currentPage},{'on-top':index == currentPage && onTop}]" :data-id="index" :style="[{'z-index':index < currentPage ? index : -index},{'animation-duration':pageSpeed*2+'ms'}]">
                                <div v-if="page.childFront2" class="child-front-2" :class="page.childFront2.class"></div>
                                <div v-if="page.childFront1" class="child-front-1" :class="page.childFront1.class"></div>
                                <div v-if="page.childFront" class="child-front" :class="page.childFront.class"></div>
                                <div class="basic" :class="page.class" :style="{'background-color':page.color}"></div>
                                <div v-if="page.childBack" class="child-back" :class="page.childBack.class"></div>
                            </div>
                        </template>
                    </div>
                    <div class="shadow" :style="{'transition-duration':pageSpeed*2+'ms'}"></div>

                </div>
            </div>
        </div>
        <div class="columns controls">
            <div class="column is-12 has-text-centered">
                <p>
                    Page: {{ currentPage }}
                </p>
                <div class="buttons has-addons is-centered">
                    <span class="button is-info" @click="setPage(0,200)">Start</span>
                    <span class="button" @click="prevPage()">Previous page</span>
                    <span class="button" @click="nextPage()">Next page</span>
                    <span class="button is-info" @click="setPage(totalPages,200)">End</span>
                </div>
            </div>
        </div>
        <div class="columns controls">
            <div class="column is-4 is-offset-2">
                <div class="panel">
                    <div class="panel-heading">
                        See outside
                    </div>
                    <div class="panel-block">
                        <span class="button is-fullwidth" @click="setView('spine')">Ridge</span>
                        <span class="button is-fullwidth" @click="setView('side-printing')">Edge</span>
                    </div>
                <div class="panel-heading">
                    See inside
                </div>
                <div class="panel-block">
                    <p class="control">
                        <span class="button is-fullwidth" @click="setPage(0)">Cover front</span>
                        <span class="button is-fullwidth" @click="setPage(1)">Inside front</span>
                        <span class="button is-fullwidth" @click="setPage(2)">Calendar</span>
                        <span class="button is-fullwidth" @click="setPage(4)">Inside</span>
                        <span class="button is-fullwidth" @click="setPage(6)">Advertisement pages</span>
                        <span class="button is-fullwidth" @click="setPage(7)">Inside Back</span>
                        <span class="button is-fullwidth" @click="setPage(8)">Cover back</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="column is-4">
            <div class="panel">
                <div class="panel-heading">
                    Corners
                </div>
                <div class="panel-block">
                    <label class="radio">
                        <input v-model="form.corners" type="radio" name="corners" id="rounded-corners" value="rounded-corners">
                        round corners
                    </label>
                </div>
                <div class="panel-block">
                    <label class="radio">
                        <input v-model="form.corners" type="radio" name="corners" id="normal-corners" value="normal-corners">
                        pointed corners
                    </label>
                </div>
                <div class="panel-heading">
                    Cover
                </div>
                <div class="panel-block">
                    <div class="select is-fullwidth">
                        <select id="formOkladka" v-model="form.cover">
                            <option value="okladka1" checked>Cover 1</option>
                            <option value="okladka2">Cover 2</option>
                            <option value="okladka3">Color</option>
                        </select>
                    </div>
                </div>
                <div class="panel-block" v-if="form.cover == 'okladka3'">
                    <label class="form-check-label">
                        <input type="color" value="#aa2222" v-model="form.coverColor">
                        Select color
                    </label>
                </div>
                <div class="panel-heading">
                    Others
                </div>
                <div class="panel-block">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" v-model="form.print">
                        Nadruk
                    </label>
                </div>
                <div class="panel-block">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" v-model="form.rubber1">
                        Elastic band
                    </label>
                </div>
                <div class="panel-block">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" v-model="form.rubber2">
                        Pen loop
                    </label>
                </div>
                <div class="panel-block">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" v-model="form.banderole">
                        Banderole
                    </label>
                </div>
            </div>
                <div class="col-sm-4">
                    <!-- <form>
                        <div class="form-group">
                            <legend>Wnętrze</legend>
                            <label for="formPerforacja">Perforacja</label>
                            <select class="form-control" id="formPerforacja" v-model="form.perforacja">
                                <option value="okladka1" checked> Okładka 1</option>
                                <option value="okladka2">Okładka 2</option>
                                <option value="okladka3">Kolor</option>
                            </select>
                        </div>
                    </form> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotebookCustomizer',
    methods: {
        nextPage(){
            if(this.destinationPage < this.totalPages){
                this.destinationPage++;
            }
            this.pageSpeed = 500;
            this.setPage(this.destinationPage);
        },
        prevPage(){
            if(this.destinationPage > 0){
                this.destinationPage--;
            }
            this.pageSpeed = 500;
            this.setPage(this.destinationPage);
        },
        setPage(page,speed = 500){
            // save to variable destination page
            this.destinationPage = page;
            // reset view
            this.view = '';
            // return true when scrolling is at the end
            return new Promise((resolve, reject)=>{
                // helper function which is run at beginning and then inside setInterval
                function pager(app,direction){
                    if(app.currentPage == page){
                        clearInterval(app.timer);
                        app.isPaged = false;
                        resolve(true);
                    } else {
                        if(direction)
                            app.currentPage++;
                        else
                            app.currentPage--;
                    }
                }
                // set speed
                this.pageSpeed = speed
                // if forward
                if(page > this.currentPage){
                    // direction
                    this.onTop = false;
                    // let to change current page even durning animation
                    if(!this.isPaged){
                        pager(this,true);
                    }
                    // disable
                    this.isPaged = true;
                    // remove old and create new setInterval
                    clearInterval(this.timer);
                    this.timer = setInterval(()=>{
                        pager(this,true);
                    },this.pageSpeed);
                }
                // if backard
                if(page < this.currentPage){
                    // direction
                    this.onTop = true;
                    // let to change current page even durning animation
                    if(!this.isPaged){
                        pager(this,false);
                    }
                    // disable
                    this.isPaged = true;
                    // remove old and create new setInterval
                    clearInterval(this.timer);
                    this.timer = setInterval(()=>{
                        pager(this,false);
                    },this.pageSpeed);
                }
                // resolve when we at destination page
                if(page==this.currentPage){
                    resolve(true);
                }
            });
        },
        setView(view){
            // disable view when we already on it
            if(this.view == 'view-'+view){
                this.view = '';
            } else {
                switch(view){
                    case 'spine':
                        this.setPage(0,200).then((resolve)=>{
                            if(resolve){
                                this.view = 'view-spine';
                            }
                        });
                        break;
                    case 'side-printing':
                            this.setPage(0,200).then((resolve)=>{
                                if(resolve){
                                    this.view = 'view-side-printing';
                                }
                            });
                            break;
                    default:
                }
            }
        }
    },
    watch: {
        form:{
            handler: function(data){
                this.notebook.pages.coverFront.class = [this.form.cover,'cover'];
                this.notebook.pages.coverTyl.class = [this.form.cover,'cover'];
                this.notebook.spine = [this.form.cover,'spine'];
                this.notebook.corners = this.form.corners;

                if(this.form.cover == 'okladka3'){
                    this.notebook.pages.coverFront.color = this.form.coverColor;
                    this.notebook.pages.coverTyl.color = this.form.coverColor;
                    this.notebook.spineColor = this.form.coverColor;
                }
                // Banderola
                if(this.form.banderole){
                    this.notebook.pages.coverFront.childFront2.class = 'banderola';
                } else {
                    this.notebook.pages.coverFront.childFront2.class = '';
                }

                // Gumka zamykająca
                if(this.form.rubber1){
                    this.notebook.pages.coverFront.childFront1.class = 'gumka-zamykajaca';
                } else {
                    this.notebook.pages.coverFront.childFront1.class = '';
                }

                // Print
                if(this.form.print){
                    this.notebook.pages.coverFront.childFront.class = 'cover-nadruk';
                } else {
                    this.notebook.pages.coverFront.childFront.class = '';
                }

                // Gumka na długopis
                if(this.form.rubber2){
                    this.notebook.pages.coverTyl.childFront1.class = 'gumka-uchwyt-dlugopis';
                } else {
                    this.notebook.pages.coverTyl.childFront1.class = '';
                }

            },
            deep: true,
        }
    },
    data () {
        return{
            timer: 0,
            open: false,
            currentPage: 0,
            destinationPage: 0,
            onTop: false,
            isPaged: false,
            totalPages: 8,
            pageSpeed: 500,
            view: '',
            form:{
                cover: 'okladka1',
                print: 'logo1',
                coverColor: '',
                corners: 'rounded-corners',
                rubber1: true,
                rubber2: true,
                banderole: true,
                perforacja: ''
            },
            notebook: {
                corners: 'rounded-corners',
                spine: ['spine','okladka1'],
                spineColor: '',
                pages:{
                    coverFront: {
                        class: 'okladka1',
                        opened: false,
                        color: '',
                        childFront1:{
                            class: 'gumka-zamykajaca',
                        },
                        childFront2:{
                            class: 'banderola',
                        },
                        childFront:{
                            class: 'cover-nadruk',
                        },
                        childBack:{
                            class: 'wyklejka',
                        },
                    },
                    wyklejka: {
                        class: 'wyklejka',
                        opened: false,
                    },
                    kalendarz: {
                        class: 'kalendarz',
                        opened: false,
                        childBack:{
                            class: 'kalendarz',
                        },
                    },
                    kartki1: {
                        class: 'kartka',
                        opened: false,
                    },
                    kartki2: {
                        class: 'kartka',
                        opened: false,
                    },
                    stronyReklamowe: {
                        class: 'strony-reklamowe',
                        opened: false,
                        childBack:{
                            class: 'reklama',
                        },
                    },
                    wyklejkaKoniec: {
                        class: 'wyklejka',
                        opened: false,
                    },
                    coverTyl: {
                        class: 'okladka1',
                        opened: false,
                        color: '',
                        childFront1:{
                            class: 'gumka-uchwyt-dlugopis',
                        },
                        childFront:{
                            class: 'wyklejka',
                        },
                    },
                }
            }
        }
    }
}
</script>

<style lang="less">
#notebook-customizer{
    margin-top: 50px;
    #notes{
        margin: auto;
        display:block;
        width: 200px;
        height: 450px;
        transform-style: preserve-3d;
        transform: translateX(100px);
        transition: transform 500ms;
        @media screen and (max-width: 480px) {
            transform: scale(0.7) translateX(100px);
        }
        &.page-first{
            transform: translateX(0);
        }
        &.page-last{
            transform: translateX(200px);
        }
        &.page-first{
            .shadow{
                transform: scaleX(0.5) translateX(-200px);
            }
        }
        &.page-last{
            .shadow{
                transform: scaleX(0.5) translateX(-600px);
            }
        }
        &.rounded-corners{
            .mods{
                .mod{
                    .basic{
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                    .child-front{
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                    .child-back{
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                    }
                }
            }
        }
        &.view-spine{
            transform: perspective(1000px) rotateY(60deg);
        }
        .spine{
            display: block;
            height: 300px;
            width: 20px;
            position: absolute;
            right: 100%;
            transform-origin: 100% 0 0;
            transform: rotateY(-90deg) perspective(1000px);
            &.okladka1{
                background-image: url(../images/cover1.jpg);
            }
            &.okladka2{
                background-image:url(../images/cover2.jpg);
            }
            &.okladka3{
                background-color: #a22;
            }
        }
        &.view-side-printing{
            transform: perspective(1000px) rotateY(-60deg);
            .mods{
                transform-style: preserve-3d;
                > div:last-child{
                    transform:translateZ(-23px) translateY(2px) scale(1.01);
                }
            }
        }
        .side-printing{
            display: block;
            height: 280px;
            width: 23px;
            position: absolute;
            left: 100%;
            top:10px;
            transform-origin: 0 0 0;
            transform: rotateY(90deg) translateZ(-8px) perspective(1000px);

            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f3e2c7+0,c19e67+50,b68d4c+51,e9d4b3+100;L+Brown+3D */
            background: #f3e2c7; /* Old browsers */
            background: -moz-linear-gradient(-45deg, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(-45deg, #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(135deg, #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3e2c7', endColorstr='#e9d4b3',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        }
        .shadow{
            background-image: url(../images/notebook-shadow.png);
            background-size: 100% 100%;
            background-color: transparent;
            display: block;
            opacity: 0.2;
            width: 400px;
            height: 50px;
            position: absolute;
            top:80%;
            transform:translateX(-200px) scaleY(1.1);
            transition: transform 500ms ease-in-out;
            z-index: -1;
        }
        .mods{
            perspective: 1000px;
            position: relative;
            // transform-style: preserve-3d;
            width: 200px;
            height:300px;
            .mod{
                position: absolute;
                top:0;
                left:0;
                display: inline-block;
                width: 100%;
                height:100%;
                transform-origin: 0px 50% 0px;
                transform: translateZ(0) rotateY(0) perspective(1000px);
                transform-style: preserve-3d;
                animation-name: paged-back;
                animation-duration: 1s;
                animation-iteration-count: 1;
                @keyframes paged {
                    0% {
                        transform: rotateY(0);
                    }
                    100% {
                        transform: rotateY(-180deg);
                    }
                }
                @keyframes paged-back {
                    0% {
                        transform: rotateY(-180deg);
                    }
                    100% {
                        transform: rotateY(0);
                    }
                }
                &.start-state{
                    animation-name: none;
                }
                &.on-top{
                    z-index: 999 !important;
                }
                &.otwarta{
                    transform: rotateY(180deg);
                    animation-name: paged;
                }
                .basic{
                    position: absolute;
                    top:0;
                    left:0;
                    width: 100%;
                    height: 100%;
                    box-shadow: inset 10px 0 120px -50px rgba(0,0,0,0.75);
                    z-index: 0;
                }
                .child-back{
                    position: absolute;
                    backface-visibility: hidden;
                    transform: rotateY(180deg);
                    top:0;
                    left:0;
                    box-shadow: inset 10px 0 120px -50px rgba(0,0,0,0.75);
                    z-index: 1;
                }
                .child-front{
                    position: absolute;
                    backface-visibility: hidden;
                    top:0;
                    left:0;
                    box-shadow: inset 10px 0 120px -50px rgba(0,0,0,0.75);
                    z-index: 1;
                }
                .child-front-1{
                    position: absolute;
                    backface-visibility: hidden;
                    top:0;
                    left:0;
                    box-shadow: inset 10px 0 120px -50px rgba(0,0,0,0.75);
                    z-index: 2;
                }
                .child-front-2{
                    position: absolute;
                    backface-visibility: hidden;
                    top:0;
                    left:0;
                    box-shadow: inset 10px 0 120px -50px rgba(0,0,0,0.75);
                    z-index: 3;
                }
                .cover{
                    background-color: darkgray;
                    background-position: left center, center;
                    background-size: auto 100%, 50%;
                    background-repeat: repeat-y, repeat;
                    box-shadow: inset -20px 0 120px -50px rgba(0,0,0,0.75);
                }
                .cover-nadruk{
                    background-image: url(../images/cover-logo.png);
                    background-size: 100% 100%;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .kartka{
                    background-color: #fff;
                    background-image: url(../images/kratka.png);
                    background-size: 100% 100%;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .kalendarz{
                    background-image: url(../images/calendar.png);
                    background-size: 100% 100%;
                    background-color: #fff;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .reklama{
                    background-image: url(../images/adv.jpg);
                    background-size: 100% 100%;
                    background-color: #D8AF60;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .strony-reklamowe{
                    background-color: #faa;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .wyklejka{
                    background-color: #888;
                    width: 195px;
                    height: 290px;
                    margin-top: 5px;
                }
                .banderola{
                    background-image: url(../images/banderola.jpg);
                    background-size: cover;
                    background-repeat: repeat-y;
                    background-color: #fff;
                    top:55%;
                    width: 100%;
                    height: 30%;
                    transform: scaleX(1.01);
                    box-shadow: 0 0 5px rgba(0,0,0,0.75);;
                }
                .gumka-zamykajaca{
                    background-image: url(../images/gumka-zamykajaca.png);
                    background-size: auto;
                    background-repeat: repeat-y;
                    background-color: #fff;
                    right: 30px;
                    left:auto;
                    width: 15px;
                    height: 100%;
                    transform: scaleY(1.01);
                    box-shadow: 0 0 5px rgba(0,0,0,0.75);
                }
                .gumka-uchwyt-dlugopis{
                    background-image: url(../images/gumka-uchwyt-dlugopis.png);
                    background-size: auto;
                    background-repeat: repeat-y;
                    background-color: #fff;
                    backface-visibility: visible;
                    right:auto;
                    left:~"calc(100% - 5px)";
                    width: 25px;
                    height: 30px;
                    top:40%;
                    box-shadow: 0 0 5px rgba(0,0,0,0.75);;
                }
                .okladka1{
                    background-image: url(../images/shadow.png), url(../images/cover1.jpg);
                    background-color: darkgray;
                    background-position: left center, center;
                    background-size: auto 100%, 50%;
                    background-repeat: repeat-y, repeat;
                    box-shadow: inset -20px 0 120px -50px rgba(0,0,0,0.75);
                }
                .okladka2{
                    background-image: url(../images/shadow.png), url(../images/cover2.jpg);
                    background-color: darkgray;
                    background-position: left center, center;
                    background-size: auto 100%, 50%;
                    background-repeat: repeat-y, repeat;
                    box-shadow: inset -20px 0 120px -50px rgba(0,0,0,0.75);
                }
                .okladka3{
                    background-color: #a22;
                    background-position: left center, center;
                    background-size: auto 100%, 50%;
                    background-repeat: repeat-y, repeat;
                    box-shadow: inset -20px 0 120px -50px rgba(0,0,0,0.75);
                }
            }
        }
    }
    form{
        .form-group{
            border:1px solid #000;
        }
    }
    .controls{
        align-items: center;
        .buttons{
            margin-top: 20px;
        }
    }
}
</style>
