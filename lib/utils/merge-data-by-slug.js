const mergeDataBySlug = (array1, array2) => {
  const mergedArray = []

  for (const object1 of array1) {
    const slug = object1.slug

    for (const object2 of array2) {
      if (slug === object2.slugAsParams) {
        const mergedObject = {
          slug,
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

export default mergeDataBySlug
