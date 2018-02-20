const presentations = [
  {
    id: 22,
    userId: 0,
    title: 'test title! 22',
    slides: [
      {
        backgroundColour: '#FFFFFF',
        elements: [
          {
            id: 0,
            type: 'TEXT',
            properties: {
              x: '100px',
              y: '100px',
              fontFamily: 'Verdana',
              fontSize: 30,
              content: 'Slide 1'
            }
          }
        ]
      }
    ]
  }
]

export default {
  getPresentation (pId) {
    // Dummy promisified return to simulate fetching from DB
    return new Promise((resolve, reject) => {
      const result = presentations.find(p => p.id === parseInt(pId))

      return setTimeout(() => {
        resolve(result || null)
      }, 2000)
    })
  },
  getPresentationsForUser (userId) {
    // Dummy promisified return to simulate fetching from DB
    return new Promise((resolve, reject) => {
      const result = presentations.filter(p => p.userId === parseInt(userId))

      return setTimeout(() => {
        resolve(result || null)
      }, 2000)
    })
  }
}
