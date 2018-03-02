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
              fill: '#000000',
              fontFamily: 'Verdana',
              fontSize: '30px',
              content: 'Slide 1 text'
            }
          },
          {
            id: 1,
            type: 'TEXT',
            properties: {
              x: '0px',
              y: '200px',
              fill: '#000000',
              fontFamily: 'Trebuchet MS',
              fontSize: '50px',
              content: 'Some other text'
            }
          }
        ]
      },
      {
        backgroundColour: '#FF0000',
        elements: [
          {
            id: 0,
            type: 'TEXT',
            properties: {
              x: '100px',
              y: '200px',
              fill: '#000000',
              fontFamily: 'Trebuchet MS',
              fontSize: '30px',
              content: 'Slide 2'
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
