import { Select } from '@headlessui/react'

function SelectBox() {
  return (
    <Select name="status" className="border pl-2.5 pr-2.5 pt-1 mr-1.5 pb-1 data-focus:bg-blue-100 data-hover:shadow" aria-label="Project status">
      <option value="postgraduate">Post-Graduate</option>
      <option value="undergraduate">Under-Graduate</option>
      <option value="belove 12th">High School</option>
      
    </Select>
  )
}
export default SelectBox;