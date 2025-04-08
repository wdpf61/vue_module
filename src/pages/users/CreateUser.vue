<template>
 <form @submit.prevent="createUser" id="add_employee_form" enctype="multipart/form-data">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add User
                                                </h1>
                                                {{ userData }}
                                                <button type="button" class="btn-close m-0" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">

                                                <div class="employee mb-3">
                                                    <input type="hidden" id="id-field">
                                                    <label class="form-label">User :</label>
                                                    <input v-model="userData.name" class="form-control" type="text"
                                                        id="employee-field" placeholder="user" required="">
                                                </div>

                                                <div class="email mb-3">
                                                    <label class="form-label">Email :</label>
                                                    <input v-model="userData.email" class="form-control" type="email"
                                                        id="email-field" placeholder="email" required="">
                                                </div>

                                                <div class="contact mb-3">
                                                    <label class="form-label">Mobile :</label>
                                                    <input v-model="userData.mobile" class="form-control" type="text"
                                                        id="contact-field" placeholder="contact" required="">
                                                </div>

                                                <div class="date mb-3">
                                                    <label class="form-label">Photo :</label>
                                                    <input @change="onFileChange" class="form-control" type="file"
                                                        id="date-field" required="" name="photo">
                                                </div>

                                                <div class="status mb-3">
                                                    <label class="form-label">Role</label>
                                                    <select v-model="userData.role_id" class="form-select"
                                                        id="status-field" aria-label="Default select example">
                                                        <option selected disabled value="">Select Role</option>
                                                        <option v-for="role in roles" :key="role.id"
                                                            :value="`${role.id}`">{{ role.name }}</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="modal-footer add">
                                                <input type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                    value="Close">
                                                <input type="submit" class="btn btn-primary" id="add-btn" value="Add">
                                                <button class="btn btn-success" id="edit-btn"
                                                    style="display: none;">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
</template>

<script setup>

</script>

<style>

</style>