export default function (vm, socket) {
  socket.on('connect', () => {
    console.info('Connected to server socket')

    socket.emit('joined-room', {
      presentationId: vm.$route.params.presentationId,
      user: vm.current_user
    })
  })

  socket.on('renamed-presentation', newTitle => {
    console.info('received a rename event')
    vm.updateTitle(newTitle)
  })

  socket.on('created-element', newTitle => {
    console.info('received a rename event')
    vm.updateTitle(newTitle)
  })

  socket.on('modified-slides', slides => {
    console.info('Received a modified-slides event')
    vm.setSlides(slides)
  })
}
