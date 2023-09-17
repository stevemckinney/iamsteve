'use client'

import { useState, Suspense } from 'react'
import Select from './s'
import Title from '@/components/title'
import Card from '@/components/card'
import Dropdown from './dropdown'
import categories from '@/content/categories'

const Tabs = ({ posts }) => {
  let [category, setCategory] = useState('Design')

  const design = posts
    .filter((post) => post.categories.includes('Design'))
    .slice(0, 6)
  const code = posts
    .filter((post) => post.categories.includes('Code'))
    .slice(0, 6)

  return (
    <div
      className="grid col-container grid-cols-subgrid frame gap-y-8 pb-18 mt-[2.25rem]"
      id="popular-design"
    >
      <Title
        link="/blog"
        text="View the archive"
        ariaID="popular-design"
        className="-mt-[2.25rem]"
      >
        Popular
        <Dropdown>
          <Dropdown.Button>{category}</Dropdown.Button>
          <Dropdown.Menu>
            {categories.map((category, i) => {
              if (category.exclude) return
              return (
                <Dropdown.MenuItem
                  onSelect={() => setCategory(category.title)}
                  onValueChange={setCategory}
                  key={category.title}
                  icon={category.title}
                >
                  {category.title}
                </Dropdown.MenuItem>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Title>

      <div className="grid grid-cols-3 col-content gap-8">
        {design.map((post) => (
          <Suspense fallback={Loading()}>
            <Card
              size="medium"
              frontmatter={post}
              image={false}
              key={post._id}
            />
          </Suspense>
        ))}
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex h-full grow items-center justify-center bg-gray-50">
      <p>Loading…</p>
    </div>
  )
}

export default Tabs
