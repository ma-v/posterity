const printMap = () => {
  var a3Size = {
  width: 2339,
  height: 3308,
  className: 'a3CssClass',
  tooltip: 'A custom A3 size'
  }
  document.printer = L.easyPrint({
  title: 'My awesome print button',
  position: 'bottomright',
  exportOnly: true,
  hidden: true,
  sizeModes: [a3Size]
  }).addTo(document.map);
}

export { printMap };