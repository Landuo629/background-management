<script>
export default (context) => {
  const { props, listeners: { aclick = () => {} }, children } = context
  return (<div onClick={() => aclick(1)}>{props.a}{children}</div>)
}
</script>
