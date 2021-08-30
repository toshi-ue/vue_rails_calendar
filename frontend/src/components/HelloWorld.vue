<template>
  <div>
  <div v-if="visility">
    <p>visility: true</p>
    <p>{{message}}</p>
  </div>
  <div v-else>
  <p>visility: false</p>
  </div>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{item.text}}</li>
    </ul>
  </div>
  <button @click="clickedEvent()">ボタン</button>
  <div>
    <p>{{formMessage}}</p>
    <input v-model="formMessage">
  </div>
  </div>
</template>

<script>
export default{
  name: 'HelloWorld',
  data:()=>({
    formMessage: 'form message',
    message: 'Hello World!',
    visility: true,
    items:[
      {id:1, text: 'アイテム1'},
      {id:2, text:'アイテム2'},
      {id:3, text:'アイテム3'}
    ]
  }),
  methods:{
    clickedEvent(){
      console.log('clicked');
    }
  }
};
</script>
