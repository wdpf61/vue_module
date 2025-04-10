<template>
  <div>
       Grand Parent

       <hr>

        <Parents garanChildname="Raqeebul Hasan">
            <h1>My Children History</h1>
            <p> My first Child born in 2000 </p>
            
            <template #footer>

              The conclusion

            </template>
        </Parents>

        <div>
      <h1>📦 Teleport Example</h1>
      <button @click="showModal = true">Open Modal</button>
  
      <teleport to="body">
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <h2>This is a modal</h2>
            <p>Rendered using &lt;teleport&gt;</p>
            <form action="" method="post">
                <label class="form-control" for="name">Name</label> 
                <input type="text" name="name" class="form-control">
            </form>
            <button @click="showModal = false">Close</button>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script  setup>
import { provide } from 'vue';
import Parents from './Parents.vue';
import { ref } from 'vue'
  
const showModal = ref(false)
provide("secondChild", "Fahim");

</script>

<style scoped>
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content{
  background: white;
  padding: 2rem;
  border-radius: 10px;
  height: 400px;
  width: 300px;
}
</style>