
import { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('dailyTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const { toast } = useToast();

  const addTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description.",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
    setNewTask('');

    toast({
      title: "Task added",
      description: "New task has been added to your list.",
    });
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
    
    const task = tasks.find(task => task.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task reopened" : "Task completed",
        description: task.completed ? "Task marked as incomplete." : "Great job completing your task!",
      });
    }
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-6">Daily Tasks</h1>
      
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        
        <div className="flex gap-2">
          <Input
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={addTask}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li 
                key={task.id} 
                className={`
                  flex items-center justify-between p-3 rounded-md 
                  transition-all duration-300 
                  ${task.completed ? 'bg-muted/30' : 'hover:bg-muted/10'}
                `}
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => toggleTask(task.id)}
                >
                  <button 
                    className="h-6 w-6 flex items-center justify-center text-primary transition-transform hover:scale-110"
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckSquare className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>No tasks added yet.</p>
            <p className="text-sm">Add your first task using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
