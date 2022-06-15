<script>
import jsx from './jsx.vue'
export default {
  methods: {
    aclick(e) {
      console.log(e)
    }
  },
  render(h) {
    return (<jsx a={135} onAclick={this.aclick}></jsx>)
  }
}
</script>
