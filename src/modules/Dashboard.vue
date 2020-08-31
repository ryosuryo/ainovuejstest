<template>
  <div>
    <!-- <h1>Hi, {{ account.user.username }}!</h1>
    <p>Menu</p> -->
    <em v-if="category.loading">Loading Katalog...</em>
    <span v-if="category.error" class="text-danger">ERROR: {{ category.error }}</span>
    <div class="col-md-12 offset-md-4">
      <ul v-if="category.items">
        <li v-for="cat in category.items" :key="cat.id">
          <button
            type="button"
            class="btn btn-lg btn-outline-primary"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </li>
      </ul>
    </div>
    <em v-if="product.loading">Loading product...</em>
    <div class="container" v-if="product.items">
      <div class="card-deck mb-3 text-center">
        <div
          v-for="prod in product.items.data"
          :key="prod.id"
          class="card mb-4 box-shadow rounded p-3"
        >
          <img
            class="card-img-top"
            :src="prod.imageUrl"
            @error="imageUrlAlt"
            alt="Image Not Found"
          />
          <div class="card-body">
            <h5 class="card-title">{{ prod.name }}</h5>
            <p class="card-text">{{ prod.description }}</p>
            <a href="#" class="btn btn-primary">Rp. {{ prod.price }}</a>
            <div v-if="prod.rating">
              <span class="fa fa-star checked" v-for="n in prod.rating" :key="n"></span>
              <span class="fa fa-star" v-for="n in 5 - prod.rating" :key="n + prod.rating"></span>
            </div>
            <p class="card-text">
              <small class="text-muted">Reviews : {{ prod.review }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/masuk">
      <button type="button" class="btn btn-outline-danger">Logout</button>
    </router-link>

    <p></p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
export default {
  name: "Dashboard",
  data: function() {
    return {
      page: 1,
      selectedCategory: 0,
      limit: 10
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      category: state => state.katalog.category,
      product: state => state.katalog.product
    })
  },
  created() {
    this.getAllCategory();
  },
  methods: {
    ...mapActions("katalog", {
      getAllCategory: "getAllCategory",
      getProductByID: "getProductByID"
    }),
    imageUrlAlt: function(event) {
      event.target.src =
        "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg.webp";
    },
    selectCategory: function(id) {
      this.selectedCategory = id;
      this.getProductByID({
        id: this.selectedCategory,
        page: this.page,
        limit: this.limit
      });
    },
    handleClickPage: function(value) {
      this.page = value;
      this.getProductByID({
        id: this.selectedCategory,
        page: this.page,
        limit: this.limit
      });
    },
    onChangeLimit: function(event) {
      this.limit = event.target.value;
      this.getProductByID({
        id: this.selectedCategory,
        page: this.page,
        limit: this.limit
      });
    }
  }
};
</script>
<style scoped>
ul {
  overflow: auto;
  list-style-type: none;
}
li {
  float: left;
  margin: 0;
  padding: 0;
  padding-left: 40px;
}
.custom-select {
  width: 100px;
}
</style>
