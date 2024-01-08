// import TaskForm from "@/components/TaskForm"  // error leri control etmiyoruz
import TaskFormCustom from "@/components/TaskFormCustom" // error leride control ediyoruz
import TaskList from "@/components/TaskList"

export const dynamic = "force-dynamic" // bunu yapmayınca "build" de hatalar oluyor

// "dynamic"  yapınca tekrar "npm run build" yap

const TasksPage = () => {
  return (
    <div className="max-w-lg">
      <TaskFormCustom/>
      <TaskList/>

    </div>
  )
}

export default TasksPage
