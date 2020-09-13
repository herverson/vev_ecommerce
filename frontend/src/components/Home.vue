<template>
  <v-container>
    <v-row dense>
      <!-- <v-col v-for="product in products" :key="product.id" :cols="4"> -->
      <v-col v-for="product in products" :key="product.id" sm="6" md="4">
        <v-card>
          <v-img
            :src="product.images"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="250px"
          ></v-img>
          <v-card-title v-text="product.title"></v-card-title>
          <v-card-text style="position: relative;">
            <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              large
              right
              top
              @click="addItem(product)"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-row align="center" class="mx-0">
              <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 subtitle-1">{{ formatMoney(Number(product.price)) }}</div>

            <div>{{ product.description }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-col class="md-12">
      <h5>Pedidos #{{ order.id }}</h5>
      <hr />
      <div v-if="order.orderItems.length === 0">
        <br />
        <br />
        <h5>Escolha os items do pedido</h5>
      </div>
      <v-row v-for="orderItem in order.orderItems" v-bind:key="orderItem.item.id">
        <v-col class="md-1">{{ orderItem.quantity }}</v-col>
        <v-col class="md-5">{{ orderItem.item.title }}</v-col>
        <v-col class="md-3">{{ formatMoney(orderItem.quantity * orderItem.item.price) }}</v-col>
        <v-btn icon @click="deleteItem(orderItem.item)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-row>
      <br />
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            v-bind="attrs"
            v-on="on"
          >Confirmar ({{ formatMoney(Number(order.total)) }})</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Extrato do seu pedido #{{ order.id }}</v-card-title>
          <v-col cols="12">
            <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dados da Entrega</v-list-item-title>
              <v-list-item-subtitle>Las Vegas do Piauí , 170 - Piauí</v-list-item-subtitle>
              <v-list-item-subtitle>Francisco Santo</v-list-item-subtitle>
              <v-list-item-subtitle>Picos, PI-64600-000</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
            </v-list>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-card-text>Produtos</v-card-text>
            <v-row v-for="orderItem in order.orderItems" v-bind:key="orderItem.item.id">
              <v-col class="md-1">{{ orderItem.quantity }}</v-col>
              <v-col class="md-5">{{ orderItem.item.title }}</v-col>
              <v-col class="md-3">{{ formatMoney(orderItem.quantity * orderItem.item.price) }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            Total {{ formatMoney(Number(order.total)) }}
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios/dist/axios";
export default {
  name: "Home",
  data: () => ({
    dialog: false,
    products: [],
    loading: false,
    selection: 1,
    messages: 0,
    show: false,
    order: {
      id: Math.floor(Math.random() * 10000),
      orderItems: [],
      total: 0.0,
    },
  }),
  mounted() {
    axios.get("http://localhost:3000/products").then((response) => {
      this.products = response.data;
      // console.log("chama", this.products)
    });
  },
  methods: {
    addCart(value) {
      this.$emit("addCart", value);
    },
    formatMoney(value) {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formatter.format(value);
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    addItem(item) {
      const orderItem = this.order.orderItems.find(
        (orderItem) => orderItem.item.id === item.id
      );
      if (!orderItem) {
        this.order.orderItems.push({
          quantity: 1,
          item,
        });
      } else {
        orderItem.quantity++;
      }
      this.order.total += Number(item.price);
      this.addCart(1);
      console.log(this.order.total);
    },
    deleteItem(item) {
      const orderItem = this.order.orderItems.find(
        (orderItem) => orderItem.item.id === item.id
      );
      if (!orderItem) return;
      if (orderItem.quantity === 1) {
        this.order.orderItems.splice(
          this.order.orderItems.indexOf(orderItem),
          1
        );
      } else {
        orderItem.quantity--;
      }
      this.order.total -= Number(item.price);
      this.addCart(-1);
    },
  },
};
</script>