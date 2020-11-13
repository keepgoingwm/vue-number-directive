import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = window.genStory(
  MyExample,
  {
    // minimum: 10
  },
  {
    notes: { NoteMd },
  }
)
