<template>
<hr />
    <div class="container">
      <div class="formfield w-100 py-3">
        <label for="file" class="btn btn-info" tabindex="1">Ajout / modifier une image</label>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept=".jpeg, .jpg, .png, .gif" aria-controls="button"/>
            <br/>
            
            <div class="picture my-1">
                <div class="picture__cadre">
                    <img src="#" alt="" id="image">
                </div>
            </div>
            <span v-if="uploadedFile">file : {{uploadedFile}}</span>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'File',
    computed: {
        ...mapState([
            'user_id',
            'email',
            'moderator',
            'pseudo',
            'token',
            'url_image'
            ])
    },
    data(){
        return {
            uploadedFile: '',
            
        }
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            let image = document.getElementById("image");
        // limit formats autorisés et taille à 1Mo
            let types = [ "image/jpg", "image/jpeg", "image/png", "image/gif" ];
            if (types.includes(this.file.type) && this.file.size < 1000000) {
        //affiche preview du fichier avant UPLOAD
                image.src = URL.createObjectURL(this.file)
                this.uploadedFile = this.file.name;
        //transfert du formData au composant EditTopic
                this.$emit('upfile', this.file)
            }else{
                if(this.file.size > 1000000){
                    alert('votre image ne doit pas dépasser 1 Mo')
                }
                alert('Formats image autorisés: .jpg, .jpeg, .png, . gif')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    width: 10px;
	height: 10px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
    & + label {
        font-size: 1.25em;
        font-weight: 700;
        color: white;
        background-color: black;
        display: inline-block;
        cursor: pointer;
    }
    &:focus  + label, input + label:hover {
        background-color: red;
    }
}
.picture__cadre {
    max-width: 200px;
}
</style>