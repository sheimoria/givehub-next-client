import { ClipboardIcon } from '@heroicons/react/outline'
import CreateTask from './CreateTask'
import Transit from 'components/Transit'
import useToggle from 'utils/useToggle'

export default function CreateTaskButton() {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit
        as="button"
        onClick={toggleIsOpen}
        className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-colors rounded-lg gap- bg-rose-600 hover:bg-rose-700"
      >
        <ClipboardIcon className="text-white dark:text-white" />
        Create Task
      </Transit>
      <CreateTask isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
    </>
  )
}
