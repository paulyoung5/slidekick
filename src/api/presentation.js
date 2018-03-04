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
              x: '30px',
              y: '30px',
              fill: '#000000',
              fontFamily: 'Verdana',
              fontSize: '20px',
              content: 'Title goes here'
            }
          },
          {
            id: 1,
            type: 'TEXT',
            properties: {
              x: '30px',
              y: '80px',
              fill: '#000000',
              fontFamily: 'Comic Sans MS',
              fontSize: '15px',
              content: 'Some other text'
            }
          },
          {
            id: 2,
            type: 'IMAGE',
            properties: {
              x: '265px',
              y: '45px',
              width: '150px',
              height: '150px',
              href: 'https://picsum.photos/150'
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
