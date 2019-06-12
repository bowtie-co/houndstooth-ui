createItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree }) => (formData) => {
  const { collection } = match['params']
  if (collection && branch) {
    return jekyll.collection(collection, { ref: branch })
      .then(collection => {

        collection.items({ ref: branch })
          .then(items => {
            items.forEach(item => {
              if (activeItem['name'] === item['name']) {
                console.log('Found file with the same name and appended number')
                activeItem['name'] = `${activeItem['name']}-2`
              }
            })
          console.log(activeItem['name'])
          if (activeItem['name'] && activeItem['name'].split('.').length <= 1) {
            activeItem['name'] = `${activeItem['name']}.md`
          }
          const updatedItem = Object.assign({}, activeItem, { fields: formData })
          const message = `[HT] Created item: ${activeItem.name}`

          updateCachedTree()
          
          return collection.createItem(updatedItem, { ref: branch, message })
            .then(item => {
              console.log('done creating item', item)
              return Promise.resolve(item)
            })
        })
      })
  }
},







duplicateItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree }) => (formData) => {
  const { collection } = match['params']

  if (collection && branch) {

    return jekyll.collection(collection, { ref: branch })
      .then(collection => {
        const newItem = activeItem
        newItem['name'] = `${newItem['name'].split('.')[0]}-copy.md`
        console.log(newItem['name'])

        const updatedItem = Object.assign({}, activeItem, { fields: formData })
        const message = `[HT] Created item: ${activeItem.name}`

        updateCachedTree()

        return collection.createItem(updatedItem, { ref: branch, message }).then(item => {
          console.log('done creating item', item)
          return Promise.resolve(item)
        })
      })
  }
},