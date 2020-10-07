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
      <v-badge :content="count" :value="count" color="red" overlap>
        <v-icon large @click="extract = true">mdi-cart</v-icon>
      </v-badge>
      <v-btn
        href="https://github.com/herverson/vev_ecommerce"
        target="_blank"
        text
      >
        <span class="mr-2">V&V Ecommerce</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home v-bind:order="order" v-on:addCart="addCart" />
    </v-main>
    <v-col class="md-12">
      <v-dialog
        content-class="rounded-br-xl rounded-tl-xl"
        v-model="extract"
        max-width="600px"
      >
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
              <v-btn icon @click="deleteItem(orderItem.item)">
                <v-icon color="red">mdi-minus</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="extract = false, dialog = true"
              >Confirmar ({{ formatMoney(Number(order.total)) }})</v-btn
            >
            <v-btn color="green darken-1" text @click="extract = false"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline"
            >Extrato do seu pedido #{{ order.id }}</v-card-title
          >
          <v-col cols="12">
            <v-list three-line subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Dados da Entrega</v-list-item-title>
                  <v-list-item-subtitle
                    >Las Vegas do Piauí , 170 - Piauí</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>Francisco Santo</v-list-item-subtitle>
                  <v-list-item-subtitle
                    >Picos, PI-64600-000</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-card-text>Produtos</v-card-text>
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
            <v-btn
              color="green darken-1"
              text
              @click="(dialog = false), clear()"
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
    extract: false,
    dialog: false,
    count: 0,
    show: false,
    order: {
      id: Math.floor(Math.random() * 10000),
      orderItems: [],
      total: +0.0,
    },
  }),
  methods: {
    clear() {
      this.order = {
        id: Math.floor(Math.random() * 10000),
        orderItems: [],
        total: 0.0,
      };
      this.addCart(this.order);
    },
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
      this.addCart(this.order);
    },
  },
};
</script>