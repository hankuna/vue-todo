<template>
    <div class="haha">
		<h3 class="big-title">添加任务：</h3>
		<input  
			placeholder="在此添加任务" 
			class="task-input" 
			type="text"
			v-model="things"
			@keyup.enter="addTodo"
		/>
		<input class="btn-input" type="button" @click="addTodo" value="+" />
		<ul class="task-count" v-show="list.length">
			<li>
				{{unCheckedLength}}个任务未完成</li>
			<li class="action">
				<a :class="{active: visibility !== 'unfinished' && visibility !== 'finished'}" href="javascript:;" @click="setType('all')">所有任务</a>
				<a :class="{active: visibility == 'unfinished'}" href="javascript:;" @click="setType('unfinished')">未完成任务</a>
				<a :class="{active: visibility == 'finished'}" href="javascript:;" @click="setType('finished')">完成任务</a>
			</li>
			<li>
				<button @click="clearFinished" v-show="list.some((i)=>i.isChecked)">清除所有已完成</button> 
			</li>
		</ul>
		<div class="tasks">
			<span class="no-task-tip" v-show="!list.length">还没有添加任何任务</span>
			<ul class="todo-list">
				<li class="todo" v-for="(item, index) in filteredList" :class="{completed: item.isChecked,editing:item === editItem}" :key="index">
					<div class="view">
						<div class="word">
							<input class="toggle" type="checkbox" v-model="item.isChecked" >
							<label @dblclick="editTodo(item)">{{item.title}}</label>
						</div>
						<button class="destroy" type="text" @click="deleteTodo(item)">×</button>

					</div>
					<input 
						v-focus="editItem === item" 
						class="edit" 
						type="text" 
						v-model="item.title"
						@blur="edited"
						@keyup.enter="edited"
						@keyup.esc="cancel(item)"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list = store.fetch("todolist");

var filter = {
	all:function(list){
		return list
	},//所有任务
	finished:function(list){
		return list.filter(function(item) {
			return item.isChecked;
		});
	},//未完成任务
	unfinished:function(list){
		return list.filter(function(item) {
			return !item.isChecked;
		});//完成任务
	}
}
export default {
	name: "haha",
	data: function () {
		return {
			list:list,
			things:"",
			editItem:"",
			beforeTitle:"",
			visibility:"all",
			inputId:""
		}
	},	
	created () {
		this.visibility = window.localStorage.getItem('hash') || 'all'
	},
	watch:{
		list:{
			handler:function(){
				store.save("todolist",this.list)
			},
			deep:true
		}
	},
	computed:{
		unCheckedLength(){
			return this.list.filter(function(item){
				return item.isChecked == false
			}).length
		},
		filteredList(){			
			return filter[this.visibility] ? filter[this.visibility](this.list) : list
		}
	},
	methods: {
		setType (type) {
			this.visibility = type
			window.localStorage.setItem('hash', type)
		},
		addTodo(ev){
			if(this.things !== ""){
				var item = {
					title:this.things,
					isChecked:false,	
				}
				this.list.push(item)
			}				
			this.things = "";
		},
		deleteTodo(item){
			var index = this.list.indexOf(item);
			this.list.splice(index,1);
		},
		editTodo(item){	
			this.beforeTitle = item.title;
			this.editItem = item
		},
		edited(item){
			this.editItem = ""
		},
		cancel(item){
			item.title =  this.beforeTitle;
			this.editItem = "";
			this.beforeTitle = ""
		},
		clearFinished () {
			this.list = this.list.filter((i) => {
				return !i.isChecked
			})
		},//删除
	},
	directives:{
		"focus":{									
			update(el,binding){
				if(binding.value){
					el.focus()
				}
			}
		}
	}
}
</script>

<style lang="stylus">
*
	padding 0
	margin 0

h1,h2,h3,p,span,li,ul,input
	font-family 'Songti SC', 'STIX',serif

ul li
	list-style none

a,ahover
	text-decoration none
	color black

.page-top,
.page-content
	height 150px

.page-content
	display flex
	justify-content center

.page-content h2
	font-family Georgia
	colorrgb(206, 46, 255)
	-webkit-mask-image -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.3)), color-stop(40%, rgba(0, 0, 0, 0.91)),to(rgba(0, 0, 0, 0.83)))
	font-size 80px
	padding-top 60px
	position relative

.page-content h2afte
	position absolute
	left 0px
	content "Todo List"
	colorrgba(247, 44, 44, 0.97)
	-webkit-mask-image -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0.32)), color-stop(40%, rgba(0, 0, 0, 0.48)),to(rgb(0, 0, 0)))

.haha
	width 56%
	margin 0 auto
	position relative

.action a
	margin 0 8px

.action a.active
	background-color rgba(243, 43, 43, 0.82)
	color white
	padding 2px

.task-input
	outline none
	font-size 22px
	width 98%
	padding-left 10px
	height 2em
	margin-top 20px

.btn-input
	cursor pointer
	outline none
	color #43b0f7
	font-size 35px
	background transparent
	border-color transparent
	right 17px
	top 45px
	position absolute
	height 44px
	width 44px

.completed label
	text-decoration line-through
	color #777777

.task-count
	display flex
	justify-content space-between
	margin-top 20px

.tasks
	margin-top 20px

.big-title
	margin-top 20px

.todo
	font-size 22px
	line-height 2em
	margin 10px
	border-bottom 1px solid #f1f1f1

.view
	height 46px	
	display flex
	align-items center
	justify-content space-between

.destroy
	color #e41616
	font-size 26px
	border 1px solid transparent
	background-color transparent
	outline none
	cursor pointer
	margin-right 20px

.word
	display flex
	align-items center

li.editing .view
	display none

li.editing input
	margin-left 34px
	outline none
	display block
	height 42px
	width 80%
	font-size 22px

input.edit
	display none

input.show
	display block

.toggle
	outline none
	margin-right 16px
	-webkit-appearance none
	appearance none
	cursor pointer
	height 20px
	width 20px
	position relative
	border-radius 50%
	border 1px solid #bfcbd9
	transition all .3s

.toggle::after
	content ''
	transition all .3s

.toggle:checked
	background-color #659aea
	border-color #659aea

.toggle:checked::after
	content ''
	background-color #ffffff
	border-radius 50%
	width 6px
	height 6px
	position absolute
	transform translate(-50%, -50%)
	left 50%
	top 50%

</style>