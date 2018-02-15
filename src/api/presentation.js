const presentations = [
  {
    id: 0,
    title: 'test title!',
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
  getPresentation (id) {
    // Dummy promisified return to simulate fetching from DB
    return new Promise((resolve, reject) => {
      const result = presentations && presentations[id]
        ? presentations[id]
        : null

      return setTimeout(() => {
        resolve(result)
      }, 2000)
    })
  }
}
