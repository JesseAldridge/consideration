console.log('window.js 1');
$(() => {
  console.log('window.js 2');
  $('canvas').addEventListener('click', function() { console.log('clicked canvas') }, false);
})
