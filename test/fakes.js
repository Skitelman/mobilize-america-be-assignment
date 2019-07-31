export const fakeLink = {
  id: 1,
  destinationUrl: 'http://www.fake.com',
  shortUrl: 'fakeUrl',
  createdAt: new Date(2019, 1, 1)
}

export const fakeDb = {
  models: {
    Link: {
      findAll: new Promise((findObj) => {
        if (findObj.where && findObj.where.shortUrl === fakeLink.shortUrl) {
          return [fakeLink];
        }
        return [];
      })
    },
    LinkVisit: {
      create: new Promise(() => true)
    }
  }
}
