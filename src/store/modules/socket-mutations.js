export default {
  notifyRenamedPresentation (state, {socket, title}) {
    socket.emit('renamed-presentation', {
      presentationId: state.presentation.id,
      newTitle: title
    })
  },

  notifyCreatedElement (state, {socket, elements}) {
    socket.emit('created-element', elements)
  }
}
