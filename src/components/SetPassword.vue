<template>
    <input type="password" @keydown="getKeyCode($event)" @keyup="getPassword($event.target.value)" placeholder="Nouveau mot de passe" title="mini 8 caractères + 1 Maj + 1 min + 1 caractères spécial" class="form-control">
    <input type="password" @keyup="getConfirm($event.target.value)" placeholder="Confirmez le mot de passe" class="form-control">

    <div class="ligne">
        <div class="box box--ok" v-if="maj" ><p>A</p></div>
        <div class="box box--ko" v-if="!maj" ><p>A</p></div>

        <div class="box box--ok" v-if="min"><p>a</p></div>
        <div class="box box--ko" v-if="!min"><p>a</p></div>

        <div class="box box--ok" v-if="special"><p>Spécial</p></div>
        <div class="box box--ko" v-if="!special"><p>Spécial</p></div>

        <div class="box box--ok" v-if="chiffre"><p>Chiffre</p></div>
        <div class="box box--ko" v-if="!chiffre"><p>Chiffre</p></div>

        <div class="box box--ok" v-if="longueur"><p>8+</p></div>
        <div class="box box--ko" v-if="!longueur"><p>8+</p></div>
 
    </div>
</template>

<script>

export default {
    name: 'SetPassword',
    
    data(){
        return {
            maj: false,
            min: false,
            chiffre: false,
            special: false,
            longueur: false,
            keystroke:'',
        }
    },
    methods: {
        getConfirm(confirmpwd){
            this.$emit('confirmpwd', confirmpwd)
        },
        getPassword(value){
            //itération de value par caractère
            this.validRegEx(value)

            //définit les keyCode déclancheurs => reset des valideurs + iteration value
            let actionKey = [8,37,38,39,40,46]
            if(actionKey.includes(this.keystroke)){
                //reset des valideurs
                this.min = false;
                this.maj = false;
                this.chiffre = false;
                this.special = false;
                this.longueur = false;
                this.validRegEx(value)
            }
            this.$emit('password', value)
        },
        getKeyCode(e) {
            this.keystroke = e.keyCode;
            console.log(this.keystroke)
        },
        validRegEx(value){
            //init des RegEx
            const regmin = /[a-z]/;
            const regmaj = /[A-Z]/;
            const regchiffre = /[0-9]/;
            const regspecial = /[.:'!@#$%&*_+=|(){}[?\-\]/\\]/
            //itération de value letter par letter
            for(let i=0; i < value.length; i++){
                    let letter = value.substring(i, i+1)
                    //aplique les regex
                    const minuscule = letter.match(regmin)
                    const majuscule = letter.match(regmaj)
                    const chiffre = letter.match(regchiffre)
                    const special = letter.match(regspecial)
                    //maj PROPS
                    if(minuscule){
                        this.min = true
                    }if(majuscule){
                        this.maj = true
                    }if(chiffre){
                        this.chiffre = true
                    }if(special){
                        this.special = true
                    }if (i >= 7){
                        this.longueur = true
                    }
                }
        }
    }
}
</script>

<style lang="scss" scoped>
$duration : 300ms;
$delay : $duration - 1;
$turn : 2turn;

.ligne {
    display: flex;
    justify-content: center;
}
.box {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 50px;
    margin: 5px;
    &--ok {
        border-top: 1px green dashed;
        animation: circleturn $duration cubic-bezier(0.075, 0.82, 0.165, 1) both;
        & > p {
            opacity: 0;
        animation: circleturn2 1ms both;
        animation-delay: $delay;
        }
    }
    &--ko {
        border: 1px red dashed;
    }
    
    & p {
        position: relative;
        top: 15px;
        font-size: 11px;
        font-weight: bold;
        
    }
}

@keyframes circleturn {
    0% {
        transform: rotate(0turn);
        opacity: 1;
    }
    25%{
        border-right: 1px red dashed
    }
    50%{
        border-left: 1px rgb(0, 128, 90) dashed
    }
    100%  {
        transform:  rotate($turn);
        opacity: 1;
        border: 1px green solid;
    }
}
@keyframes circleturn2 {
    0% {
        transform: rotate(0deg);
        opacity: 0;
    }
    90% {
        transform: rotate(-359deg);
        opacity: 0.5;
    }
    100%  {
        transform:  rotate(-360deg);
        opacity: 1;
    }
}
</style>

