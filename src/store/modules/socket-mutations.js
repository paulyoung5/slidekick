export default {
  notifyRenamedPresentation (state, {title}) {
    state.socket.emit('renamed-presentation', {
      presentationId: state.presentation.id,
      newTitle: title
    })
  },

  notifyCreatedElement (state, {elements}) {
    state.socket.emit('created-element', elements)
  }
}
