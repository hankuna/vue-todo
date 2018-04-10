<template>
  <div id="vue-todolist" class="todolistDiv">
    <span>todolist</span>
    <input class="ipt" type="text" v-model="inputVaule" v-on:keyup.enter="add"/>
    <button v-on:click="add" class="btn">add</button>
    <ul>
      <li v-for="(item,index) in items" :key="index">
        <div class="liDiv">
          <input type="checkbox" v-model="item.completed">
          <label v-bind:class="{complete:item.completed}">{{item.text}}</label>
          <button v-on:click="removeTodo(item)" class="btn">X</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "todo",
  data() {
    return {
      items:[
        {text:'1',completed:true},
        {text:'2',completed:false}
      ],
      inputVaule: ""
    }    
  },
  methods:{
    add:function(){
      this.items.push({text:this.inputVaule});
      this.inputVaule=""
    },
    removeTodo: function(todo){
      this.items.splice(this.items.indexOf(todo),1)
    }
  }
}
</script>

<style lang="stylus">
  .todolistDiv
    width 500px
    height 500px
    margin 0 auto
    background-color yellow 
    border 1px solid #ccc
</style>
