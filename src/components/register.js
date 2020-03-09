import Vue from 'vue'
import Bread from './Bread'
import Footer from './Footer'
import Header from './Header'
import Modal from './Modal'

let compontents = [Bread, Footer, Header, Modal]

compontents.forEach(item => {
  Vue.component(item.name, item)
})
