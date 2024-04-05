'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown, LayoutGrid } from 'lucide-react'
import { type Project } from '@/types/project'
import { ProjectList } from './projects-list'
import { Avatar } from '@/components/ui/avatar/signle'

export function ProjectsDropDown({
  currentProject,
  projectList,
}: {
  currentProject: Project | null
  projectList: Project[]
}) {
  return (
    <DropDown.Provider>
      <div className="relative">
        <DropDown.ToggleBtn
          className={`w-full flex justify-between items-center hover:bg-gray-200 text-neutral-500 hover:text-neutral-700 rounded-sm transition-colors duration-75`}
        >
          {!currentProject && (
            <div className="w-full flex px-1 py-1 items-center">
              <Icon icon={LayoutGrid} />
              <span className="px-2 font-medium">Projects</span>
            </div>
          )}
          {currentProject && (
            <section className="w-full flex items-center justify-start py-1">
              <h2 className="flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 font-medium">
                <Avatar
                  src={`https://avatar.vercel.sh/${currentProject.name}`}
                  alt={`${currentProject.name} image`}
                />
                <div className="flex flex-col items-start h-full">
                  <span className="text-sm leading-5">Projects</span>
                  <h4 className="leading-5 text-neutral-700">
                    {currentProject.name}
                  </h4>
                </div>
              </h2>
            </section>
          )}
          <Icon icon={ChevronsUpDown} />
        </DropDown.ToggleBtn>
        <DropDown.DropeableZone className="absolute top-full w-full">
          <ProjectList projectList={projectList} />
        </DropDown.DropeableZone>
      </div>
    </DropDown.Provider>
  )
}
