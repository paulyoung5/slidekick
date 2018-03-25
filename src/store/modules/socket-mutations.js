export default {
  notifyRenamedPresentation (state, title) {
    state.socket.emit('renamed-presentation', {
      presentationId: state.presentation.id,
      newTitle: title
    })
  }
}
