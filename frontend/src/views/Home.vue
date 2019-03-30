<template>
  <div class="container-fluid">
      <div class="text-center">
        <h1>Nest Customer List App Tutorial</h1>
       <p> Built with Nest.js, Vue.js and MongoDB</p>
       <div v-if="customers.length === 0">
            <h2> No customer found at the moment </h2>
        </div>
      </div>

        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="customer in customers" :key="customer._id">
                  <td>{{ customer.firstName }}</td>
                  <td>{{ customer.lastName }}</td>
                  <td>{{ customer.email }}</td>
                  <td>{{ customer.phone }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ customer.description }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  <router-link :to="{name: 'edit', params: {id: customer.id}}" class="btn btn-sm btn-outline-secondary">Edit Customer </router-link>
                                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteCustomer(customer.id)">Delete Customer</button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { server } from "@/helper.js"
import axois from 'axios'

export default {
  name: 'home',
  data() {
    return {
      customers: [],
    }
  }, 
  created() {
    this.fetchCustomers();
  },
  methods: {

    deleteCustomer(id) {
      axois.delete(`${server.BaseUrl}/customers/${id}`).then(data => {
        window.location.reload();
      });
    },

    fetchCustomers() {
      axois.get(`${server.BaseUrl}/customers`)
        .then( (data) => {
          this.customers = data.data.customers
        });
    }
  }
}
</script>
