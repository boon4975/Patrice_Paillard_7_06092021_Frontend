<template>
  <div class="about">
    <NavMenu />
    <h1>This is an about page</h1>
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
          <button v-on:click="submitFile()">Submit</button>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import env from '../env';
import NavMenu from '../components/NavMenu.vue'
export default {
  name: 'about',
  components: {
    NavMenu
  },
  data(){
      return {
        file: ''
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);
            formData.append('id', 1)

        /*
          Make the request to the POST /single-file URL
        */
            axios.put( `http://${env.host}:${env.port}/api/post/image`,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
}
</script>
