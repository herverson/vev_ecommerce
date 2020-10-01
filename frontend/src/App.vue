<template>
  <v-app>
    
    <v-app-bar app color="primary" dark>
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/images/logo_transparent.png"
          transition="scale-transition"
          width="180"
        />
      </div> -->

      <v-spacer></v-spacer>
      <v-badge :content="count" :value="count" color="green" overlap>
        <v-icon large @click="dialog = true">mdi-cart</v-icon>
      </v-badge>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">V&V Ecommerce</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home v-on:addCart="addCart" />
    </v-main>
    <v-col class="md-12">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline"
            ><h5>Pedido #{{ order.id }}</h5></v-card-title
          >
          <v-divider></v-divider>
          <v-col cols="12">
            <div v-if="order.orderItems.length === 0">
              <br />
              <br />
              <h5>Escolha os items do pedido</h5>
            </div>
            <v-row
              v-for="orderItem in order.orderItems"
              v-bind:key="orderItem.item.id"
            >
              <v-col class="md-1">{{ orderItem.quantity }}</v-col>
              <v-col class="md-5">{{ orderItem.item.title }}</v-col>
              <v-col class="md-3">{{
                formatMoney(orderItem.quantity * orderItem.item.price)
              }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            Total {{ formatMoney(Number(order.total)) }}
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-app>
</template>

<script>
import Home from "./components/Home";
export default {
  name: "App",
  components: {
    Home,
  },
  data: () => ({
    dialog: false,
    count: 0,
    show: false,
    order: {
      id: Math.floor(Math.random() * 10000),
      orderItems: [],
      total: 0.0,
    },
  }),
  methods: {
    addCart(value) {
      this.order = value;
      var total = 0;
      this.order.orderItems.map((order) => (total += order.quantity));
      this.count = total;
    },
    formatMoney(value) {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formatter.format(value);
    },
  },
};
</script>