<template>
    <div>
        <h1>colaboradores</h1>


        <div>
            <label for="">Id</label><br>
            <input type="text" v-model="colaborador.id"><br>
            <br>
            <label for="">Nombre de colaborador</label><br>
            <input type="text" v-model="colaborador.nombre_colaborador"><br>
            <br>
            <label for="">Fecha de nacimiento</label><br>
            <input type="text" v-model="colaborador.fecha_nacimiento"><br>
            <br>
            <label for="">RFC</label><br>
            <input type="text" v-model="colaborador.rfc"><br>
            <br>
            <label for="">Fecha inicio</label><br>
            <input type="text" v-model="colaborador.fecha_inicio"><br>
            <br>
            <label for="">Estado de colaborador</label><br>
            <input type="text" v-model="colaborador.estado_colaborador"><br>
            <br>
            <label for="">Area</label><br>
            <input type="text" v-model="colaborador.area"><br>
            <br>
            <button v-on:click="guardar()">Guardar</button>
            <button v-on:click="actualizar()">Actualizar</button>
            <button v-on:click="eliminar()">Eliminar</button>
            <button v-on:click="buscar()">Buscar</button>
        </div>
        <table border="1">
            <thead align="center">
               <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Fecha de nacimiento</td>
                    <td>RFC</td>
                    <td>Fecha inicio</td>
                    <td>Estado</td>
                    <td>Area</td>
                </tr> 
            </thead>
            <tbody>
                <tr v-for="colaborador in colaboradores" :key="colaborador._id">
                    <td>{{colaborador._id}}</td>
                    <td>{{colaborador.nombre_colaborador}}</td>
                    <td>{{colaborador.fecha_nacimiento}}</td>
                    <td>{{colaborador.rfc}}</td>
                    <td>{{colaborador.fecha_inicio}}</td>
                    <td>{{colaborador.estado_colaborador}}</td>
                    <td>{{colaborador.area}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
export default{
   data(){
       return {
           colaborador: {
                id: "",
                nombre_colaborador: "",
                fecha_nacimiento: "",
                rfc: "",
                fecha_inicio: "",
                estado_colaborador: "",
                area: ""
           },
           colaboradores: null
       }
   },
   mounted(){
       this.getColaboradores();
   },
   methods: {
     async getColaboradores(){
         axios.get('http://localhost:3000/colaboradores')
           .then(response => {
                this.colaboradores = response.data;
           }).catch( e => console.log(e));
       },
       guardar(){
           axios.post('http://localhost:3000/colaborador', this.colaborador)
           .then(response => {
               console.log(response);
               this.getColaboradores();
           }).catch(e=> console.log(e));
       },
       actualizar(){
           axios.put('http://localhost:3000/colaborador/' + this.colaborador.id, this.colaborador)
           .then(response => {
                console.log(response);
                this.getColaboradores();
           }).catch(e => console.log(e));
       },
       eliminar(){
           axios.delete('http://localhost:3000/colaborador/' + this.colaborador.id)
           .then(response => {
               console.log(response);
               this.getColaboradores();
           }).catch(e => console.log(e));
       },
       buscar(){
           axios.get('http://localhost:3000/colaborador/' + this.colaborador.id)
           .then(response => {
               console.log(response.data)
                this.colaborador = {
                id: response.data._id,
                nombre_colaborador: response.data.nombre_colaborador,
                fecha_nacimiento: response.data.fecha_nacimiento,
                rfc: response.data.rfc,
                fecha_inicio: response.data.fecha_inicio,
                estado_colaborador: response.data.estado_colaborador,
                area: response.data.area
           };
          
           }).catch( e => console.log(e));
       }
   }
}
</script>
<style>

</style>