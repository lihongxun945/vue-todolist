var Form = Vue.extend({
  props: {
    username: {
      type: String,
      default: "Unnamed"
    }
  },
  data: function() {
    return {
      input: "",
    };
  },
  template: `
    <h1>{{username}}'s Todo List</h1>
    <form v-on:submit="add" v-on:submit.prevent>
      <input type="text" v-model="input"/>
      <input type="submit" value='add' />
    </form>
    `,
  methods: {
    add: function() {
      this.$dispatch("add", this.input);
      this.input = "";
    }
  }
});

var List = Vue.extend({
  template: `
    <ul>
      <li v-for='todo in list'>
        <label v-bind:class="{ done : todo.done }" >
          <input type="checkbox" v-model="todo.done"/>
          {{todo.title}}
        </label>
      </li>
    </ul>`,
  props: {
    initList: {
      type: Array
    }
  },
  data: function() {
    return {
      list: []
    }
  },
  events: {
    add: function(input) {
      if(!input) return false;
      this.list.unshift({
        title: input,
        done: false
      });
    }
  }
});

var Todo = Vue.extend({
  template: `
  <div id="todo">
    <todo-form username='Lily'></todo-form>
    <todo-list></todo-list>
    <slot>not show</slot>
  </div>
  `,
  components: {
    "todo-form": Form,
    "todo-list": List
  },
  events: {
    add: function(input) {
      this.$broadcast("add", input);
    }
  }
});


var About = Vue.extend({
  template: `
  <div id="about">
    <p>About Todo List V0.1.0</p>
    <p>Content here</p>
  </div>`
});

var vm = new Vue({
  el: "body",
  data: {
    currentView: "todo"
  },
  components: {
    "todo": Todo,
    "about": About
  }
});
