const mergeDataByID = (array1, array2) => {
  const mergedArray = []

  for (const object1 of array1) {
    const id = object1.id

    for (const object2 of array2) {
      if (id === object2.id) {
        const mergedObject = {
          id,
          ...object1,
          // Merge the properties of object2 into mergedObject
          // using spread syntax
          ...object2,
        }

        mergedArray.push(mergedObject)
      }
    }
  }

  return mergedArray
}

export default mergeDataByID
